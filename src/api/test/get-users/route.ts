import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Remember to run "npx prisma generate" after changing schema

export async function GET(req: Request) {
  const allUsers = await prisma.user.findMany();
  return NextResponse.json({ message: allUsers }, { status: 200 });
}
