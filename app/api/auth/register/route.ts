import { userRegisterSchema } from "@/validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validatedBody = userRegisterSchema.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(
      { error: validatedBody.error.errors },
      { status: 400 }
    );
  }

  try {
    console.log("Validated user data:", validatedBody.data);

    const { email, name, password, username } = validatedBody.data;

    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: "User with this email already exists!" },
        { status: 409 } // Conflict
      );
    }

    const existingUserByUsername = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        { error: "Username is already taken!" },
        { status: 409 } // Conflict
      );
    }

    const verificationCode = String(
      Math.floor(100000 + Math.random() * 900000)
    );
    const verificationExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        username,
        password,
        verificationCode,
        verificationExpiry,
        isVerified: false,
      },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        isVerified: true,
        verificationCode: true,
        verificationExpiry: true,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully!", data: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while creating user", error);

    return NextResponse.json(
      { error: "Failed to register user!" },
      { status: 501 }
    );
  }
}
