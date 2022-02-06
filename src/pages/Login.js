// import du package axios
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsConnected, show, setShow}) => {
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

    const handleSubmit = async event => {
        event.preventDefault(); // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire
        //console.log(email, password);
        try {
            const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/user/login",
                {
                    email: email,
                    password: password
                });
            //console.log(response.data);
            if (response.data && response.data.token && response.data.token !== "") {
                Cookies.set("token", response.data.token);
                setIsConnected(true);
                handleOnClose();
                navigate("/");
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
                </div>
            </div>
        </div>
    )
}

export default Login
