import {
  DefaultMenu,
  HomePageOne,
  HomePageThree,
  HomePageTwo,
} from "./HeaderStyle";
import { MobileMenu } from "./Menu";

const Header = ({ homePage, withoutContainer }) => {
  const headerStyle = () => {
    switch (homePage) {
      case 1:
        return <HomePageOne />;
      case 2:
        return <HomePageTwo />;
      case 3:
        return <HomePageThree />;
      default:
        return <DefaultMenu />;
    }
  };
  return (
    <div className={withoutContainer ? "" : "container-fluid"}>
      {headerStyle()}
      <MobileMenu />
    </div>
  );
};

export default Header;
