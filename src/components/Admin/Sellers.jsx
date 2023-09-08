import React, { useEffect, useState } from "react";
import axios from 'axios';
import Loader from "../Common/Loader";


const Sellers = () => {
    const [name, setName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [sellers, setSellers] = useState([])
    const [errors, setErrors] = useState("")

    useEffect(() => {
        // fetchSellers()
        setIsLoading(true)
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => { 
            setSellers(response.data)
            setIsLoading(false)
            }
            ).catch(error => {
                setIsLoading(false);
                setErrors(error.message)}
                )
    }, []);

    const addSeller = () => {
        const newSeller = {
            // is the same as the key value pair:
            // name: name 
            name,
            id: sellers.length + 1, 
        }
        setSellers([newSeller, ...sellers]);
        axios.post("https://jsonplaceholder.typicode.com/users",
        newSeller).then(response => setSellers([response.data, ...sellers]))
        .catch(error => {
            setErrors(error.message)
            setSellers(sellers)
        })
    }

    // const fetchSellers = async() => {
    //     setIsLoading(true)
    //     try {
    //         const response = await axios.get("https://jsonplaceholder.typicode.com/users")
    //         setSellers(response.data)
    //         setIsLoading(false)
    //     } catch (error) {
    //         setIsLoading(false);
    //         setErrors(error.message)}
    //     }

    return (
    <>
        <h3>Admin Sellers Page</h3>;
        <input type="text" onChange={e => setName(e.target.value)} />
        <button onClick={addSeller}>Add Seller</button>
        {isLoading && <Loader />}
        {errors && <em>{errors}</em>}
        {sellers.map(sellers => <p key={sellers.id}>{sellers.name}</p>)}
    </>
    )
};

export default Sellers;
