import Button from "../Button/Button";
import logo, { ReactComponent as Icon} from "../../assets/jordan-air-logo-svgrepo-com.svg"
import { logout } from "../../api/registerAndLogin";

function Header({ isLogged, onLogout }){
  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return(
    <header>
      <Icon width={100} height={100} />
      <nav>
        {isLogged ? (
          <Button onClick={handleLogoutClick}>Logout</Button>
        ) : (
        <Button $variant="primary">Login</Button>
        )}
      </nav>
    </header>

  )
}

export default Header;