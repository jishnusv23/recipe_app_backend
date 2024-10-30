import { NextFunction, Request, Response } from "express";
import { WishlistService } from "../services/recipe.services";
import { HttpStatusCode } from "../lib/statusCode/StatusCode";

export class WishlistController {
  private wishlistService = new WishlistService();

  async createWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const { userId, productId } = req.body;

      const productIdString = String(productId);

      let userWishlist = await this.wishlistService.getWishlistByUserId(userId);
      console.log("🚀 ~ User Wishlist:", userWishlist);

      if (!userWishlist) {
        userWishlist = await this.wishlistService.createWishlist({
          userId,
          productIds: [productIdString],
        });

        res.status(201).json({
          success: true,
          message: "New wishlist created.",
          wishlist: userWishlist,
        });
      }

      if (!userWishlist.productIds.includes(productIdString)) {
        const updatedWishlist = await this.wishlistService.addWishlistProduct(
          userId,
          productIdString
        );
        console.log("🚀 ~ Updated Wishlist:", updatedWishlist);
        res.status(HttpStatusCode.OK).json({
          success: true,
          message: "Product added to existing wishlist.",
          wishlist: updatedWishlist,
        });
      }

      res.status(HttpStatusCode.OK).json({
        success: false,
        message: "Product already in wishlist.",
      });
    } catch (error: any) {
      console.error(error);
      next(error);
    }
  }
  async getWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.params, "-----------------");
      const {userId}=req.params
      const getUserWishlist=await this.wishlistService.getWishlistByUserId(userId)
      console.log("🚀 ~ file: wishlist.controller.ts:57 ~ WishlistController ~ getWishlist ~ getUserWishlist:", getUserWishlist)
      res.status(HttpStatusCode.OK).json({success:true,data:getUserWishlist,message:"ok"})
    } catch (error: any) {
      next(error);
    }
  }
}
