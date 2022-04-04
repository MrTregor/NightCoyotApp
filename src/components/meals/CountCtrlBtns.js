import React, {Component} from "react";
import Button from 'react-bootstrap/Button'
import {FaMinus, FaPlus} from "react-icons/fa";
import basketItem from "./BasketItem";

export const CountCtrlBtn = ({onPressed, count, meal_id}) => {
    return (
        <div className="d-flex justify-content-center pb_8  br_20 ">
            <Button variant="dark" className={"count-btn"}
                    onClick={() => {
                        onPressed(meal_id, "minus")
                    }}>
                <FaMinus/>
            </Button>
            <h1 className="d-flex align-items-center mr_20 ml_20"
                style={{marginBottom: 0 + "px"}}>{count}</h1>
            <Button variant="dark" className={"count-btn"}
                    onClick={() => {
                        onPressed(meal_id, "plus")
                    }}>
                <FaPlus/>
            </Button>
        </div>
    );
}
