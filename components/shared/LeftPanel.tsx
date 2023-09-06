import LogoutButton from "@/components/client/LogoutButton";
import NavigationLinksWrapper from "@/components/client/NavigationLinksWrapper";
import { FC } from "react";

const LeftPanel: FC = () => {
  return (
    <>
      <section className="custom-scrollbar leftsidebar">
        <div className="w-full flex flex-1 flex-col gap-6 px-6">
          <NavigationLinksWrapper />
        </div>

        <div className="mt-10 px-6 cursor-pointer">
          <LogoutButton label />
        </div>
      </section>
    </>
  );
};

export default LeftPanel;
