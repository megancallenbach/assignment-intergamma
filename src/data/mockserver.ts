import { Product, WishlistItem } from "@/data/types";
import { Model, createServer } from "miragejs";
import { ModelDefinition } from "miragejs/-types";
import { products } from "./mockdata";

const ProductModel: ModelDefinition<Product> = Model.extend({});
const WishlistItemModel: ModelDefinition<WishlistItem> = Model.extend({});

export function makeServer() {
  const server = createServer({
    models: {
      product: ProductModel,
      wishlistItem: WishlistItemModel,
    },

    routes() {
      this.get("/api/products", (schema: any) => {
        return schema.products.all();
      });

      this.get("/api/wishlist", (schema: any) => {
        return schema.wishlistItems.all();
      });

      this.post("/api/wishlist/add", (schema: any, request) => {
        const { productId } = JSON.parse(request.requestBody);
        const existingProduct = schema.wishlistItems.findBy({ productId });

        if (existingProduct) {
          return existingProduct.update("count", ++existingProduct.count);
        } else {
          return schema.create("wishlistItem", { productId, count: 1 });
        }
      });

      this.post("/api/wishlist/change-count", (schema: any, request) => {
        const { wishlistItem } = JSON.parse(request.requestBody);

        const existingProduct = schema.wishlistItems.findBy({
          productId: wishlistItem.productId,
        });

        if (existingProduct) {
          if (wishlistItem.count > 0) {
            return existingProduct.update("count", wishlistItem.count);
          } else {
            existingProduct.destroy();
          }
        }
      });

      this.post("/api/wishlist/seed", (schema: any, request) => {
        const { wishlist } = JSON.parse(request.requestBody);

        return wishlist.map((item: WishlistItem) => {
          schema.create("wishlistItem", item);
        });
      });
    },

    seeds(server) {
      server.db.loadData({
        products: products,
        wishlistItems: [],
      });
    },
  });

  return server;
}
