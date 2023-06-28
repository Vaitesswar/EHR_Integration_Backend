import { useKeycloak } from "@react-keycloak/web";
import App from '../App'


const PrivateRoute = () => {
 const { keycloak } = useKeycloak();

 const isLoggedIn = keycloak.authenticated;

 return isLoggedIn ? <App /> : <td dangerouslySetInnerHTML={{__html: "ERROR: PROTECTED PAGE"}} />;
};

export default PrivateRoute;