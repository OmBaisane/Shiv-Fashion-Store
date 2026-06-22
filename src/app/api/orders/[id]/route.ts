import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    console.log("PUT ROUTE HIT");

    await connectDB();

    const { id } = await params;

    console.log("ORDER ID:", id);

    const text = await request.text();

    console.log("RAW BODY:", text);

    const body = JSON.parse(text);

    console.log("PARSED BODY:", body);

    const { status } = body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    console.log("UPDATED ORDER:", order);

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("PUT ERROR:", error);

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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    await Order.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

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
