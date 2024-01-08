import { Product } from "@/data/types";
import { HeartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

type ProductProps = {
  product: Product;
  addToWishlist: (productId: string) => void;
};

export function Product({ product, addToWishlist }: ProductProps) {
  return (
    <div className="w-64 h-64 flex items-center justify-center relative">
      <div className="absolute inset-0 z-0 items-center">
        <Image
          src={product.imageSrc}
          alt={`Image of ${product.name}`}
          priority={true}
          width={500}
          height={500}
          className="object-contain object-center lg:h-full lg:w-full"
        />
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-900 pr-2">
            {`€${Number(product.price) / 100}`}
          </p>
        </div>
      </div>

      <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-end items-start text-6xl text-white font-semibold w-full h-full">
        <button onClick={() => addToWishlist(product.id)}>
          <HeartIcon className="w-8 h-8 text-black" />
        </button>
      </div>
    </div>
  );
}
