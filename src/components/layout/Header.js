import logo, { ReactComponent as Icon} from "../../assets/jordan-air-logo-svgrepo-com.svg"
import './styles/stylesHeader.css'
import AuthButton from "../LoginPage/components/AuthButtons";
import { Link, NavLink } from "react-router-dom";

function Header(){
  
  return(
    <header className="header">
      <nav className="nav-header">
        <div className="icon-jordan">
          <Icon />
        </div>
        <h1>NodePop</h1>
        <div className="links-header">
          <NavLink to="/AdvertPage/new">New Advert</NavLink>
          <NavLink to="/Advertpage" end>Advert Page</NavLink>
        </div>
        <div className="button-header">
          <AuthButton />
        </div>
      </nav>
    </header>
  );
};
export default Header;