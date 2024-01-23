import { PrismaClient } from '@prisma/client';
import { New_Rocker } from 'next/font/google';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Remember to run "npx prisma generate" after changing schema

export async function GET(req: Request) {
  const newUser = await prisma.user.create({
    data: {
      name: 'Elliott',
      email: 'xelliottx@example-user.com',
    },
  });

  return NextResponse.json({ message: 'Added new user' }, { status: 200 });
}
