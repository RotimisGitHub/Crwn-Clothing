import {useContext, useState} from "react";
import '../Categories/shop.styles.scss'
import {BasketContext} from "../../Contexts/BasketProvider.component";

const ProductCard = ({id, name, imageUrl, price}) => {
    const {handleAddToBasket} = useContext(BasketContext);
    const [activeProductState, setProductState] = useState(false)


    return (
        <div
            className={'product-card'}
            onMouseOver={() => setProductState(true)}
            onMouseLeave={() => setProductState(false)}>

            <div className={'product-UI'}>

                <div className={'product-image-div'}>
                    {
                        activeProductState &&
                        <div className={'product-UI-overlay'}/>
                    }

                    <img src={imageUrl} alt={name}
                    />
                    {
                        activeProductState &&
                        <button className={'cart-action-button'}
                        onClick={() => handleAddToBasket(id, name, imageUrl, price)}>ADD TO BASKET</button>
                    }

                </div>

            </div>

            <div className={'product-description'}>
                <p><strong>{name}</strong></p>
                <p><strong>£{price}</strong></p>
            </div>

        </div>
    )

}

export default ProductCard;