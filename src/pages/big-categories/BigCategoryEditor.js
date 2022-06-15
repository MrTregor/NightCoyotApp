import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import '../../resources/css/BigCategoryEditor.css'
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Masonry from "react-masonry-css";
import {Form, Spinner} from "react-bootstrap";
import {MdDeleteForever} from "react-icons/md";
import {addBigCategory, renameBigCategory, setCategoriesBigCategory} from "../../utility/api_pathes";


export default function BigCategoryEditor({deleteItem, bigCategoryColumns, addNewBigCategory}) {
    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => setModalShow(false);
    // const handleShow = () => setModalShow(true);

    const [columns, setColumns] = useState(bigCategoryColumns);
    const [isLoading, setIsLoading] = useState(false);
    const breakpointColumnsObj = {
        default: 5,
        1100: 3,
        700: 2,
        500: 1
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const {source, destination} = result;

        if (source.droppableId !== destination.droppableId) { // Перемещение в другой список
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            let newBigCategory = destination.droppableId;
            const sourceItems = [...sourceColumn.items];
            console.log(sourceItems)
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            let selectedCategory = removed.category;
            fetch(setCategoriesBigCategory, {
                method: 'POST', body: JSON.stringify({categoryId: selectedCategory, newBigCategoryId: newBigCategory})
            }).then(response => response.text())
                .then(response => {
                    console.log(JSON.parse(response));
                });
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
        } else { // Перемещение внутри списка
            const column = columns[source.droppableId];
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


    const bigCategoryNameEditedHandler = (event) => {
        fetch(renameBigCategory, {
            method: 'POST', body: JSON.stringify({newName: event.target.value, bigCategoryId: event.target.id})
        }).then(resp => resp.text())
            .then(resp => {
                console.log(resp)

            })
    }
    const DeleteBigCategory = (columnId) => {
        setIsLoading(true)
        delete columns[columnId]
        deleteItem(columnId);
        setColumns(columns);

        setInterval(() => {
            setIsLoading(false);
        }, 1)

    }
    const AddNewBigCategory = () => {
        setIsLoading(true)
        fetch(addBigCategory, {
            method: 'POST', body: JSON.stringify({newName: "НОВЫЙ РАЗДЕЛ"})
        }).then(resp => resp.text())
            .then(resp => {
                columns[JSON.parse(resp)[0].big_category_id] = {
                    name: "НОВЫЙ_РАЗДЕЛ_" + JSON.parse(resp)[0].big_category_id,
                    items: []
                }
                addNewBigCategory({big_category_id: JSON.parse(resp)[0].big_category_id, name: "НОВЫЙ РАЗДЕЛ"})
                setInterval(() => {
                    setIsLoading(false)
                }, 1000)
            })

    }

    return (<div>
            <main className="firstElement"/>
            <div className="d-flex justify-content-center">
                <Button variant="none" className="btn gradient mb-3 mt-3 mr_6" type="button"
                        onClick={() => {
                            AddNewBigCategory();
                        }}>
                    {isLoading ? <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner> : <div className="nav-link-white">Добавить новый раздел</div>}
                </Button>
            </div>


            <DragDropContext onDragEnd={result => onDragEnd(result)}>
                <Masonry breakpointCols={breakpointColumnsObj}
                         className="my-masonry-grid row"
                         columnClassName="my-masonry-grid_column">
                    {!isLoading ? Object.entries(columns).map(([columnId, column]) => {
                        return <div key={columnId}>
                            {/*<Form style={{background: "none", padding: "0px"}} >*/}
                            <Form.Group className="mb-3 d-flex">
                                <Form.Control style={{width: "250px", textAlign: "center"}} id={columnId}
                                              onChange={bigCategoryNameEditedHandler}
                                              placeholder="Название раздела" defaultValue={column.name}/>
                                <Button variant={"danger"} onClick={() => {
                                    DeleteBigCategory(columnId)
                                }}>
                                    <MdDeleteForever/></Button>
                            </Form.Group>
                            {/*</Form>*/}
                            <Droppable droppableId={columnId} key={Object.keys(column)}>
                                {(provided, snapshot) => {
                                    return (<div ref={provided.innerRef}
                                                 {...provided.droppableProps}
                                                 style={{
                                                     padding: 4,
                                                     width: 250,
                                                     minHeight: 100,
                                                     background: snapshot.isDraggingOver ? '#121211' : '#1d1d1b'
                                                 }}
                                    >
                                        {column.items.map((item, index) => {
                                            if (item !== undefined) {
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
                                                            {item.name}
                                                        </div>)
                                                    }}
                                                </Draggable>
                                            }
                                        })}
                                        {provided.placeholder}
                                    </div>)
                                }}
                            </Droppable>
                        </div>

                    }) : <div/>}
                < /Masonry>
            </DragDropContext>


            <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg"
                   aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Уведомление системы
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Вы уверены, что хотите удалить этот раздел меню?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>Нет</Button>
                    <Button variant="warning" className={"gradient"}>Да</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}