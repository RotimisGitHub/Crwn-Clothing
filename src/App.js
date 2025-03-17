import {Routes, Route} from "react-router-dom";
import {categories} from "./JsonDatabases/Shopping-Categories";
import Home from "./Routes/home/home.component";
import Navigation from "./Routes/Navigation/Navigation.component";
import SignIn from "./Routes/Auth/Components/Main_authentication/AuthenticationPagecomponent";
import Shop from "./Routes/Shop/shop.components";
import Checkout from './Routes/Checkout/Checkout.component'
import {Fragment} from "react";
import CategoryComponent from "./Components/Category.component";
import CategoryCollection from "./Routes/Categories/CategoryCollection.component";



const App = () => {

    return (
        <Fragment>
        <Routes>
            <Route path='/' element={<Navigation/>}>
                <Route index element={<Home categories={categories}/>}/>
                <Route path='sign-in' element={<SignIn />}/>
                <Route path='shop' element={<Shop />}/>
                <Route path='checkout' element={<Checkout />}/>
                {
                    categories.map(({title}, index) =>
                        <Route key={index} path={title.toLowerCase()} element={<CategoryCollection key={index} title={title.toLowerCase()}/>}/>

                    )
                }

            </Route>
        </Routes>

        </Fragment>

    )


}

export default App;
