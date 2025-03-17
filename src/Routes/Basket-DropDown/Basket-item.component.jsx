import './Basket-Item.styles.scss'


const BasketItem = ({item}) => {

    const {id, name, imageUrl, price, duplicates} = item;
    return (
        <div
            className={'individual-items-div'}
            key={id}>
            <img src={imageUrl} alt={name}
                 height={75}
                 width={75}/>

            <p>{name}</p>
            <p>£{price}</p>
            <p>x{duplicates}</p>
        </div>
    )
}

export default BasketItem;
