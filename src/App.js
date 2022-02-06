import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import du package axios
import axios from "axios";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import logo from "./assets/images/logo-vinted.png";
import banner from "./assets/images/banner-wide.jpg"
import Header from "./components/Header";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get("https://vinted-pegasus21-dt.herokuapp.com/offers");
        const response = await axios.get("https://lereacteur-vinted-api.herokuapp.com/offers");
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
          <Header logo={logo} isConnected={isConnected} setIsConnected={setIsConnected}></Header>
          {/* <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav> */}
          <Routes>
            <Route path="/" element={<Home offers={data.offers} banner={banner}/>} />
            <Route path="/offer/:id" element={<Offer />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App;
