import './category.styles.scss'
import {Link} from "react-router-dom";

const CategoryComponent = ({item}) => {

    return (
        <div className={'category-container'}>
            <div
                className={'imageBackground'}
                style={{backgroundImage: `url(${item.image})`}}>
                <div className={'category-body-container'}>
                    <h2>{item.title}</h2>
                    <Link to={item.title.toLowerCase()}>Shop Now</Link>
                </div>

            </div>


        </div>
    )
}

export default CategoryComponent