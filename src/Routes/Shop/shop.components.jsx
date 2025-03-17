import {ShopContext} from '../../Contexts/ShopProvider.component'
import {useContext} from "react";
import ProductCard from "./product-card.components";
import '../Categories/shop.styles.scss'

const Shop = () => {
    const {products} = useContext(ShopContext);


    return (
        <div className={'shop-content'}>
            {
                products.map(({id, name, imageUrl, price}) => {
                        return (
                            <ProductCard key={id} id={id} name={name} imageUrl={imageUrl} price={price} />
                        )

                    }
                )
            }
        </div>


    )
}

export default Shop;