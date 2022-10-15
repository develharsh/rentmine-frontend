import "./App.css";
// import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import Home from "./pages/home";
import PropertyAdd from "./pages/property-add";
import PropertyList from "./pages/property-list";
// import Signin from "./components/signin";
import Header from "./components/design/header";
import Footer from "./components/design/footer";
import Loading from "./components/design/loading";

function App() {
  return (
    <Router>
      <Header />
      <Loading />
      {/* <Signin /> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/property/add" element={<PropertyAdd />} />
        <Route exact path="/property/list" element={<PropertyList />} />
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
      <Footer />
    </Router>
  );
}
export default App;
