import React from "react";
import {FaMinus, FaPlus} from "react-icons/fa";
import {CountCtrlBtn} from "./CountCtrlBtns";

const BasketItem = ({menuItem, index, onPressed}) => {
    return (<div>
        <div className={"d-flex justify-content-between align-items-start mb_8 mt_8"}>
            <div className={"d-flex justify-content-center align-items-start"}>
                <div>
                    <img className="rounded mr_8 ml_8" src={menuItem.image} style={{objectFit: "cover"}}
                         alt={"Еда"} height={80 + "px"}/>
                </div>
                <div className={"mr_8"}>
                    <h6 className="text-break pr_8">{menuItem.name}</h6>
                </div>
            </div>

            <div style={{width: "auto"}}>
                <h6 className="text-nowrap mr_8"
                    style={{fontWeight: "bold"}}>{menuItem.count * menuItem.price + " ₽"}</h6>
            </div>
        </div>
        <div className="d-flex align-items-center justify-content-center justify-content-md-center align-items-md-center">
            <CountCtrlBtn count={menuItem.count} onPressed={onPressed} meal_id={menuItem.meal_id}/> : <div/>
        </div>
        <div key={2 + index} style={{height: 2 + "px", background: "var(--bs-light)"}}/>
    </div>);
}

export default BasketItem;