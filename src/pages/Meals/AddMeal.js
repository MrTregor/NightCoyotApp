import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'
import {FaPlus} from "react-icons/fa";
import {host} from '../../config/database'

export default function AddMeal(props) {

    let id = 0;
    console.log(props)
    let options = props.categories.map(value => {
        id++;
        return <option key={id}>{value.name}</option>

    })

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [modalShow, setModalShow] = React.useState(false);
    const handleModalShow = () => setModalShow(true);
    const handleModalClose = () => setModalShow(false);

    function onCreate(name, category, price, grams, image, newCat) {
        console.log({name, category, price, image, grams, newCat});


        fetch("http://" + host + "/actions-with-meals/add-meal.php", {
            method: 'POST', body: JSON.stringify(
                {name: name, category: category, price: price, grams: grams, image: image, newCateg: newCat})
        }).then(response => response.text())
            .then(response => {
                console.log(JSON.parse(response))
                if (JSON.parse(response).exist === true) {
                    handleShow();
                } else {
                    handleModalShow();
                    props.menu.push(
                        {id: "", name: name, category: {id: "", category: category}, price: price, image: image})
                    console.log(props.menu);
                }
            });
    }

    function submitHandler(event) {

        event.preventDefault()
        let i = 0, newCat = false;
        let name = event.target[i].value;

        if (event.target[3].id === "newCat") {
            i += 3;
        } else {
            i++;
        }
        let category = event.target[i].value;
        if (event.target[3].id === "newCat") {
            i++;
            newCat = true;
        } else {
            i += 2;
        }

        let price = event.target[i].value;
        i++;
        let grams = event.target[i].value;
        i++;
        let image = event.target[i].value;
        i++;
        onCreate(name, category, price, grams, image, newCat);
    }

    function AddCategoryField() {
        const [categoryField, setCategory] = useState(<div></div>);
        const [isLoading, setLoading] = useState(false);
        useEffect(() => {
            if (isLoading) {
                setLoading(true);
                setCategory(<Form.Control type="text" id={"newCat"} placeholder="Введите название новой категории"/>);
            }
        }, [isLoading]);

        const handleClick = () => setLoading(true);
        return (<div className="w-100">
            <div className="d-lg-flex align-items-lg-center w-100">
                <Form.Select>
                    {options}
                </Form.Select>
                <Button
                    disabled={isLoading}
                    onClick={!isLoading ? handleClick : null}
                    variant="none"
                    className="gradient ml_8"
                    type="button"
                > <FaPlus/></Button>
            </div>
            {categoryField}
        </div>);
    }


    return (<main className="firstElement page contact-page">
        <section className="portfolio-block ">
            <div className="container">
                <div className="heading">
                    <h2>Добавить новый пункт меню</h2>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Сообщение системы</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Блюдо или напиток с таким именем уже существует!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="none" className={"gradient"} onClick={() => handleClose()}>
                            Ясно
                        </Button>
                    </Modal.Footer>
                </Modal>
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
                            Блюдо/Напиток успешно добавлено!
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="none" className={"gradient"} onClick={handleModalClose}>Хорошо</Button>
                    </Modal.Footer>
                </Modal>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Название</Form.Label>
                        <Form.Control type="text" placeholder="Введите название блюда или напитка"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Категория</Form.Label>
                        <AddCategoryField/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Cтоимость</Form.Label>
                        <Form.Control type="number" placeholder="Введите стоимость блюда или напитка"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Граммы</Form.Label>
                        <Form.Control type="number" placeholder="Введите граммы"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>URL картинки</Form.Label>
                        <Form.Control type="text" placeholder="Введите адрес картинки блюда или напитка"/>
                    </Form.Group>
                    <Button variant="none" className="btn btn-lg d-block w-100 gradient" type="submit">
                        {/*<NavLink to="/menu_add">*/}
                        <div className="nav-link-white">Добавить</div>
                        {/*</NavLink>*/}
                    </Button>
                </Form>
            </div>
        </section>
    </main>)
}
