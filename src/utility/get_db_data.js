import ReactDOM from 'react-dom'
import React from 'react'
import { getBigCategories, getCookOrders, getEvents, getMeals, getMealsCategories } from './api_pathes'

export function GetMealFromDB() {
  return new Promise((resolve) => {
    fetch(getMeals, {
      method: 'POST',
    }).then(response => response.text()).then(response => {
      console.log('Get meals: ')
      console.log(JSON.parse(response))
      resolve(JSON.parse(response))
    }).catch(() => {
      window.location = "/main"
    })
  })
}

export function GetCategoriesFromDB() {
  return new Promise((resolve) => {
    fetch(getMealsCategories, {
      method: 'POST',
    }).then(response => response.text()).then(response => {
      console.log('Get Category:')
      console.log(JSON.parse(response))
      resolve(JSON.parse(response))
    })
  })
}

export function GetBigCategoriesFromDB() {
  return new Promise((resolve) => {
    fetch(getBigCategories, {
      method: 'POST',
    }).then(response => response.text()).then(response => {
      console.log('Get Big Category:')
      console.log(JSON.parse(response))
      resolve(JSON.parse(response))
    })
  })
}

export function GetEventsFromDB() {
  return new Promise((resolve) => {
    fetch(getEvents, {
      method: 'POST',
    }).then(response => response.text()).then(response => {
      console.log('Get events:')
      console.log(JSON.parse(response))
      resolve(JSON.parse(response))
    }).catch(error => {
      ReactDOM.render(<React.StrictMode>
        <div className={'blockScreen d-md-flex justify-content-md-center align-items-md-center'}>
          <h1>{error} </h1></div>
      </React.StrictMode>, document.getElementById('root'))
    })
  })
}

export function GetOrderedMeal() {
  return new Promise((resolve) => {
    fetch(getCookOrders, {
      method: 'POST',
    }).then(response => response.text()).then(response => {
      console.log('Get Ordered Meal: ')
      console.log(JSON.parse(response))
      resolve(JSON.parse(response))
    })
  })
}