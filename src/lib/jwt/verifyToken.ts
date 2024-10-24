import jwt from "jsonwebtoken";
export const verifyToken = (token: string, secret: string): any => {
     try {
       console.log("verify reached ", token, secret);
       const decoded = jwt.verify(token, secret);
       return decoded;
     } catch (error) {
       throw new Error("Invalid or expired token");
     }
};
