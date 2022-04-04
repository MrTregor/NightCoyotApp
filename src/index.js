import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import loadingAnimation from "./resources/loading.png";
import {
    GetBigCategoriesFromDB,
    GetCategoriesFromDB,
    GetEventsFromDB,
    GetMealFromDB,
    GetOrderedMeal
} from "./utility/get_db_data";
import Cookies from "universal-cookie";

console.log("1");

ReactDOM.render(<React.StrictMode>
    <div className={"blockScreen d-md-flex justify-content-md-center align-items-md-center"}><h1>Связь с
        сервером, ожидайте. </h1><img src={loadingAnimation} alt={"Загрузка..."}/></div>
</React.StrictMode>, document.getElementById('root'));

GetMealFromDB().then((menu) => {
    GetBigCategoriesFromDB().then((bigCategories) => {
        GetCategoriesFromDB().then((categories) => {
            GetEventsFromDB().then((events) => {
                const cookies = new Cookies();
                if (cookies.get("role") === "cooker") {
                    GetOrderedMeal().then((orders) => {
                        ReactDOM.render(<App mealsDB={menu} categoriesDB={categories} eventsDB={events}
                                             bigCategoriesDB={bigCategories} ordersDB={orders}/>,
                            document.getElementById('root'));
                    });
                } else {
                    ReactDOM.render(<App mealsDB={menu} categoriesDB={categories} bigCategoriesDB={bigCategories}
                                         eventsDB={events} orderFetches={null}/>, document.getElementById('root'));
                }
            });
        });
    })
});



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
