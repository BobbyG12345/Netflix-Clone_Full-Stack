import HomeScreen from "./HomeScreen.jsx";
import AuthScreen from "./AuthScreen.jsx";
import { useAuthStore } from "../../store/useAuthStore.js";

const HomePage = () => {
  const { user } = useAuthStore();

  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
