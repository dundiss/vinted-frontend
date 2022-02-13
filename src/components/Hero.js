import React from 'react'
import { useNavigate } from "react-router-dom";

function Hero({ banner }) {
    const navigate = useNavigate();
    return (
        <div className="hero">
            <img src={banner} alt="banner" />
            <div>
                <h2>Prêt à faire du tri dans vos placards ?</h2>
                <button onClick={() => { navigate("/publish") }}>Vends maintenant</button>
            </div>
        </div>
    )
}

export default Hero
