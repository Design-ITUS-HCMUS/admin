import { NextRequest, NextResponse } from 'next/server';
import { routesConfig } from '@/utils';

export async function POST(req: NextRequest) {
  const response = NextResponse.redirect(new URL(routesConfig.resetRoute, req.url));
  response.cookies.delete('token');
  return response;
}
