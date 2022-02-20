// import du package axios
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUserToken, show, setShow, setShowLogin, nextPage, setNextPage }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const navigate = useNavigate();

    const handleOnClose = () => {
        setShow(false);
    };

    const handleUsernameChange = event => {
        const value = event.target.value;
        setUsername(value);
    };

    const handleEmailChange = event => {
        const value = event.target.value;
        setEmail(value);
    };

    const handlePhoneChange = event => {
        const value = event.target.value;
        setPhone(value);
    };

    const handlePasswordChange = event => {
        const value = event.target.value;
        setPassword(value);
    };

    const handleOnClikForLogin = event => {
        handleOnClose();
        window.scrollTo(0, 0);
        setShowLogin(true);
    };


    const handleSubmit = async event => {
        event.preventDefault(); // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire
        //console.log(email, password);
        try {
            //const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/user/signup",
            const response = await axios.post("https://vinted-pegasus21-dt.herokuapp.com/user/signup",
                {
                    username: username,
                    email: email,
                    phone: phone,
                    password: password
                });
            
            if (response.data && response.data.token && (response.data.token !== "")) {
                Cookies.set("userToken", response.data.token);
                setUserToken(response.data.token);
                handleOnClose();
                navigate("/");
            }

            if (response.data && response.data.token && response.data.token !== "") {
                Cookies.set("userToken", response.data.token);
                Cookies.set("userId", response.data._id);
                //console.log("response.data._id ", response.data._id);
                //console.log("Cookies.get-user ", Cookies.get("userId"));
                setUserToken(response.data.token);
                handleOnClose();

                if (nextPage.state) {
                    if (nextPage.state.next) {
                        const next = nextPage;
                        //Clear state
                        setNextPage({});
                        console.log("next ", next);
                        navigate(next.state.next, { state: next.state });
                    }
                }
                else {
                    navigate("/");
                }

            }
            //console.log(response.data);

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div id="idSignup" className={showHideClassName}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <header className="container-signup">
                        <h2>S'inscrire</h2>
                        <span className="closebtn" onClick={handleOnClose}>×</span>
                    </header>
                    <form className="container" onSubmit={handleSubmit}>
                        <input
                            required
                            placeholder="Nom d'utilisateur"                    
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <input
                            required
                            placeholder="Email"
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <input
                            required
                            placeholder="Phone"
                            type="text"
                            name="Phone"
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                        <input
                            required
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={handlePasswordChange}
                        />

                        <div className="terms">
                            <div>
                                <input
                                    id="newsletter"
                                    type="checkbox"
                                    name="newsletter"
                                />
                                <label htmlFor="newsletter"> S'inscrire à notre newsletter</label>
                            </div>
                            <span>En m'inscrivant je confirme avoir lu et accepté les Termes & Conditions et politique de Confidentialité de Vinted. Je confirme avoir au moins 18ans.</span>
                        </div>                       
                        <input type="submit" value="S'inscrire" />
                    </form>
                    <span className="already-signup" onClick={handleOnClikForLogin}>Tu as déjà un compte ? Connecte-toi !</span>
                </div>
            </div>
        </div>
    )
}

export default Signup
