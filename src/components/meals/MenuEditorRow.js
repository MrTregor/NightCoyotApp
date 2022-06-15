import React from "react";
import {MdDeleteForever, MdOutlineModeEditOutline} from "react-icons/md";
import {NavLink} from "react-router-dom";
import Button from "react-bootstrap/Button";

const MenuEditorRow = (props) => {
    // console.log(props);
    return (<tr key={props.id}>
        <td>{props.value.name}<span id={props.value.category.name}/></td>
        <td>{props.value.category.name}</td>
        <td>{props.value.price}</td>
        <td>
            <div
                style={{
                    overflow: "hidden", overflowX: "hidden", height: "30px", width: "100px"
                }}>{props.value.image}</div>
        </td>
        <td>
            <button className="btn btn-danger mr_6 mb-2" type="button"
                    onClick={() => props.AddItemToDelete(props.value.name)}>
                <MdDeleteForever/></button>
            <NavLink to="/menu_edit">
                <Button variant={"warning"} type="button" onClick={() => props.changeSelectedItem({
                    id: props.id, name: props.value.name, category: props.value.category.name, grams: props.value.grams,
                    price: props.value.price, image: props.value.image
                })}>
                    <MdOutlineModeEditOutline style={{color: "#1c1c1c"}}/>
                </Button>
            </NavLink>
        </td>
    </tr>);
}

export default MenuEditorRow;