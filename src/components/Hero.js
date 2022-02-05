import React from 'react'

function Hero ({banner}){
    return (
        <div className="hero">
            <img src={banner} alt="banner" />
            <div>
                <h2>Prêt à faire du tri dans vos placards ?</h2>
                <button>Vends maintenant</button>
            </div>
        </div>
    )
}

export default Hero
