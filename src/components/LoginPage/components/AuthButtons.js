import { Link } from "react-router-dom";
import { logout } from "../../../api/registerAndLogin";
import Button from "../../Button/Button";
import { useAuth } from "../../auth/context";

function AuthButton (){
  const  { isLogged, onLogout } = useAuth();

  const handleLogoutClick = async () => { 
    await logout();
    onLogout();
  };

  return isLogged ? (
    <Button  onClick={handleLogoutClick}>Logout</Button>
  ) : (
    <Button as={Link} to="/login" replace $variant="primary">Login</Button>
  );
};

export default AuthButton;