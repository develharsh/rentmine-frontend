import { useContext } from "react";
import { DataContext } from "../store/globalstate";

const Home = () => {
  const { state } = useContext(DataContext);
  return (
    <div>
      {state.userSession ? (
        <div>
          <h1>Welcome to Home, Dear {state.userSession.name}</h1>
          <img src={state.userSession.picture} alt="as" />
        </div>
      ) : (
        <h1>Welcome to Home, Please Login</h1>
      )}
    </div>
  );
};

export default Home;
