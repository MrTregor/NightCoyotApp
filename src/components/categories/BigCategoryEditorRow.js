import React from "react";
import {MdDeleteForever, MdOutlineModeEditOutline} from "react-icons/md";
import {NavLink} from "react-router-dom";
import Button from "react-bootstrap/Button";

const BigCategoryEditorRow = (props) => {
    return (<tr key={props.id + "bc"}>
        <td>{props.name}<span id={props.name + props.id}/></td>
        <td>{props.categories.map((categ, index) => {
            return <div key={index+"cn"}>{categ.name}<br/></div>;
        })}</td>
        <td>
            <Button className="btn btn-danger mr_6 mb-2" type="button"
                    onClick={() => props.AddItemToDelete(props.id)}>
                <MdDeleteForever/></Button>
            <NavLink to="/big_category_edit">
                <Button variant={"warning"} type="button" onClick={() => {
                    props.changeSelectedItem({
                        id: props.id, name: props.name
                    })
                }}>
                    <MdOutlineModeEditOutline style={{color: "#1c1c1c"}}/>
                </Button>
            </NavLink>
        </td>
    </tr>);
}
export default BigCategoryEditorRow;