import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Publish = ({ userToken }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState(0);
    const [exchangeSelected, setExchangeSelected] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("selectedFile", selectedFile);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("condition", state);
        formData.append("city", city);
        formData.append("brand", brand);
        formData.append("size", size);
        formData.append("color", color);
        formData.append("picture", selectedFile);

        
        try {
            console.log(userToken);
            const data = {
                title: title,
                description: description,
                price: price,
                condition: state,
                city: city,
                brand: brand,
                size: size,
                color: color,
                picture: selectedFile
            };

            console.log(data);

            const response = await axios.post(
                "https://vinted-pegasus21-dt.herokuapp.com/offer/publish",
                formData,
                {
                    headers: {
                        "Authorization": "Bearer " + userToken,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            console.log(response);
            navigate(`offer/${response.data._id}`);
        } catch (error) {
            console.error(error)
        }
    }

    const handleFileSelect = (event) => {
        console.log(event.target.files);
        let selectedFile = event.target.files[0];
        selectedFile.path = null;//URL.createObjectURL(selectedFile);
        console.log("selectedFile : ", selectedFile);
        setSelectedFile(event.target.files[0]);
        document.uploaded_im.src = URL.createObjectURL(event.target.files[0]);
    }

    const handleTitleChange = event => {
        const value = event.target.value;
        setTitle(value);
    };

    const handleDescriptionChange = event => {
        const value = event.target.value;
        setDescription(value);
    };

    const handleBrandChange = event => {
        const value = event.target.value;
        setBrand(value);
    };

    const handleSizeChange = event => {
        const value = event.target.value;
        setSize(value);
    };

    const handleColorChange = event => {
        const value = event.target.value;
        setColor(value);
    };

    const handleStateChange = event => {
        const value = event.target.value;
        setState(value);
    };

    const handleCityChange = event => {
        const value = event.target.value;
        setCity(value);
    };

    const handlePriceChange = event => {
        const value = event.target.value;
        setPrice(Number(value));
    };

    const handleExchangeSelectedChange = event => {
        const value = event.target.value;
        setExchangeSelected(!value);
    };

    return (
        <div className="container product">
            <h3>Vends ton article</h3>
            <form className="publish-form" onSubmit={handleSubmit}>
                
                <div className="product-desc">
                    <img name="uploaded_im" src="" alt=""/>
                    <label htmlFor="fileSelect"><input id="fileSelect"type="file"
                        name="fileSelect"
                        onChange={handleFileSelect} />Ajouter une photo</label>
                    
                </div>
                <div className="product-desc">
                    <label htmlFor="title">Titre</label>
                    <input
                        required
                        id="title"
                        placeholder="ex: Chemise Sézane verte"
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>

                <div className="product-desc">
                    <label htmlFor="description">Décris ton article</label>
                    <input
                        required
                        id="description"
                        placeholder="ex: porté quelquefois, taille correctement"
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>

                <div className="product-desc">
                    <label htmlFor="brand">Marque</label>
                    <input
                        required
                        id="brand"
                        placeholder="ex: Zara"
                        type="text"
                        name="brand"
                        value={brand}
                        onChange={handleBrandChange}
                    />
                </div>


                <div className="product-desc">
                    <label htmlFor="size">Taille</label>
                    <input
                        required
                        id="size"
                        placeholder="ex: L / 40 / 12"
                        type="text"
                        name="size"
                        value={size}
                        onChange={handleSizeChange}
                    />
                </div>

                <div className="product-desc">
                    <label htmlFor="color">Couleur</label>
                    <input
                        required
                        id="color"
                        placeholder="ex: Fushia"
                        type="text"
                        name="color"
                        value={color}
                        onChange={handleColorChange}
                    />
                </div>

                <div className="product-desc">
                    <label htmlFor="state">Etat</label>
                    <input
                        required
                        id="state"
                        placeholder="ex: Neuf avec étiquette"
                        type="text"
                        name="state"
                        value={state}
                        onChange={handleStateChange}
                    />
                </div>

                <div className="product-desc">
                    <label htmlFor="city">Lieu</label>
                    <input
                        required
                        id="city"
                        placeholder="ex: Paris"
                        type="text"
                        name="city"
                        value={city}
                        onChange={handleCityChange}
                    />
                </div>
                <div className="product-desc">
                    <label htmlFor="price">Prix</label>
                    <div className="exchange">
                        <input
                            required
                            placeholder="0.00 €"
                            type="number"
                            name="price"
                            value={price}
                            onChange={handlePriceChange}
                        />
                        <div>
                            <input
                                id="exchange"
                                type="checkbox"
                                name="exchange"
                                value={exchangeSelected}
                                onChange={handleExchangeSelectedChange}
                            />
                            <label htmlFor="exchange"> Je suis intéressé par les échanges</label>
                        </div>
                        
                    </div>
                </div>
                <input type="submit" value="Ajouter" />
            </form>
        </div>
        
    )
}

export default Publish
