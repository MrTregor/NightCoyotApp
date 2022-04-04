import React from "react";

const DrawMealImg = (props) => {
    return (<div style={{height: 200 + 'px', overflow: "hidden"}}>
        <img
            className="card-img-top br_20" src={props.image} alt="Еда"

        />
    </div>);
}

export default DrawMealImg;