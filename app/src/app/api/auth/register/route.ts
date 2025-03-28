import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      password,
      fullName,
      studentId,
      major,
      academicYear,
      contactNumber,
    } = body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and student in a transaction
    const result = await prisma.$transaction(async (tx: PrismaClient) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          role: 'student',
        },
      });

      const student = await tx.student.create({
        data: {
          id: user.id,
          studentId,
          fullName,
          major,
          academicYear,
          contactNumber,
          enrollmentStatus: 'pending',
        },
      });

      return { user, student };
    });

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Error registering user' },
      { status: 500 }
    );
  }
}
