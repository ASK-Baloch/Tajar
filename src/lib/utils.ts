import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
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

export function constructMetadata({
  title = 'Tajar - the marketplace for Products',
  description = 'Tajar is an open-source marketplace for high-quality goods.',
  image = '/thumbnail.jpg',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title, 
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@joshtriedcoding',
    },
    icons,
    metadataBase: new URL('https://digitalhippo.up.railway.app'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}