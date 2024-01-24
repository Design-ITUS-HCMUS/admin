import { PrismaClient } from '@prisma/client';
import { New_Rocker } from 'next/font/google';
import { NextResponse } from 'next/server';

// Remember to run "npx prisma generate" after changing schema
const Prisma = new PrismaClient();
export async function GET(req: Request) {
  const newUser = await Prisma.user.create({
    data: {
      username: 'test1',
      fullname: 'test',
      email: 'test1',
      password: 'test',
      studentID: 'test',
      roleID: 2,
      school: 'test',
    },
  });

  return NextResponse.json({ message: 'Added new user' }, { status: 200 });
}
