import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/user.services";
import { OAuth2Client } from "google-auth-library";
import { config } from "dotenv";
import { generateAccessToken } from "../lib/jwt/generateAccessToken";
import { generateRefreshToken } from "../lib/jwt/generateRefreshTocken";
import { comparepassword } from "../lib/bcrypt/comparePassword";
import { hashpassword } from "../lib/bcrypt/hashpassword";
import { verifyToken } from "../lib/jwt/verifyToken";
config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export class UserController {
  private userService = new UserServices();

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body, "userDetails geting");
      const { name, email, password } = req.body;
      const hashpass = await hashpassword(password as string);
      let data = {
        name: name,
        email: email,
        password: hashpass,
      };
      const userExist = await this.userService.findByEmail(email);
      console.log(
        "🚀 ~ file: user.controller.ts:16 ~ UserController ~ createUser ~ userExist:",
        userExist
      );
      if (!userExist) {
        const user = await this.userService.createUser(data);
        // console.log(
        //   "🚀 ~ file: user.controller.ts:14 ~ UserController ~ createUser ~ user:",
        //   user
        // );
        if (user) {
          const accesstoken = generateAccessToken({
            id: String(user?.id),
            email: String(user?.email),
          });
          const refreshtoken = generateRefreshToken({
            id: String(user?.id),
            email: user?.email,
          });

          // access_token, refresh_token;
          res.cookie("access_token", accesstoken, { httpOnly: true });
          res.cookie("refresh_token", refreshtoken, { httpOnly: true });

          res.status(201).json({ success: true, data: user });
        }
      } else {
        res
          .status(200)
          .json({ success: false, data: null, message: "Please login" });
      }
    } catch (error: any) {
      next(error);
    }
  }
  async createUserGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body, "user data in google -auth");
      const { credential } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      console.log(
        "🚀 ~ file: user.controller.ts:26 ~ UserController ~ createUserGoogle ~ payload:",
        payload
      );
      const email = payload?.email;
      let name = payload?.name;

      console.log(
        "🚀 ~ file: user.controller.ts:66 ~ UserController ~ createUserGoogle ~ name:",
        name
      );
    } catch (error: any) {
      next(error);
    }
  }
  async userLogin(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body, "login data");
      const { email, password } = req.body;
      const userExist = await this.userService.findByEmail(email);
      const verifypassword = await comparepassword(
        password,
        userExist?.password as string
      );
      console.log(
        "🚀 ~ file: user.controller.ts:83 ~ UserController ~ userLogin ~ verifypassword:",
        verifypassword
      );
      if (verifypassword) {
        if (userExist) {
          const accesstoken = generateAccessToken({
            id: String(userExist?.id),
            email: String(userExist?.email),
          });
          const refreshtoken = generateRefreshToken({
            id: String(userExist?.id),
            email: userExist?.email,
          });

          // access_token, refresh_token;
          res.cookie("access_token", accesstoken, { httpOnly: true });
          res.cookie("refresh_token", refreshtoken, { httpOnly: true });

          res.status(201).json({ success: true, data: userExist });
        } else {
          res.status(400).json({
            success: true,
            data: null,
            message: "Please Crete Account  ",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          data: null,
          message: "Password is not match",
        });
      }
    } catch (error: any) {
      next(error);
    }
  }

  async getUserData(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.cookies, "------------------------------");
      const verify = await verifyToken(
        req.cookies.access_token,
        process.env.ACCESS_TOKEN_SECRET as string
      );
      console.log(
        "🚀 ~ file: user.controller.ts:140 ~ UserController ~ getUserData ~ verify:",
        verify
      );
      const {id,email}=verify
      const getUser = await this.userService.findByEmail(email);
      console.log("🚀 ~ file: user.controller.ts:146 ~ UserController ~ getUserData ~ getUser:", getUser)
      if(getUser){
         const accesstoken = generateAccessToken({
           id: String(getUser?.id),
           email: String(getUser?.email),
         });
          res.cookie("access_token", accesstoken, { httpOnly: true });
          res.status(200).json({success:true,data:getUser,message:'oke'})
      }else{
        res.status(400).json({success:false,data:null,message:'UnAuthorized'})
      }
    } catch (error: any) {
      next(error)
    }
  }
}
