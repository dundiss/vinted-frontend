import "./App.css";
// import du package axios
import axios from "axios";
import { useState, useEffect } from "react";
import logo from "./assets/images/logo-vinted.png";
import banner from "./assets/images/banner-wide.jpg"

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get("https://vinted-pegasus21-dt.herokuapp.com/offers");
        const response = await axios.get("https://lereacteur-vinted-api.herokuapp.com/offers");
        console.log(response.data);
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
        <header className="container">
          <img src={logo} alt="logo vinted" />
          <input type="text" placeholder="Recherche des articles"></input>
          <button>S'inscrire</button>
          <button>Se connecter</button>
          <button>Vends tes articles</button>
        </header>
        <div className="hero">
          <img src={banner} alt="banner"/>
          <div>
            <h2>Prêt à faire du tri dans vos placards ?</h2>
            <button>Vends maintenant</button>
          </div>
        </div>
        <div className="container offers">
          {
            data.offers.map((offer, index) => {
              console.log(index + " " + offer.owner.account.avatar);
              const details = {};
              offer.product_details.forEach(element => {
                const key = Object.keys(element);
                details[key] = element[key]
              });
              const { TAILLE } = offer.product_details;
              console.log(offer.product_details);
              return (
                <div key={index} className="offer">
                  <div className="offer-header">
                    {offer.owner.account.avatar && <img src={offer.owner.account.avatar.secure_url} alt={`im-${index}`} />}
                    <span >{offer.owner.account.username}</span>
                  </div>
                  <img src={offer.product_image.secure_url} alt={`im-product${index}`} />
                  <span>{offer.product_price} €</span>
                  {details.TAILLE && <span>{details.TAILLE}</span>}
                  {details.MARQUE && <span>{details.MARQUE}</span>}
                </div>
              )
            })
          }
        </div>
    </div>
  );

}

export default App;
