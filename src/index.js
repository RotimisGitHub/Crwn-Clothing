import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import UserProvider from "./Contexts/UserProvider.component";
import ShopProvider from "./Contexts/ShopProvider.component";
import BasketProvider from "./Contexts/BasketProvider.component";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <ShopProvider>
                    <BasketProvider>
                        <App/>
                    </BasketProvider>

                </ShopProvider>

            </UserProvider>

        </BrowserRouter>

    </React.StrictMode>
);

