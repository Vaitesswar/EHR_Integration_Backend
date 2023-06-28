import { useKeycloak } from "@react-keycloak/web";
import CreateAppt from '../components/createAppt';

const PrivateRoute2 = () => {
 const { keycloak } = useKeycloak();

 const isLoggedIn = keycloak.authenticated;

 return isLoggedIn ? <CreateAppt /> : <td dangerouslySetInnerHTML={{__html: "ERROR: PROTECTED PAGE"}} />;
};

export default PrivateRoute2;