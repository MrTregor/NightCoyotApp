import React from "react";

export const EventItem = ({title, date, image}) => {
    return (
        <div className="d-md-flex" style={{"margin": 20 + "px"}}>
            <img height={200} className={"event-image"} src={image} alt={"КАРТИНКА К МЕРОПРИЯТИЮ"}/>
            <div style={{"margin": 20 + "px"}}>
                <h1 className={"text-xsxm-center"}>{title}</h1>
                <h6>{date}</h6>
            </div>
        </div>
    )
}