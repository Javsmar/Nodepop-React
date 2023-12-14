import logo, { ReactComponent as Icon} from "../../assets/jordan-air-logo-svgrepo-com.svg"
import './styles/stylesHeader.css'
import AuthButton from "../LoginPage/components/AuthButtons";

function Header(){
  
  return(
    <header className="header">
      <nav className="nav-header">
        <div className="icon-jordan">
          <Icon />
        </div>
        <h1>NodePop</h1>
        <div className="button-header">
          <AuthButton />
        </div>
      </nav>
    </header>
  );
};
export default Header;