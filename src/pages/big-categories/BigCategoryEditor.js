import React from "react";
import Button from "react-bootstrap/Button";
import {NavLink} from "react-router-dom";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import BigCategoryEditorRow from "../../components/categories/BigCategoryEditorRow";

export default function BigCategoryEditor(props) {
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
    const [rows/*, setRows*/] = React.useState(props.bigCategories.map(value => {
        id++;
        let categoriesOfBig = [];
        props.categories.forEach((categ) => {
            if (categ.big_category_id === value.big_category_id) {
                categoriesOfBig.push(categ);
            }
        })
        return (<BigCategoryEditorRow key={value.big_category_id + "bc"} id={value.big_category_id} name={value.name} categories={categoriesOfBig}
                                      AddItemToDelete={AddItemToDelete}
                                      changeSelectedItem={props.changeSelectedItem}/>);
    }))


    return (<div>
        <main className="firstElement"/>
        <div className="d-flex justify-content-center">
            <Button variant="none" className="btn gradient mb-3 mt-3 mr_6" type="button">
                <NavLink to="/big_category_add">
                    <div className="nav-link-white">Добавить новую большую категорию</div>
                </NavLink>
            </Button>
        </div>
        <div className="table-responsive">
            <Table responsive={"sm"} striped bordered hover>
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Категории</th>
                    <th style={{width: 126 + "px"}}></th>
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
                    Вы уверены, что хотите удалить эту большую категорию из меню?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>Нет</Button>
                <Button variant="warning" className={"gradient"}>Да</Button>
            </Modal.Footer>
        </Modal>
    </div>)
}