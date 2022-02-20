import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Offer = ({ setShowLogin, setNextPage}) => {
    const [data, setData] = useState();
    const [details, setDetails] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    const handleOrderClick = () => {
        if (Cookies.get("userToken")){
            navigate("/payment", { state: { orderPrice: data.product_price, productId: data._id, title: data.product_name } });
        }
        else {
            setNextPage({ state: { next: "/payment", orderPrice: data.product_price, productId: data._id, title: data.product_name } });
            window.scrollTo(0, 0);
            setShowLogin(true);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://vinted-pegasus21-dt.herokuapp.com/offer/${id}`);
                //const response = await axios.get(`https://lereacteur-vinted-api.herokuapp.com/offer/${id}`);
                //const response = await axios.get("https://lereacteur-vinted.netlify.app/offer/62014e7cc00de47d92e8bf05");
                console.log(response.data);
                setData(response.data);
                setDetails({});
                const tmpDetails = {};
                if (response.data && response.data.product_details) {
                    response.data.product_details.forEach(element => {
                        const key = Object.keys(element);
                        tmpDetails[key] = element[key]
                    });
                }
                setDetails(tmpDetails);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="container container-offer">
            <>
                {data && data.product_image && <img src={data.product_image.secure_url} alt="product-im" />}
                {/* <span>The offer id is : {id}</span> */}
            </>
            <div className="details">
                {data && data.product_price && <h2>{data.product_price} €</h2>}
                {details &&
                    <table>
                        <tbody>
                        {details.MARQUE &&
                            <tr>
                                <td className="left-col">MARQUE</td>
                                <td className="right-col">{details.MARQUE}</td>
                            </tr>
                        }
                        {details.TAILLE && 
                            <tr >
                                <td className="left-col">TAILLE</td>
                                <td className="right-col">{details.TAILLE}</td>
                            </tr>
                        }
                        {details.ÉTAT &&
                            <tr >
                                <td className="left-col">ÉTAT</td>
                                <td className="right-col">{details.ÉTAT}</td>
                            </tr>
                        }
                        {details.COULEUR &&
                            <tr >
                                <td className="left-col">COULEUR</td>
                                <td className="right-col">{details.COULEUR}</td>
                            </tr>
                        }
                        {details.EMPLACEMENT &&
                            <tr >
                                <td className="left-col">EMPLACEMENT</td>
                                <td className="right-col">{details.EMPLACEMENT}</td>
                            </tr>
                        }
                        </tbody>
                    </table>                    
                }
                <hr className="line"></hr>

                {data && data.product_name && <h3>{data.product_name}</h3>}
                {data && data.product_description && <span>{data.product_description}</span>}
                <div className="offer-owner">
                    {data && data.owner.account.avatar && <img src={data.owner.account.avatar.secure_url} alt={`im-product`} />}
                    {data && <span>{data.owner.account.username}</span>}
                </div>
                <button onClick={handleOrderClick}>Acheter</button>
            </div>
            
        </div>
        
    )
}

export default Offer;
