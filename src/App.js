import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import du package axios
import axios from "axios";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom"
import Cookies from "js-cookie";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import logo from "./assets/images/logo-vinted.png";
import banner from "./assets/images/banner-wide.jpg"
import Header from "./components/Header";
import Publish from "./pages/Publish";

function App() {
  const [data, setData] = useState();
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await axios.get("http://localhost:3000/offers", { crossdomain: true });
        const response = await axios.get("https://vinted-pegasus21-dt.herokuapp.com/offers");
        //const response = await axios.get("https://lereacteur-vinted-api.herokuapp.com/offers");
        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
        
        <Router>
          <Header logo={logo} setData={setData} userToken={userToken} setUserToken={setUserToken}></Header>
          <nav>
            <ul>
              {/* <li>
                <Link to="/">Home</Link>
              </li> */}
              {/* <li>
                <Link to="/publish">Publish</Link>
              </li> */}
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home offers={data.offers} banner={banner} />} />
            <Route path="/publish" element={<Publish />} />
            <Route path="/offer/:id" element={<Offer userToken={userToken}/>} />
          </Routes>
        </Router>
    </div>
  )
}

export default App;
