import {createContext, useReducer} from "react";


export const BasketContext = createContext({
    basket: [],
    handleAddToBasket: () => {},

})

const BasketProvider = ({children}) => {


    const basketReducer = (basket, action) => {
        switch (action.type) {
            case 'Add' : {
                if (!basket.some(item => item.id === action.id)) {
                    return (

                        [...basket,
                            {
                                id: action.id,
                                name: action.name,
                                imageUrl: action.imageUrl,
                                price: action.price,
                                duplicates: 1,
                            }]


                    );
                } else {


                    return basket.map((item) =>
                        item.id === action.id
                            ? {...item, duplicates: item.duplicates + 1}
                            : item
                    );


                }
            }

            case 'Increase Quantity' : {
                return basket.map((item) =>
                    item.id === action.id
                        ? {...item, duplicates: item.duplicates + 1}
                        : item
                );
            }

            case 'Decrease Quantity': {
                return basket
                    .map((item) => {
                        if (item.id === action.id) {
                            if (item.duplicates <= 1) {
                                return null; // Mark item for removal
                            }
                            return { ...item, duplicates: item.duplicates - 1 }; // Decrease quantity
                        }
                        return item;
                    })
                    .filter((item) => item !== null); // Remove marked items
            }

            case 'Delete' : {
                return (
                    basket.filter((item) => action.id !== item.id)
                )

            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }

        }
    }

    const handleAddToBasket = (id, name, imageUrl, price) => {
        dispatch({
            type: 'Add',
            id,
            name,
            imageUrl,
            price
        });
    }


    const [basket, dispatch] = useReducer(basketReducer, []);
    const basketLength = basket.reduce((prev, item) => prev + item.duplicates, 0)
    const basketTotal = basket.reduce((prev, {price, duplicates}) => prev + (price * duplicates), 0)




    return (
        <BasketContext.Provider value={{basket, handleAddToBasket, dispatch, basketLength, basketTotal}}>
            {children}
        </BasketContext.Provider>

    )
}

export default BasketProvider;