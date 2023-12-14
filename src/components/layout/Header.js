import Button from "../Button/Button";
import logo, { ReactComponent as Icon} from "../../assets/jordan-air-logo-svgrepo-com.svg"
import { logout } from "../../api/registerAndLogin";
import './styles/stylesHeader.css'
import { useAuth } from "../auth/context";

function Header(){
  const { isLogged, onLogout } = useAuth();

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return(
    <header className="header">
      <nav className="nav-header">
        <div className="icon-jordan">
          <Icon />
        </div>
        <h1>NodePop</h1>
        <div className="button-header">
          {isLogged ? (
            <Button onClick={handleLogoutClick}>Logout</Button>
          ) : (
          <Button $variant="primary">Login</Button>
          )}
        </div>
      </nav>
    </header>

  )
}

export default Header;