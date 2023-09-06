"use client";

import { sidebarLinks } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { FC } from "react";

const NavigationLinksWrapper: FC<{ bottomBar?: boolean }> = ({ bottomBar }) => {
  const pathname = usePathname();

  const { userId } = useAuth();
  if (!userId) redirect("/sign-in");

  const className = bottomBar ? "bottombar_link" : "leftsidebar_link";

  return (
    <>
      {sidebarLinks.map(({ imgURL, label, route }) => {
        const isSamePath =
          (pathname.includes(route) && route.length > 1) || pathname === route;

        // If the route is /profile, we need to check if the user is on their own profile
        const isActive =
          isSamePath &&
          (pathname.includes("/profile") ? pathname.includes(userId) : true);

        if (route === "/profile") route = `/profile/${userId}`;

        return (
          <Link
            href={route}
            key={label}
            className={`${className} ${
              isActive && `bg-primary-500 hover:bg-primary-500`
            }`}
          >
            <Image src={imgURL} alt={label} width={25} height={25} />

            <p className="text-light-1 max-lg:hidden">{label}</p>
          </Link>
        );
      })}
    </>
  );
};

export default NavigationLinksWrapper;
