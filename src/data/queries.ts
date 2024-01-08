"use client";

import axios from "axios";
import { Product, WishlistItem } from "./types";

export const productQueries = {
  getProducts: (): Promise<Product[]> => {
    return axios
      .get("/api/products")
      .then((response) => response.data.products);
  },
};

export const wishlistQueries = {
  getWishlistItems: (): Promise<WishlistItem[]> => {
    return axios
      .get("/api/wishlist")
      .then((response) => response.data.wishlistItems);
  },
  addWishlistItem: (productId: string): Promise<void> => {
    return axios.post("/api/wishlist/add", { productId });
  },
  updateWishlistItem: (wishlistItem: WishlistItem): Promise<void> => {
    return axios.post("/api/wishlist/change-count", {
      wishlistItem: wishlistItem,
    });
  },
  seedWishList: (wishlistItems: WishlistItem[]): Promise<void> => {
    return axios.post("/api/wishlist/seed", { wishlist: wishlistItems });
  },
};
