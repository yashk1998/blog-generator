import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    await AuthService.logout();
    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
