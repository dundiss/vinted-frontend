
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51KUwoEIXtdbtc6AFEJU48AwdbBX7afDah2erzZ8NAYzp73AV4SqJDPgLwyMc8wxyefBFmSOh5nbHXwzp90TrZG8a00WPot9hau");
//const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");
const Payment = () => {
    const [completed, setCompleted] = useState(false);
    const location = useLocation();
    console.log("location ", location);
    const { title, orderPrice, productId} = location.state;
    const shippingPrice = 2.00;
    const userInsurance = 1.00;
    const total = orderPrice + shippingPrice + userInsurance;
    return (
        <div className="container">
            <div className="command">
                <div className="command-content">
                    <p className="summary">Résumé de la commande</p>
                    <div className="content">Commande<span>{orderPrice} €</span></div>
                    <div className="content">Frais de protection acheteurs<span>{userInsurance} €</span></div>
                    <div className="content">Frais de port<span>{shippingPrice} €</span></div>
                </div>
                <hr />
                <div className="command-content">
                    <div className="content total">Total<span>{total.toFixed(2)} €</span></div>
                    {!completed && <p>Il ne vous reste plus qu'un étape pour vous offrir <span>{title}</span>. Vous allez payer <span>{total} €</span> (frais de protection et frais de port inclus).</p>}
                </div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm orderPrice={total} title={title} productId={productId} completed={completed} setCompleted={setCompleted}/>
                </Elements>
                
            </div>
        </div>
    )
}

export default Payment;