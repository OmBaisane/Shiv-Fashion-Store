import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

async function createAdmin() {
  await connectDB();

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "admin@shivfashion.com",
    password: hashedPassword,
  });

  console.log("Admin Created");

  process.exit(0);
}

createAdmin();
