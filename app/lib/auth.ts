import { User } from "../types/auth";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import bcryptjs from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";
const COOKIE_NAME = "auth-token";

export class AuthService {
  static async logout(): Promise<void> {
    (await cookies()).delete(COOKIE_NAME);
  }

  static async getCurrentUser(): Promise<User | null> {
    try {
      const token = (await cookies()).get(COOKIE_NAME)?.value;
      if (!token) return null;

      const verified = await this.verifyToken(token);
      return verified.payload as unknown as User;
    } catch {
      return null;
    }
  }

  private static async createToken(user: User): Promise<string> {
    const token = await new SignJWT({ ...user })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(new TextEncoder().encode(JWT_SECRET));

    return token;
  }

  private static async verifyToken(token: string) {
    return await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
  }
}
