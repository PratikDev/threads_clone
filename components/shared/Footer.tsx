import NavigationLinksWrapper from "@/components/client/NavigationLinksWrapper";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <>
      <section className="bottombar">
        <div className="bottombar_container">
          <NavigationLinksWrapper bottomBar />
        </div>
      </section>
    </>
  );
};

export default Footer;
