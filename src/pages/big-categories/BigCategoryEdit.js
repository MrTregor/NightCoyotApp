import React, {useState} from "react";
import {host} from "../../config/database";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {Draggable, Droppable, DragDropContext} from "react-beautiful-dnd";
import CategoryCard from "../../components/categories/CategoryCard";
import uuid from "uuid";


const BigCategoryEdit = ({bigCategories, categories, selectedItem}) => {
    const [modalShow, setModalShow] = React.useState(false);
    const handleModalShow = () => setModalShow(true);
    const handleModalClose = () => setModalShow(false);
    console.log(categories)
    // function onEdit(name, date, image) {
    //     console.log({name, date, image});
    //
    //     fetch("http://" + host + "/actions-with-events/update-event.php", {
    //         method: 'POST', body: JSON.stringify({
    //             id: selectedItem.id, name: name, date: date, image: image,
    //         })
    //     }).then(response => response.text())
    //         .then(response => {
    //             handleModalShow();
    //             console.log(editGlobalEvents({id: selectedItem.id, name: name, date: date, image: image}))
    //         });
    // }
    //
    function submitHandler(event) {
        // event.preventDefault()
        // let i = 0;
        // let name = event.target[i].value === '' ? selectedItem.title : event.target[i].value;
        // i++;
        // let date = event.target[i].value === '' ? selectedItem.date : event.target[i].value;
        // i++;
        // let image = event.target[i].value === '' ? selectedItem.image : event.target[i].value;
        // i++;
        // onEdit(name, date, image);
    }

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const {source, destination} = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            const column = columns[source.droppableId];
            console.log(source.droppableId)
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };

    const itemsFromBackend = categories.map((category, index) => {
        return {id: uuid(), content: category.name}
    });

    const columnsFromBackend = {
        [uuid()]: {
            name: "Выбранные категории",
            items: itemsFromBackend
        },
        [uuid()]: {
            name: "Все категории",
            items: []
        }
    };


    const [columns, setColumns] = useState(columnsFromBackend);

    return (<main className="firstElement">
        <section className="portfolio-block ">
            <div className="container">
                <div className="heading">
                    <h2>Изменить выбранное мероприятие</h2>
                </div>

                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Название большой категории</Form.Label>
                        <Form.Control type="text" placeholder={selectedItem.name}/>
                    </Form.Group>
                    <div className="row" style={{width: "inherit"}}>
                        <DragDropContext onDragEnd={result => onDragEnd(result)}>
                            {Object.entries(columns).map(([columnId, column], index) => {
                                return <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        width: "inherit"
                                    }}
                                    key={columnId}
                                >
                                    <h2>{column.name}</h2>
                                    <Droppable droppableId={columnId} key={columnId}>
                                        {(provided, snapshot) => {
                                            return (<div ref={provided.innerRef}
                                                         {...provided.droppableProps}
                                                         style={{
                                                             padding: 4,
                                                             width: 250,
                                                             minHeight: 500,
                                                             background: snapshot.isDraggingOver ? '#121211' : '#1d1d1b'
                                                         }}
                                            >
                                                {column.items.map((item, index) => {
                                                    return <Draggable key={item.id} draggableId={item.id}
                                                                      index={index}>
                                                        {(provided, snapshot) => {
                                                            return (<div ref={provided.innerRef}
                                                                         {...provided.draggableProps}
                                                                         {...provided.dragHandleProps}
                                                                         className={"card special-skill-item border-0 br_20 p_8 m_12"}
                                                                         style={{
                                                                             background: "#882de5",
                                                                             color: "#ffffff",
                                                                             backgroundColor: snapshot.isDragging ? '#263B4A' : "#882de5",
                                                                             textAlign: "center", ...provided.draggableProps.style,
                                                                         }}>
                                                                {item.content}
                                                            </div>)
                                                        }}
                                                    </Draggable>
                                                })}
                                                {provided.placeholder}
                                            </div>)
                                        }}
                                    </Droppable>
                                </div>

                            })}
                        </DragDropContext>
                    </div>

                    <Button variant="none" className="btn btn-lg d-block w-100 gradient"
                            type="submit">
                        {/*<NavLink to="/menu_add">*/}
                        Изменить
                        {/*</NavLink>*/}
                    </Button>
                </Form>

                <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Сообщение системы!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Мероприятие успешно изменено!
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warring" className={"gradient"}
                                onClick={handleModalClose}>Хорошо</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </section>
    </main>)
        ;
}
export default BigCategoryEdit;