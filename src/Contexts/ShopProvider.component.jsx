import {createContext, useEffect, useState} from "react";
import {getCollectionAndDocuments} from '../utils/firebase/firebase.utils'
export const ShopContext = createContext({
    products: [],
})

const ShopProvider = ({children}) => {


    const [products, setProducts] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            const categories = await getCollectionAndDocuments();
            setProducts(categories)
        }

        getCategories()
    }, []);

    // This Event Handler Retrieves User Data from Firebase and sets it into the Context that is now available
    // Across the Application

    const handleShopData = (data) => {
        setProducts(data);
    }



    return (
        <ShopContext.Provider value={{products, handleShopData}}>
            {children}
        </ShopContext.Provider>

    )
}

export default ShopProvider;