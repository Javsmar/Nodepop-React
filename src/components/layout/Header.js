import Button from "../Button/Button";
import logo, { ReactComponent as Icon} from "../../assets/jordan-air-logo-svgrepo-com.svg"
console.log(logo);
window.logo = logo;
function Header(){
  return(
    <header>
      <Icon width={100} height={100} />
      <nav>
        <Button $variant="primary">Login</Button>
      </nav>
    </header>

  )
}

export default Header;