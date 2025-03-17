import {Fragment, useState} from "react";
import {Outlet, Link} from "react-router-dom";
import './Navigation.styles.scss'
import {useContext} from "react";
import {AuthIntelContext} from "../../Contexts/UserProvider.component";
import {BasketContext} from "../../Contexts/BasketProvider.component";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import Basket from "../Basket-DropDown/Basket.components";


const Navigation = () => {
    const {authData} = useContext(AuthIntelContext);
    const {basketLength} = useContext(BasketContext);
    const [activeVisibility, setBasketVisibility] = useState(false)


    return (
        <Fragment>
            <nav className='navigation-bar'>

                <Link className='nav-links-logos'
                      to='/'>
                    <img
                        src='data:image/png;base64,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'
                        alt='logo'
                        width={50}
                        height={50}/>
                </Link>

                <Link className='nav-links-container'
                      to='/shop'>
                    SHOP
                </Link>
                {
                    authData ? (
                            <span className='nav-links-container'
                                  onClick={signOutUser}>
                            SIGN-OUT
                        </span>
                        ) :
                        (<Link className='nav-links-container'
                               to='/sign-in'>
                                SIGN-IN
                            </Link>
                        )

                }
                <div className={'basket-icon-container'}>
                    <img
                        src="data:image/png;base64,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"
                        alt="Shopping Basket Icon"
                        className={'nav-links-logos'}
                        width={50} height={50}
                        onClick={() => setBasketVisibility(!activeVisibility)}/>
                    <p><strong>
                        {
                            (basketLength >= 1) ? basketLength : ""
                        }
                    </strong></p>
                </div>


            </nav>
            {
                activeVisibility && (
                    <div className={'basket-container'}>
                        <div className={'Basket-Div'}>
                            <Basket/>
                        </div>
                    </div>

                )
            }


            <Outlet/>
        </Fragment>
    )
}

export default Navigation;