import './Basket.styles.scss'
import {useContext} from "react";
import {BasketContext} from "../../Contexts/BasketProvider.component";
import BasketItem from "./Basket-item.component";
import {Link} from "react-router-dom";

const Basket = () => {
    const {basket, basketTotal} = useContext(BasketContext);
    return (
        <div className={'basket-dropdown'}>
            <div className={'basket-items'}>
                <div className={'item-div'}>
                    {
                        basket.map(item =>
                            <BasketItem key={item.id} item={item}/>
                        )
                    }


                </div>

            </div>

            <div className={'checkout-action-container'}>
                <h3>Total: £{basketTotal}</h3>
                <Link className='nav-links-logos'
                      to='checkout'>
                <button className={'checkout-action-button'}>
                    <strong>
                        CHECKOUT
                    </strong>

                </button>
                </Link>
            </div>

        </div>
    )
}

export default Basket;