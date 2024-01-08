import { WishlistItem } from "@/data/types";

export const addCountToWishlistItem = (
  wishlist: WishlistItem[],
  productId: string
) => {
  const productIndex = wishlist.findIndex(
    (item) => productId === item.productId
  );
  if (productIndex !== -1) {
    const existingProduct = wishlist[productIndex];
    wishlist.splice(productIndex, 1, {
      productId: productId,
      count: ++existingProduct.count,
    });
  } else {
    wishlist.push({ productId, count: 1 });
  }

  return wishlist;
};

export const changeCountOfWishlistItem = (
  wishlist: WishlistItem[],
  productId: string,
  count: number
) => {
  const productIndex = wishlist.findIndex(
    (item) => productId === item.productId
  );
  if (productIndex !== -1) {
    if (count > 0) {
      wishlist.splice(productIndex, 1, { productId, count });
    } else {
      wishlist.splice(productIndex, 1);
    }
  }

  return wishlist;
};
