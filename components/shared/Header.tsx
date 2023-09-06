import LogoutButton from "@/components/client/LogoutButton";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  return (
    <>
      <nav className={`topbar`}>
        <Link href={`/`} className="flex items-center gap-4">
          <Image
            src={`/assets/logo.png`}
            alt="Threads logo"
            width={25}
            height={25}
          />

          <p className="text-heading3-bold text-light-1 max-xs:hidden">
            Threads
          </p>
        </Link>

        <div className="flex items-center gap-1">
          <div className="block md:hidden">
            <LogoutButton />
          </div>

          <OrganizationSwitcher
            appearance={{
              baseTheme: dark,
              elements: {
                organizationSwitcherTrigger: "py-2 px-4",
              },
            }}
          />
        </div>
      </nav>
    </>
  );
};

export default Header;
