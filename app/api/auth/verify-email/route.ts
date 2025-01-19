import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/db"
import User from "../../model/User"

export async function GET(
  request: NextRequest
): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Verification token is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({
      verificationToken: token,
    });
    console.log("user",user)

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired verification token" },
        { status: 400 }
      );
    }

    
    user.emailVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return NextResponse.json(
      { 
        success: true, 
        message: "Email verified successfully" 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}