import React from 'react'
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header({ logo, setData, userToken, setUserToken, showLogin, setShowLogin, showSignup, setShowSignup, nextPage, setNextPage }) {
    const navigate = useNavigate();
    const [searchText, setsearchText] = useState("");
    const [isAscSort, setIsAscSort] = useState(true);
    const [priceMin, setPriceMin] = useState(10);
    const [priceMax, setPriceMax] = useState(10);
    // const [priceMaxMinRange, setPriceMaxMinRange] = useState(10);
      

    const handleOnClickLogin = () => {
        if (userToken === null) {
            //console.log("not connected");
            setShowLogin(true);
        }
        else {
            //console.log("connected");
            setUserToken(null);
            setShowLogin(false);
            Cookies.remove("userToken");
            Cookies.remove("userId");
            navigate("/");
        }
    }

    const handleOnClickSignup = () => {
        setShowSignup(true);
    }

    const onSortTypeChange=() => {
        setIsAscSort(!isAscSort);
    }

    const handleOnPriceMinChange = (event) => {
        setPriceMin(event.target.value);
        console.log(event.target);
    }

    const handleOnPriceMaxChange = (event) => {
        
        const priceMax = event.target.value;
        console.log(event.target);
        setPriceMax(priceMax);
        // if (priceMax > (2 * priceMin)) {
        //     setPriceMaxMinRange((2 * priceMaxMinRange ));
        // } else {
        //     setPriceMaxMinRange(10);
        // }
    }

    const handleSearch = async (event) => {
        setsearchText(event.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let filter = "";
                const sortType = isAscSort ? "?sort=price-asc" : "?sort=price-desc";
                filter += sortType;
                if (searchText) {
                    filter += `&title=${searchText}`
                }
                if (priceMax>10) {
                    filter += `&priceMin=${priceMin}`;
                    filter += `&priceMax=${priceMax}`
                }
                //const response = await axios.get(`http://localhost:3000/offers${filter}`);
                const response = await axios.get(`https://vinted-pegasus21-dt.herokuapp.com/offers${filter}`);
                
                setData(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [searchText, isAscSort, priceMin, priceMax, userToken, setData]);

    return (
        <header className="container">
            <img src={logo} alt="logo vinted" onClick={() => {
                navigate("/");
            }}/>
            <div className="search-container">
                <input onChange={handleSearch} type="text" placeholder="Recherche des articles"></input>
                <div className="filter-class">
                    <div className="filter-container switch-text">
                        <label className="switch">
                            <input type="checkbox" value={isAscSort} onChange={onSortTypeChange} />
                            <span className="slider round"> ???</span>
                        </label>
                    </div>
                    <div className="range-wrap">
                        {/* <output htmlFor="price" onforminput="value = price.valueAsNumber;"></output> */}
                        <output htmlFor="price" value={priceMax}>Trier par prix :</output>
                        <input className="price-min" z-index={priceMax > priceMin ? "1" : "0"} type="range" name="price-min" min="10" max={priceMax} value={priceMin} step="1" onChange={handleOnPriceMinChange}></input>
                        <input className="price-max" type="range" name="price-max" min={priceMin} max="500" value={priceMax} step="1" onChange={handleOnPriceMaxChange}></input>
                        {/* <input id="price-inp" type="range" name="price" min="1" max="250" value="3" step="5" /> */}
                    </div>
                </div>
                
            </div>
            
            {!userToken  && <button onClick={handleOnClickSignup}>S'inscrire</button>}
            {(userToken !== null )?
                (
                    <>
                    <button onClick={handleOnClickLogin} className="toDisconnect">Se d??connecter</button>
                    <button onClick={()=>{navigate("/publish")}} className="btn-vente">Vends tes articles</button>
                    </>
                )
                :
                (
                <div>
                    <button onClick={handleOnClickLogin} className="toConnect">Se connecter</button>
                    <Login
                        userToken={userToken}
                        setUserToken={setUserToken}
                        show={showLogin}
                        setShow={setShowLogin}
                        setShowSignup={setShowSignup}
                        nextPage={nextPage}
                        setNextPage={setNextPage}>                            
                    </Login>
                    <Signup
                        userToken={userToken}
                        setUserToken={setUserToken}
                        show={showSignup}
                        setShow={setShowSignup}
                        setShowLogin={setShowLogin}
                        nextPage={nextPage}
                        setNextPage={setNextPage}>
                    </Signup>
                    <button onClick={() => { navigate("/publish") }} className="btn-vente">Vends tes articles</button>
                </div>
                )
            }
        </header>
    )
}

export default Header
