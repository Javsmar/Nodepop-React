import './styles/stylesHeader.css';
import AuthButton from "../LoginPage/components/AuthButtons";
import { NavLink } from "react-router-dom";

function Header(){
  
  return(
    <header className="header">
      <nav className="nav-header">
        <div className="icon-jordan">
          
        </div>
        <div className="links-header">
          <NavLink to="/AdvertPage/new">New Advert</NavLink>
          <NavLink to="/Advertpage" end>Advert Page</NavLink>
          <h1>NodePop</h1>
        </div>
        <div className="button-header">
          <AuthButton />
        </div>
      </nav>
    </header>
  );
};
export default Header;