
import { NextResponse } from "next/server";
import connectDb from "../../lib/db";
import Brand from "../model/Brand";
import { BrandInfoInput, ApiResponse } from "../../types/brand";

export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
  try {
    await connectDb();

    const body = await req.json();
    const userId = body.userId;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required",
        },
        { status: 400 }
      );
    }

    const brandData: BrandInfoInput = {
      brandName: body.brandName,
      brandDescription: body.brandDescription,
      logoUrl: body.logoUrl,
      websiteUrl: body.websiteUrl,
      socialMediaLinks: body.socialMediaLinks,
    };


    const existingBrand = await Brand.findOne({ userId });

    let brand;
    if (existingBrand) {

      brand = await Brand.findOneAndUpdate(
        { userId },
        { ...brandData },
        { new: true, runValidators: true }
      );
    } else {
      brand = await Brand.create({
        ...brandData,
        userId,
      });
    }

    return NextResponse.json({
      success: true,
      message: existingBrand
        ? "Brand information updated successfully"
        : "Brand information saved successfully",
      data: brand,
    });
  } catch (error) {
    console.error("Error saving brand information:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error saving brand information",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request): Promise<NextResponse<ApiResponse>> {
    try {
      await connectDb();
  
      const authHeader = req.headers.get('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          {
            success: false,
            message: 'Authorization header is missing or invalid',
          },
          { status: 401 }
        );
      }
  
      const userId = authHeader.split(' ')[1];
      if (!userId) {
        return NextResponse.json(
          {
            success: false,
            message: 'User ID is required',
          },
          { status: 400 }
        );
      }
  
      const brand = await Brand.findOne({ userId }).select('-__v');
  
      if (!brand) {
        return NextResponse.json(
          {
            success: false,
            message: 'Brand information not found',
          },
          { status: 404 }
        );
      }
  
      return NextResponse.json({
        success: true,
        data: {
          userId: brand.userId,
          brandName: brand.brandName,
          brandDescription: brand.brandDescription,
          logoUrl: brand.logoUrl,
          websiteUrl: brand.websiteUrl,
          socialMediaLinks: brand.socialMediaLinks,
          createdAt: brand.createdAt,
          updatedAt: brand.updatedAt
        },
        message: 'Brand information retrieved successfully',
      });
    } catch (error) {
      console.error('Error fetching brand information:', error);
      return NextResponse.json(
        {
          success: false,
          message: error instanceof Error ? error.message : 'Error fetching brand information',
        },
        { status: 500 }
      );
    }
  }