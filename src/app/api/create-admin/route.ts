import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function GET() {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({
      email: "admin@shivfashion.com",
    });

    if (existingAdmin) {
      return NextResponse.json({
        success: true,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      email: "admin@shivfashion.com",
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      message: "Admin created successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
