import React from "react";
import {MdDeleteForever, MdOutlineModeEditOutline} from "react-icons/md";
import {NavLink} from "react-router-dom";
import Button from "react-bootstrap/Button";

const EventEditorRow = (props) => {
    return (<tr key={props.id}>
        <td>{props.value.title}<span id={props.value.title + props.id}/></td>
        <td style={{width: "111px"}}>{props.value.date}</td>
        <td>
            <div
                style={{
                    overflow: "hidden", overflowX: "hidden", height: "30px", width: "50px"
                }}>{props.value.image}</div>
        </td>
        <td>
            <button className="btn btn-danger mr_6 mb-2" type="button"
                    onClick={() => props.AddItemToDelete(props.value.id)}>
                <MdDeleteForever/></button>
            <NavLink to="/event_edit">
                <Button variant={"warning"} type="button" onClick={() => {
                    console.log(props.value);
                    props.changeSelectedItem({id: props.value.id, title: props.value.title, date: props.value.date, image: props.value.image})
                }}>
                    <MdOutlineModeEditOutline style={{color: "#1c1c1c"}}/>
                </Button>
            </NavLink>
        </td>
    </tr>);
}

export default EventEditorRow;