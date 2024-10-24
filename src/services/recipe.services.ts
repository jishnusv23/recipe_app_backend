// import prisma from "../config/database";
// import { IWishlist } from "../interface/recipe.interface";

// export class WishistService {
//   async createWishlist(wishlistData: IWishlist) {
//     return await prisma.wishlist.create({
//       data: wishlistData,
//     });
//   }
//   async getWishlistByUserId(userId: string) {
//     return await prisma.wishlist.findMany({
//       where: { userId }, 
//     });
//   }

//   async addWishlistProduct(userId: string, productId: string) {
//     const wishlist = await prisma.wishlist.findUnique({
//       where: { userId },
//     });
//     if (!wishlist) {
//       throw new Error("Wishlist not found the user");
//     }

//     return await prisma.wishlist.update({
//       where: { userId },
//       data: {
//         productIds: [...(wishlist.productIds || []), productId],
//       },
//     });
//   }
// }
import prisma from "../config/database";
import { IWishlist } from "../interface/recipe.interface";

export class WishlistService {

  async createWishlist(wishlistData: IWishlist) {
    return await prisma.wishlist.create({
      data: wishlistData,
    });
  }


  async getWishlistByUserId(userId: string) {
    return await prisma.wishlist.findUnique({
      where: { userId }, 
    });
  }


  async addWishlistProduct(userId: string, productId: string) {

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId }, 
    });

 
    if (!wishlist) {
      throw new Error("Wishlist not found for this user");
    }

    
    if (wishlist.productIds.includes(productId)) {
      throw new Error("Product is already in the wishlist");
    }

    
    return await prisma.wishlist.update({
      where: { userId },
      data: {
        productIds: [...wishlist.productIds, productId], 
      },
    });
  }

  
  async removeWishlistProduct(userId: string, productId: string) {
    
    const wishlist = await prisma.wishlist.findUnique({
      where: { userId },
    });

    if (!wishlist) {
      throw new Error("Wishlist not found for this user");
    }


    const updatedProductIds = wishlist.productIds.filter(
      (id) => id !== productId
    );

    return await prisma.wishlist.update({
      where: { userId },
      data: {
        productIds: updatedProductIds, 
      },
    });
  }
}
