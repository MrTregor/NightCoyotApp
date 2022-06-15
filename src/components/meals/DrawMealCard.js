import React from "react";
import DrawMealImg from "./DrawMealImg";
import {CountCtrlBtn} from "./CountCtrlBtns";
import {Button} from "react-bootstrap";

const DrawMealCard = ({anchorId, menuItem, onPressed}) => {
    return (<>
        <div className="col-md-6 col-lg-4 front" id={anchorId}>
            <div className="card ">
                <Button variant={"dark"} className="dark-theme-btn btnPlusMinus br_20" id="MenuItem" onClick={() => {
                    if (!menuItem.checked) {
                        onPressed(menuItem.meal_id, "add");
                    }
                }} type="button">
                    <DrawMealImg image={menuItem.image}/>
                    <div className="card-body pt_8 pb_8">
                        <h6>{menuItem.name}</h6>{menuItem.price} р. | {menuItem.grams} г.
                    </div>
                </Button>
                {menuItem.checked ?
                    <CountCtrlBtn count={menuItem.count} onPressed={onPressed} meal_id={menuItem.meal_id}/> : <div/>}
            </div>
        </div>
        <div className={"back"}>
        </div>
    </>)
}

export default DrawMealCard;