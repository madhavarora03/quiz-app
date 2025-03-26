import { validateUserSchema } from "@/validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const validatedBody = validateUserSchema.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(
      { error: validatedBody.error.errors },
      { status: 400 }
    );
  }

  try {
    const { verificationCode } = validatedBody.data;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        verificationCode: true,
        verificationExpiry: true,
        isVerified: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist!" },
        { status: 400 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { message: "user is already verified!" },
        { status: 200 }
      );
    }

    const isCodeCorrect = verificationCode === user.verificationCode;
    const isCodeValid = new Date() < user.verificationExpiry;

    if (!isCodeCorrect) {
      return NextResponse.json(
        { error: "Incorrect verification code!" },
        { status: 400 }
      );
    }

    if (!isCodeValid) {
      return NextResponse.json(
        {
          error: "Code expired, please generate a new code!",
        },
        { status: 400 }
      );
    }

    const verifiedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isVerified: true,
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

    // TODO: Send onboarding mail to user!

    return NextResponse.json(
      { message: "User verified successfully!", data: verifiedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to verify user!" },
      { status: 500 }
    );
  }
}
