import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

export const generateAccessToken = (payload: UserPayload) => {
  const { id, email } = payload;
  const newPayload = { id, email };
  return jwt.sign(newPayload, String(process.env.ACCESS_TOKEN_SECRET), {
    expiresIn: "1h",
  });
};
