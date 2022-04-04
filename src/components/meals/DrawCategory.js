import React from "react";

const DrawCategory = (props) => {
    return (<div className="row">
        <div className="col"><h1>{props.name}<span id={props.name}/></h1></div>
    </div>);
}

export default DrawCategory;