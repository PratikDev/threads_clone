"use client";

import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ILogoutButtonProps {
  label?: boolean;
}
const LogoutButton: FC<ILogoutButtonProps> = ({ label }) => {
  const router = useRouter();

  return (
    <>
      <SignedIn>
        <SignOutButton signOutCallback={() => router.push(`/sign-in`)}>
          <div className="leftsidebar_link hover:bg-gray-800/40">
            <Image
              src={`/assets/logout.svg`}
              alt="Logout"
              width={25}
              height={25}
            />

            {label && <p className="text-light-2 max-lg:hidden">Logout</p>}
          </div>
        </SignOutButton>
      </SignedIn>
    </>
  );
};

export default LogoutButton;
