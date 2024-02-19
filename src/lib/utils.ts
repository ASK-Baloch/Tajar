import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  this: any,
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "PKR" | "INR" | "GBP";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "PKR", notation = "compact" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  // return new Intl.NumberFormat("en-PK", {
  //   style: "currency",
  //   currency: currency,
  //   notation,
  //   maximumFractionDigits: 4,
  // }).format(numericPrice);

  return currency + " " + numericPrice;
}
