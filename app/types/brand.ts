export interface BrandInfo {
  userId: string;
  brandName: string;
  brandDescription: string;
  logoUrl: string;
  websiteUrl: string;
  socialMediaLinks?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BrandInfoInput = Omit<
  BrandInfo,
  "userId" | "createdAt" | "updatedAt"
>;

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}
