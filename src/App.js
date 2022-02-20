import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import du package axios
import axios from "axios";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom"
import Cookies from "js-cookie";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";
import logo from "./assets/images/logo-vinted.png";
import banner from "./assets/images/banner-wide.jpg"

function App() {
  const [data, setData] = useState();
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [nextPage, setNextPage] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await axios.get("http://localhost:/offers");
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
          <Header
            logo={logo}
            setData={setData}
            userToken={userToken}
            setUserToken={setUserToken}
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            showSignup={showSignup}
            setShowSignup={setShowSignup}
            nextPage={nextPage}
            setNextPage={setNextPage}>
          </Header>
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
            <Route path="/publish" element={<Publish setShowLogin={setShowLogin}/>} />
            <Route path="/offer/:id" element={<Offer setShowLogin={setShowLogin} setNextPage={setNextPage}/>} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App;
