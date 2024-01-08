"use client";

import { Product } from "@/components/product";
import { Wishlist } from "@/components/wishlist";
import { productQueries, wishlistQueries } from "@/data/queries";
import { Product as ProductType } from "@/data/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Header = dynamic(() => import("../components/header"), {
  ssr: false,
});

export default function Homepage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: productQueries.getProducts,
  });

  const { data: wishlist } = useQuery({
    queryKey: ["wishlist"],
    queryFn: wishlistQueries.getWishlistItems,
  });

  const { mutate: addToWishList } = useMutation({
    mutationFn: wishlistQueries.addWishlistItem,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const { mutate: updateWishlistItem } = useMutation({
    mutationFn: wishlistQueries.updateWishlistItem,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const { mutate: seedWishListItems } = useMutation({
    mutationFn: wishlistQueries.seedWishList,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const badgeCount =
    wishlist?.reduce<number>((value, { count }) => value + count, 0) || 0;

  useEffect(() => {
    const initialData = window.localStorage.getItem("wishlist");
    if (initialData) {
      seedWishListItems(JSON.parse(initialData));
    }
  }, [seedWishListItems]);

  useEffect(() => {
    if (wishlist) {
      window.localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  return (
    <>
      <Header
        badgeCount={badgeCount}
        openDrawer={() => setIsDrawerOpen(true)}
      />
      <main className="flex w-full min-h-screen p-8">
        <div className="w-full h-full mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
          {products?.map((product: ProductType) => (
            <Product
              key={`product-${product.id}`}
              product={product}
              addToWishlist={() => {
                addToWishList(product.id);
              }}
            />
          ))}
        </div>
        <Wishlist
          open={isDrawerOpen}
          setOpen={setIsDrawerOpen}
          products={products || []}
          wishlist={wishlist || []}
          updateWishlistItem={updateWishlistItem}
        />
      </main>
    </>
  );
}
