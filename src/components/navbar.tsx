import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import Image from "next/image";
import { getServersideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";

const Navbar = async () => {
  const nextCookies = cookies();
  const { user } = await getServersideUser(nextCookies);

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16">
            <MobileNav />
              <div className="flex ml-4 lg:ml-0">
                <Link href="/">
                  <Image
                    src="/tajar-pics/tajar.png"
                    alt="logo"
                    height={90}
                    width={120}
                  />
                </Link>
              </div>
              <div className="hidden z-50 lg:ml-6 lg:block lg:self-stretch">
                <NavItems />
              </div>
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Create Account
                    </Link>
                  )}
                  {user ? (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
