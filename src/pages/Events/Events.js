import React from "react";
import {EventItem} from "../../components/events/EventItem";

export default function Events(props) {
    let eventItems;
    eventItems = props.events.map((event, index) => <EventItem key={"ed"+index} date={event.date} image={event.image}
                                                               title={event.title}/>)
    return (<main className="firstElement">
        {eventItems}
    </main>);
}