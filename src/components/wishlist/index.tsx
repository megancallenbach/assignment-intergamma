"use client";

import { Product, WishlistItem } from "@/data/types";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Drawer, Option, Select, Typography } from "@material-tailwind/react";
import Image from "next/image";

type WishlistProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  products: Product[];
  wishlist: WishlistItem[];
  updateWishlistItem: (wishlistItem: WishlistItem) => void;
};

export function Wishlist({
  open,
  setOpen,
  products,
  wishlist,
  updateWishlistItem,
}: WishlistProps) {
  const renderOption = (number: number, productId: string) => (
    <Option key={`dropdown-${productId}-${number}`} value={number.toString()}>
      <Typography color="black">{number}</Typography>
    </Option>
  );

  return (
    <Drawer placement="right" open={open}>
      <div className="mb-6 flex flex-col items-start justify-between">
        <button onClick={() => setOpen(false)}>
          <XMarkIcon className="h-8 w-8 text-black" />
        </button>
        <Typography variant="h5" className="text-center">
          Wishlist
        </Typography>
        <div className="flex-col justify-center items-center">
          {wishlist.map((wishlistItem, index) => {
            const product = products.find(
              (product) => product.id === wishlistItem.productId
            );
            if (product) {
              return (
                <div key={`wishlistitem-${index}`} className="flex">
                  <Image
                    src={product?.imageSrc}
                    alt={`Image of ${product?.name}`}
                    priority={true}
                    width={500}
                    height={500}
                    className="object-contain object-center w-20 h-20"
                  />
                  <div>
                    <Typography>{product?.name}</Typography>
                    <Select
                      label="Quantity"
                      value={wishlistItem.count.toString()}
                      onChange={(value) =>
                        updateWishlistItem({
                          productId: product.id,
                          count: Number(value),
                        })
                      }
                    >
                      {[...Array(wishlistItem.count + 1)].map(
                        (_number, countIndex) =>
                          renderOption(countIndex, wishlistItem.productId)
                      )}
                    </Select>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </Drawer>
  );
}
