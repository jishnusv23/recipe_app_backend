import { Router } from "express";
import { WishlistController } from "../controllers/wishlist.controller";


const router = Router();
const wishlistController = new WishlistController();

router.put("/", wishlistController.createWishlist.bind(wishlistController));
router.get("/:userId", wishlistController.getWishlist.bind(wishlistController));

export default router