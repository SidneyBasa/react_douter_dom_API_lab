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
    const deleteSeller = id => {
        setSellers(sellers.filter(s => s.id !== id))
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .catch(error => {
            setErrors(error.message)
            setSellers(sellers)
        })
    }

    return (
    <>
        <h3>Admin Sellers Page</h3>;
        <input type="text" onChange={e => setName(e.target.value)} />
        <button onClick={addSeller}>Add Seller</button>
        {isLoading && <Loader />}
        {errors && <em>{errors}</em>}

        <table>
            <tbody>
                    {sellers.map(seller => 
                <tr key={seller.id}>
                    <td>{seller.name}</td>
                    <td><button onClick={() => deleteSeller(seller.id)}>Delete</button></td>
                </tr>
                )}
            </tbody>
        </table>
        
    </>
    )
};

export default Sellers;
