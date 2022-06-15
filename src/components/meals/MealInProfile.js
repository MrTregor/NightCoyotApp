import React from 'react'

export const MealInProfile = ({meal, count}) => {
  return (<button id="MenuItem" type="button"
                  className="dark-theme-btn btnPlusMinus br_20 btn btn-dark d-flex flex-row">
    <img className=" br_20" src={meal.image} alt="Еда"
         style={{ height: '4rem', width: 'auto' }}/>
    <div className={'d-flex flex-column'}>
      <div style={{ fontSize: '12px' }}> {meal.name} {meal.price} р. | {meal.grams} г.
      </div>
      <div> x {count}</div>
    </div>
  </button>)
}

