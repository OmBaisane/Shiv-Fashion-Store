const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateToken(adminId: string) {
  return jwt.sign(
    {
      adminId,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
}
