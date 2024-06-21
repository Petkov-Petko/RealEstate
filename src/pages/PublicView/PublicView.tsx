import NavBarPublic from "../../components/PublicPage/NavBarPublic/NavBarPublic";
import "./PublicView.css";
import TitlePublic from "../../components/PublicPage/TitlePublic/TitlePublic";
import AboutUs from "../../components/PublicPage/AboutUs/AboutUs";

const PublicView = () => {
  return (
    <div>
      <NavBarPublic />
      <TitlePublic />
      <AboutUs />
    </div>
  );
};

export default PublicView;
