import React from 'react'

function Header({logo}) {
    return (
        <header className="container">
            <img src={logo} alt="logo vinted" />
            <input type="text" placeholder="Recherche des articles"></input>
            <button>S'inscrire</button>
            <button>Se connecter</button>
            <button>Vends tes articles</button>
        </header>
    )
}

export default Header
