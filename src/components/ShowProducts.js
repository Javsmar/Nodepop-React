import { logout } from "../api/registerAndLogin";
import Button from "./Button/Button";

const ShowProducts = ({ onLogout }) => {

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  return (
    <div>
      <h1>Products</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default ShowProducts;