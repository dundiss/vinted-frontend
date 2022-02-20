import React from 'react'
import Hero from '../components/Hero';
import { useNavigate } from "react-router-dom";

function Home({ offers, banner }) {
    const navigate = useNavigate();

    function handleClick(event, id) {
        event.preventDefault();
        navigate(`/offer/${id}`);
    }

    return (
        <div>
            <Hero banner={banner}></Hero>
            <div className="container offers">
                {
                    offers.map((offer, index) => {
                        //console.log(index + " " + offer.owner.account.avatar);
                        const details = {};
                        offer.product_details.forEach(element => {
                            const key = Object.keys(element);
                            details[key] = element[key]
                        });

                        const avatar = "";
                        if (offer.owner.account.avatar && offer.owner.account.avatar.secure_url) {
                            avatar = offer.owner.account.avatar.secure_url;
                        }

                        //console.log(offer.product_details);
                        return (
                            <div key={index} className="offer">
                                <div className="offer-header">
                                    {avatar ?
                                    <img src={avatar} alt={`im-${index}`} />
                                    :
                                    <span className="initial">{offer.owner.account.username[0]}</span>}
                                    <span >{offer.owner.account.username}</span>
                                </div>
                                <img src={offer.product_image && offer.product_image.secure_url} alt={`im-product${index}`} onClick={((e) => { handleClick(e, offer._id) })}/>
                                <span>{offer.product_price} €</span>
                                {details.TAILLE && <span>{details.TAILLE}</span>}
                                {details.MARQUE && <span>{details.MARQUE}</span>}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;