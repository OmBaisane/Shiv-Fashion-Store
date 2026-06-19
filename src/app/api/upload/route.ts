import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded",
        },
        {
          status: 400,
        },
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "shiv-fashion",
          },
          (error, result) => {
            if (error) reject(error);

            resolve(result);
          },
        )
        .end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
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
