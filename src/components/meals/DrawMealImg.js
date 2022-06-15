import React from "react";

const DrawMealImg = (props) => {
    return (<div >
        <img
            className="card-img-top br_20" style={{maxHeight:"200px", width:"inherit"}} src={props.image} alt="Еда"

        />
    </div>);
}

export default DrawMealImg;