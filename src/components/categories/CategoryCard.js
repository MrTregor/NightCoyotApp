import {Draggable} from "react-beautiful-dnd";
import React from "react";

const CategoryCard = ({key, category}) => {
    return <Draggable key={key} draggableId={category.id} index={category.index}>
        {(provided, snapshot) => {
            return (<div ref={provided.innerRef}
                         {...provided.droppableProps}
                         className={" card special-skill-item border-0 br_20 p_8 m_12"}>{category.name} style={{
                background: "#6c757d", textAlign: "center"
            }} >
            </div>)
        }}
    </Draggable>
}
export default CategoryCard;