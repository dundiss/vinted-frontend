import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ title, orderPrice, productId, completed, setCompleted}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // On récupère ici les données bancaires que l'utilisateur rentre
        const cardElement = elements.getElement(CardElement);

        // Demande de création d'un token via l'API Stripe
        // On envoie les données bancaires dans la requête
        const stripeResponse = await stripe.createToken(cardElement, {
            name: "L'id de l'acheteur",
        });
        console.log(stripeResponse);
        const stripeToken = stripeResponse.token.id;
        // Une fois le token reçu depuis l'API Stripe
        // Requête vers notre serveur
        // On envoie le token reçu depuis l'API Stripe
        //const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/payment", {
        const response = await axios.post("http://localhost:3000/payment", {
            token: stripeToken,
            productId: productId,
            amount: orderPrice,            
            title: title
        });

        console.log(response.data);
        // Si la réponse du serveur est favorable, la transaction a eu lieu
        if (response.data.status === "succeeded") {
            setCompleted(true);
        }
    };

    return (
        <>
            {!completed ? (
                <form className="command-content" onSubmit={handleSubmit}>
                    <hr/>
                    <CardElement className=".cardElement"/>
                    <hr />
                    <button className="command-content" type="submit">Payer</button>
                </form>
            ) : (
                <span>Paiement effectué ! </span>
            )}
        </>
    );
};

export default CheckoutForm;