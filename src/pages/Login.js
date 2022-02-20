// import du package axios
import axios from "axios";
import { useState, useEffect} from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = ({ setUserToken, show, setShow, setShowSignup, nextPage, setNextPage}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const navigate = useNavigate();

    const handleOnClose = () => {
        setShow(false);
    };

    const handleEmailChange = event => {
        const value = event.target.value;
        setEmail(value);
    };

    const handlePasswordChange = event => {
        const value = event.target.value;
        setPassword(value);
    };

    const handleSignup = () => {
        handleOnClose();
        setShowSignup(true);
    }

    const handleSubmit = async event => {
        event.preventDefault(); // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire
        //console.log(email, password);
        try {
            // const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/user/login",
            const response = await axios.post("https://vinted-pegasus21-dt.herokuapp.com/user/login",
            //const response = await axios.post("http://localhost:3000/user/login",
                {
                    email: email,
                    password: password
                });
            //console.log(response.data);
            if (response.data && response.data.token && response.data.token !== "") {
                Cookies.set("userToken", response.data.token);
                Cookies.set("userId", response.data._id);
                console.log("response.data._id ", response.data._id);
                console.log("Cookies.get-user ", Cookies.get("userId"));
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

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div id="idLogin" className={showHideClassName}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <header className="container-login">
                        <h2>Se connecter</h2>
                        <span className="closebtn" onClick={handleOnClose}>×</span>
                    </header>
                    <form className="container" onSubmit={handleSubmit}>
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
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={handlePasswordChange}
                        />

                        <input type="submit" value="Se connecter" />
                    </form>
                    <span onClick={handleSignup} className="signup">Pas encore de compte ? Inscris-toi !</span>
                </div>
            </div>
        </div>
    )
}

export default Login
