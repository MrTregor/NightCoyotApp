import {host} from "../config/database";
import ReactDOM from "react-dom";
import React from "react";
import loadingAnimation from "../resources/loading.png";

export function GetMealFromDB() {
    return new Promise((resolve, reject) => {
        fetch("http://" + host + "/actions-with-meals/get-meals.php", {
            method: 'POST'
        }).then(response => response.text())
            .then(response => {
                console.log("Get meals: ");
                console.log(JSON.parse(response));
                resolve(JSON.parse(response));
            })
            .catch(error => {
                ReactDOM.render(<React.StrictMode>
                    <div className={"blockScreen d-md-flex justify-content-md-center align-items-md-center"}><h1>Связь с
                        сервером, ожидайте. </h1><img src={loadingAnimation} alt={"Загрузка..."}/></div>
                </React.StrictMode>, document.getElementById('root'));
            })
    })
}

export function GetCategoriesFromDB() {
    return new Promise((resolve, reject) => {
        fetch("http://" + host + "/actions-with-meals/get-meals-categories.php", {
            method: 'POST',
        }).then(response => response.text())
            .then(response => {
                console.log("Get Category:");
                console.log(JSON.parse(response));
                resolve(JSON.parse(response));
            });
    });
}

export function GetBigCategoriesFromDB() {
    return new Promise((resolve, reject) => {
        fetch("http://" + host + "/actions-with-big-category/get-big-categories.php", {
            method: 'POST',
        }).then(response => response.text())
            .then(response => {
                console.log("Get Big Category:");
                console.log(JSON.parse(response));
                resolve(JSON.parse(response));
            });
    });
}

export function GetEventsFromDB() {
    return new Promise((resolve, reject) => {
        fetch("http://" + host + "/actions-with-events/get-events.php", {
            method: 'POST',
        }).then(response => response.text())
            .then(response => {
                console.log("Get events:");
                console.log(JSON.parse(response));
                resolve(JSON.parse(response));
            }).catch(error => {
            ReactDOM.render(<React.StrictMode>
                <div className={"blockScreen d-md-flex justify-content-md-center align-items-md-center"}>
                    <h1>{error} </h1></div>
            </React.StrictMode>, document.getElementById('root'));
        });
    });
}

export function GetOrderedMeal() {
    return new Promise((resolve, reject) => {
        fetch("http://" + host + "/actions-with-orders/get-cook-orders.php", {
            method: 'POST',
        }).then(response => response.text())
            .then(response => {
                console.log("Get Ordered Meal: ");
                console.log(JSON.parse(response));
                resolve(JSON.parse(response));
            });
    });
}