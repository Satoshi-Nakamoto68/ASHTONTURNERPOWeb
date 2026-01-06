// Product images map for easy import
import feeder1 from "@/assets/products/feeder-1.jpg";
import fountain1 from "@/assets/products/fountain-1.jpg";
import tracker1 from "@/assets/products/tracker-1.jpg";
import camera1 from "@/assets/products/camera-1.jpg";
import litter1 from "@/assets/products/litter-1.jpg";
import toy1 from "@/assets/products/toy-1.jpg";
import health1 from "@/assets/products/health-1.jpg";
import feeder2 from "@/assets/products/feeder-2.jpg";

export const productImages: Record<string, string> = {
  "/products/feeder-1.jpg": feeder1,
  "/products/fountain-1.jpg": fountain1,
  "/products/tracker-1.jpg": tracker1,
  "/products/camera-1.jpg": camera1,
  "/products/litter-1.jpg": litter1,
  "/products/toy-1.jpg": toy1,
  "/products/health-1.jpg": health1,
  "/products/feeder-2.jpg": feeder2,
};

export function getProductImage(path: string): string {
  return productImages[path] || path;
}
