import { useContext } from "react";
import { AuthContext, AuthProvider } from "./auth/AuthContext";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import SignInRoutes from "./routes/SignInRoutes";

export const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
//wraps our app with the auth provider
function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}

function AuthenticatedApp() {
  const { isValidToken } = useContext(AuthContext);
  //show main page and todo if logged in, or login/register if not logged in
  return isValidToken ? <AuthenticatedRoutes /> : <SignInRoutes />;
}

export default App;
