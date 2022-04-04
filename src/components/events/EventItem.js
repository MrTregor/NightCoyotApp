import React from "react";

export const EventItem = ({title, date, image}) => {
    return (
        <div className="d-md-flex align-items-md-center" style={{"margin": 20 + "px"}}>
            <img height={200} src={image} alt={"КАРТИНКА К МЕРОПРИЯТИЮ"}/>
            <div style={{"margin": 20 + "px"}}>
                <h1>{title}
                    <h6>{date}</h6>
                </h1>
            </div>
        </div>
    )
}