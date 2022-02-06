import React from 'react'
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Header({ logo, isConnected, setIsConnected }) {
    let navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    useEffect(() => {
        const processToken = () => {
            const token = Cookies.get("token");
            if (token && token !== "") {
                setIsConnected(true);
            }
            else {
                setIsConnected(false);
            }
        }
        processToken();
    }, [setIsConnected]);

    const handleOnClickLogin = (event) => {
        const buttonLabel = event.target.innerText;
        // console.log(buttonLabel);
        // console.log(event.target.innerText);
        if (buttonLabel.includes("Se connecter")) {
            //console.log("connected");
            setShowLogin(true);
        }
        else {
            Cookies.remove("token");
            setIsConnected(false);
            setShowLogin(false);
            navigate("/");
        }
    }

    const handleOnClickSignup = () => {
        setShowSignup(true);
    }

    return (
        <header className="container">
            <img src={logo} alt="logo vinted" />
            <input type="text" placeholder="Recherche des articles"></input>
            {!isConnected && <button onClick={handleOnClickSignup}>S'inscrire</button>}
            <button onClick={handleOnClickLogin}
                className={isConnected ? "toDisconnect" : "toConnect"}
            >{isConnected ? "Se déconnecter" : "Se connecter"}</button>
            <button>Vends tes articles</button>
            <Login setIsConnected={setIsConnected} show={showLogin} setShow={setShowLogin}></Login>
            <Signup setIsConnected={setIsConnected} show={showSignup} setShow={setShowSignup} setShowLogin={setShowLogin}></Signup>
        </header>
    )
}

export default Header
