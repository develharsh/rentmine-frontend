import "./App.css";
// import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import Home from "./pages/home";
import Signin from "./components/signin";
import Loading from "./components/design/loading";

function App() {
  return (
    <Router>
      <Signin />
      <Loading />
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/add-product"
          element={
            user && user.role === "Supplier" ? (
              <AddProduct />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        */}
      </Routes>
    </Router>
  );
}
export default App;
