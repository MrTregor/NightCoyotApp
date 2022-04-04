import React, {useState} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {NavLink} from "react-router-dom";

import {FaSearch} from "react-icons/fa";
import "../../resources/css/MenuEditor.css";
import EventEditorRow from "../../components/events/EventEditorRow";

export default function EventsEditor(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);

    const [itemNameToDelete, setItemNameToDelete] = React.useState("");

    function AddItemToDelete(name) {
        setItemNameToDelete(name);
        handleShow();
    }

    function DeleteItem() {
        handleClose();
        console.log(itemNameToDelete);
        props.deleteItem(itemNameToDelete);
    }


    let id = 1;
    const [rows/*, setRows*/] = React.useState(props.events.map(value => {
        id++;
        return (<EventEditorRow id={id} value={value} AddItemToDelete={AddItemToDelete}
                                changeSelectedItem={props.changeSelectedItem}/>);
    }))


    // TODO: Сделать поиск по названию новости
    function FindMealItem() {//ищет текст на странице, в параметр передается ID поля для ввода
        // Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу
        /*setRows(props.menu.map((value) => {
            // console.log(value);
            if (value.name.indexOf(searchText) !== -1) {
                id++;
                return (rowConstructor(value));
            }
            else return null;
        }))*/
    }

    const [/*searchText,*/ setSearchText] = useState("");

    return (<div>
        <main className="firstElement"/>
        <div className="d-flex justify-content-center">
            <Button variant="none" className="btn gradient mb-3 mt-3 mr_6" type="button">
                <NavLink to="/add_event">
                    <div className="nav-link-white">Добавить новое мероприятие</div>
                </NavLink>
            </Button>
        </div>
        <div className="mr_8 ml_8 mb_8">
            <Form>
                <Form.Group className="mb-3 d-md-flex align-items-md-center" controlId="formBasicInput">
                    <Form.Label className={"mr_8"}>Назание </Form.Label>
                    <Form.Control type="text" placeholder="Название мероприятия"
                                  onChange={(event) => setSearchText(event.target.value)}/>
                    <Button className="gradient" variant={"none"} type="button"
                            onClick={() => FindMealItem()}><FaSearch/>
                    </Button>

                </Form.Group>
            </Form>
        </div>
        <div className="table-responsive">
            <Table responsive={"sm"} striped bordered hover>
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Дата</th>
                    <th style={{width: 50 + "px"}}>URL картинки</th>
                    <th style={{width: 126 + "px"}}/>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </Table>
        </div>
        <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg"
               aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Уведомление системы
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Вы уверены, что хотите удалить это блюдо/напиток из меню?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>Нет</Button>
                <Button variant="none" className={"gradient"} onClick={() => DeleteItem()}>Да</Button>
            </Modal.Footer>
        </Modal>
    </div>)
}