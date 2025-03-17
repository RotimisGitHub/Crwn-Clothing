import {ShopContext} from '../../Contexts/ShopProvider.component'
import {useContext} from "react";
import ProductCard from "./product-card.components";
import './shop.styles.scss'

const CategoryCollection = ({title}) => {
    const {products} = useContext(ShopContext);
    console.log(products[title])

    return (
        <div className={'shop-content'}>
            {
                products[title]?.map(({id, name, imageUrl, price}) => {
                        return (
                            <ProductCard key={id} id={id} name={name} imageUrl={imageUrl} price={price} />
                        )

                    }
                )
            }
        </div>


    )
}

export default CategoryCollection;