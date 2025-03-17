import {BasketContext} from "../../Contexts/BasketProvider.component";
import './Checkout.styles.scss'
import {useContext} from "react";
import CheckoutProducts from "./Checkout-Products.component";


const Checkout = () => {

    const {basket, basketTotal} = useContext(BasketContext);
    const tableHeaders = ['', 'Product Name', 'Quantity', 'Price', 'Remove Item(s)']

    return (
        <div className={'checkout-page-container'}>
            <table className={'checkout-table'}
                   cellSpacing="0">
                <thead>
                <tr>
                    {
                        tableHeaders.map(title => <th className={'checkout-column'}>{title}</th>)
                    }
                </tr>
                </thead>
                <tbody>
                {


                    basket?.map(({id, ...item}) => {
                        const values = Object.values({
                            imageUrl: item.imageUrl,
                            name: item.name,
                            quantity: item.duplicates,
                            price: item.price,
                            deleteItem: 'Remove'
                        })
                        return <CheckoutProducts key={id} index={id} values={values}/>



                    })
                }
                </tbody>


            </table>
            <div className={'sales-total'}>
                <h2>TOTAL: £{basketTotal}</h2>
            </div>
        </div>
    )
}

export default Checkout;