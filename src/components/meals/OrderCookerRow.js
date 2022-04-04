import React from "react";

const OrderCookerRow = (props) => {
    return (<div>
        <div className={"d-flex justify-content-between align-items-start mb_8 mt_8"}>
            <div className={"d-flex justify-content-center align-items-start"}>
                <div>
                    <img className="rounded mr_8 ml_8" src={props.curMeal.image} style={{objectFit: "cover"}}
                         alt={"Еда"} height={80 + "px"}/>
                </div>
                <div className={"mr_8"}>
                    <h6 className="text-break pr_8">{props.curMeal.name}</h6>  <h6 className="text-break pr_8">Заказ
                    №{props.value.order_num}</h6>
                    <div className="d-flex align-items-center justify-content-md-start align-items-md-center">

                    </div>
                </div>
            </div>

            <div style={{width: "auto"}}>
                <button className="btn" type="button" onClick={() => props.CompleteOrder(props.value.order_id)}
                        style={{background: "#ffb070"}}>
                    <div>Готов</div>
                </button>
            </div>
        </div>

    </div>);
}

export default OrderCookerRow;

