import { NextRequest, NextResponse } from "next/server";
import { SignupSchema, SignupResponse, SignupError } from "../../../types/auth";
import connectDB from "../../../lib/db";
import User from "../../model/User";
import { hash } from "bcryptjs";
import mongoose from "mongoose";
import { ZodError } from "zod";
import nodemailer from 'nodemailer';
import crypto from 'crypto';

interface MongoError extends Error {
  code?: number;
  keyValue?: { [key: string]: any };
}


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});


async function sendVerificationEmail(email: string, verificationToken: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email',
    html: `
      <h1>Welcome!</h1>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<SignupResponse>> {
  try {
    const body = await request.json();
    const validatedData = SignupSchema.parse(body);

    await connectDB();

    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      const error: SignupError = {
        type: "validation",
        message: "User already exists",
        errors: [{ field: "email", message: "Email already registered" }],
      };
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

   
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 24); 

    const hashedPassword = await hash(validatedData.password, 12);
    const user = await User.create({
      email: validatedData.email,
      password: hashedPassword,
      name: validatedData.name,
      emailVerified: false,
      verificationToken,
      verificationTokenExpiry: tokenExpiry
    });

  
    await sendVerificationEmail(user.email, verificationToken);

    return NextResponse.json(
      {
        success: true,
        data: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          message: "Verification email sent. Please check your inbox."
        },
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const validationError: SignupError = {
        type: "validation",
        message: "Validation failed",
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      };
      return NextResponse.json(
        { success: false, error: validationError.message },
        { status: 400 }
      );
    }

    if (error instanceof mongoose.Error.ValidationError) {
      const mongooseError: SignupError = {
        type: "validation",
        message: "Validation failed",
        errors: Object.keys(error.errors).map((key) => ({
          field: key,
          message: error.errors[key].message,
        })),
      };
      return NextResponse.json(
        { success: false, error: mongooseError.message },
        { status: 400 }
      );
    }

    const serverError: SignupError = {
      type: "server",
      message: "Internal server error",
    };
    return NextResponse.json(
      { success: false, error: serverError.message },
      { status: 500 }
    );
  }
}