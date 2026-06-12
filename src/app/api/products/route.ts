import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    console.log("BODY:", body);

    const product = new Product(body);

    console.log("PRODUCT:", Product);

    await product.save();

    return NextResponse.json(
      {
        success: true,
        data: product,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: products,
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
