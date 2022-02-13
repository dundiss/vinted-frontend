import axios from 'axios';
import { useState } from "react";

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

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("selectedFile", selectedFile);

        
        try {
            console.log(userToken);
            const fields = {
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

            console.log(fields);

            // const response = await axios(
            //     {
            //         method:'post',
            //         url: 'https://vinted-pegasus21-dt.herokuapp.com/offer/publish',
            //         //url: 'http://localhost:3000/offer/publish',
            //         data: fields,
            //         headers: {
            //             'Access-Control-Allow-Origin': '*',
            //             // 'Access-Control-Allow-Origin': true,
            //             //"Authorization": `Bearer ${userToken}`,
            //             "Authorization": "Bearer niZ4g4RW8lsciIQi",
            //             "Content-Type": "multipart/form-data"
            //         }
            //     }
            //     // headers: { "Content-Type": "multipart/form-data" },
            // );
            const response = await axios.post(
                "https://vinted-pegasus21-dt.herokuapp.com/offer/publish", fields, { headers: { "Authorization": "Bearer niZ4g4RW8lsciIQi" }}
            );
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
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
        <form className="publish-form" onSubmit={handleSubmit}>
            <input type="file"
                name="fileSelect"
                // value="Ajouter une photo"
                onChange={handleFileSelect} />
            <input
                required
                placeholder="Titre"
                type="text"
                name="title"
                value={title}
                onChange={handleTitleChange}
            />
            <input
                required
                placeholder="Décris ton article"
                type="text"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
            />
            <input
                required
                placeholder="Marque"
                type="text"
                name="brand"
                value={brand}
                onChange={handleBrandChange}
            />

            <input
                required
                placeholder="Taille"
                type="text"
                name="size"
                value={size}
                onChange={handleSizeChange}
            />

            <input
                required
                placeholder="Couleur"
                type="text"
                name="color"
                value={color}
                onChange={handleColorChange}
            />

            <input
                required
                placeholder="Etat"
                type="text"
                name="state"
                value={state}
                onChange={handleStateChange}
            />

            <input
                required
                placeholder="Ville"
                type="text"
                name="city"
                value={city}
                onChange={handleCityChange}
            />

            <input
                required
                placeholder="Prix"
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
            
            <input type="submit" value="Ajouter" />
        </form>
    )
}

export default Publish
