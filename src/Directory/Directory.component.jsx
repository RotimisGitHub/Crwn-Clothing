
import './directory.styles.scss';
import CategoryComponent from "../Components/Category.component";

const Directory = ({categories}) => {
    return (
        <div className={'directory-container'}>


            {
                categories.map((item, index) => <CategoryComponent key={index} item={item}/>)
            }


        </div>
    )
}

export default Directory;