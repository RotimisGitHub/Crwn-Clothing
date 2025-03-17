import './Checkout-Products.styles.scss';
import {BasketContext} from "../../Contexts/BasketProvider.component";
import {useContext} from "react";

const CheckoutProducts = ({index, values}) => {
    const {dispatch} = useContext(BasketContext);
    console.log(index)

    return (
        <tr
            className={'checkout-row'}>
            {values?.map((value, idx) => {
                let content;

                switch (idx) {
                    case 0:
                        content = <img src={value} alt={values[1]} height={150} width={150}/>;
                        break;
                    case values.length - 1:
                        content = <p className={'deleteItemButton'}
                                     onClick={() => dispatch({
                                         type: 'Delete',
                                         id: index
                                     })}><strong>{value}</strong></p>;
                        break;

                    case 2:
                        content = (
                            <div className={'quantity-alternate'}>
                                <p className={'arrows'}
                                   onClick={() => dispatch({
                                       type: 'Decrease Quantity',
                                       id: index
                                   })}><strong>{'< '}</strong></p>
                                <p>{value}</p>
                                <p className={'arrows'}
                                   onClick={() => dispatch({
                                       type: 'Increase Quantity',
                                       id: index
                                   })}><strong>{' >'}</strong></p>
                            </div>
                        )
                        break;
                    default:
                        content = <p>{value}</p>;
                        break;
                }

                return <td key={idx}>{content}</td>;
            })}


        </tr>
    )
}

export default CheckoutProducts;