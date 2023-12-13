import { logout } from "../api/registerAndLogin";
import Button from "./Button/Button";
import Layout from "./layout/layout";


const ShowProducts = ({ onLogout }) => {

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  return (
    <Layout title= "Nodepop Snikers">
      <div>
        <h1>Snikers</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </Layout>
  )
}

export default ShowProducts;