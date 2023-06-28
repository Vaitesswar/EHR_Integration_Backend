import { useKeycloak } from "@react-keycloak/web";

function Homepage() {
    const { keycloak, initialized } = useKeycloak();

    return (
        <div className="App">
            <header className="App-header">
                <h1> Welcome to DocPat App ! </h1>
                <h3> The doctor-friendly application for monitoring patient appointments</h3>
                <button onClick={() => keycloak.login({redirectUri:'http://localhost:3000/getAppt'})}>Login</button>
            </header>
        </div>  
    )
}

export default Homepage;