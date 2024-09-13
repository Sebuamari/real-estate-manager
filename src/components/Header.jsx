import { Link } from "react-router-dom";
import HeaderStyles from "../styles/sass/Header.module.scss";
import RedberryLogo from "../assets/images/redberry_logo.png";

const Header = () => {
    return (
      <div className={HeaderStyles.header_container}>
        <nav className={HeaderStyles.header}>
            <Link id={HeaderStyles.header_logo} to="/">
              <img src={RedberryLogo} alt="Redberry's logo" />
            </Link>
        </nav>
      </div>
    );
};
  
export default Header;