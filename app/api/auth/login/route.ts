import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../model/User";
import connectDB from "../../../lib/db";
import {
  LoginCredentials,
  AuthResponse,
  User as UserType,
} from "../../../types/auth";
import nodemailer from "nodemailer";
import crypto from "crypto";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function resendVerificationEmail(
  email: string,
  verificationToken: string
) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    html: `
      <h1>Email Verification Required</h1>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

const generateToken = (user: UserType): string => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    emailVerified: user.emailVerified,
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};

export async function POST(
  request: NextRequest
): Promise<NextResponse<AuthResponse | { error: string }>> {
  try {
    const credentials: LoginCredentials = await request.json();

    if (!credentials.email || !credentials.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: credentials.email });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordValid = await compare(credentials.password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    
    if (!user.emailVerified) {
      
      const verificationToken = crypto.randomBytes(32).toString("hex");
      const tokenExpiry = new Date();
      tokenExpiry.setHours(tokenExpiry.getHours() + 24);

      user.verificationToken = verificationToken;
      user.verificationTokenExpiry = tokenExpiry;
      await user.save();

      
      await resendVerificationEmail(user.email, verificationToken);

      return NextResponse.json(
        {
          error: "Email not verified",
          message:
            "Please check your email for verification link. A new verification email has been sent.",
          requiresVerification: true,
        },
        { status: 403 }
      );
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
    });

    const response: AuthResponse = {
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
      },
      token,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Sign in error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
