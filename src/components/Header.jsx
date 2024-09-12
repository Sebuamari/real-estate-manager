import { Link } from "react-router-dom";
import HeaderStyles from "../styles/sass/Header.module.scss";
import RedberryLogo from "../assets/images/redberry_logo.png";

function Header() {
    
    return (
      <header className={HeaderStyles.header_container}>
        <nav className={HeaderStyles.header}>
            <Link id={HeaderStyles.header_logo} to="/">
              <img src={RedberryLogo} alt="Redberry's logo" />
            </Link>
        </nav>
      </header>
    );
  }
  
  export default Header;