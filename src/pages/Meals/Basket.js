import React from "react";
import "../../resources/css/Menu.css"
import {FaRubleSign} from "react-icons/fa";
import Button from "react-bootstrap/Button";

const Basket = (props) => {
    return (<div className={"firstElement"}>
        {props.basketRows}
        <div className={"firstElement"}/>
        <div className={"pr_l_14 d-flex justify-content-md-center"}>
            <Button variant={"success"} className="d-flex basketBtn mr_8 ml_8" onClick={() => {
                props.takeOrder()
            }} type="button"><label
                className="form-label d-flex flex-fill justify-content-start whiteText"><strong>Заказать</strong></label>
                <label
                    className="form-label d-flex justify-content-center align-items-center mx-auto whiteText textBold">
                    <strong>{props.sumMoney}&nbsp;</strong>
                    <FaRubleSign/>
                </label></Button>
        </div>
    </div>);
}
export default Basket