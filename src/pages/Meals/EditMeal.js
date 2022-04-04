import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'
import {FaPlus} from "react-icons/fa";
import {host} from '../../config/database'

export default function EditMeal(props) {
    let id = 0;
    console.log(props)
    let options = props.categories.map(value => {
        id++;
        if (value.name === props.selectedItem.category) {
            return <option selected key={id}>{value.name}</option>
        } else {
            return <option key={id}>{value.name}</option>
        }


    });

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [modalShow, setModalShow] = React.useState(false);
    const handleModalShow = () => setModalShow(true);
    const handleModalClose = () => setModalShow(false);

    function onEdit(name, category, price, grams, image, newCat) {
        console.log({name, category, price, grams, image, newCat});

        fetch("http://" + host + "/actions-with-meals/update-meal.php", {
            method: 'POST', body: JSON.stringify({
                name: name, category: category, price: price, grams:grams,  image: image, newCateg: newCat,
                oldName: props.selectedItem.name
            })
        }).then(response => response.text())
            .then(response => {
                console.log(response)
                if (response === "null") {
                    handleShow();
                } else {
                    handleModalShow();
                    props.editGlobalMeals({name: name, category: {id: "", name: category}, price: price, grams:grams, image: image})
                }
            });
    }

    function submitHandler(event) {
        event.preventDefault()
        let i = 0, newCat = false;
        let name = event.target[i].value === "" ? event.target[i].placeholder : event.target[i].value;

        if (event.target[3].id === "newCat") {
            i += 3;
        } else {
            i++;
        }
        let category = event.target[i].value === "" ? event.target[i].placeholder : event.target[i].value;
        if (event.target[3].id === "newCat") {
            i++;
            newCat = true;
        } else {
            i += 2;
        }
        let grams = event.target[i].value === "" ? event.target[i].placeholder : event.target[i].value;
        i++;
        let price = event.target[i].value === "" ? event.target[i].placeholder : event.target[i].value;
        i++;
        let image = event.target[i].value === "" ? event.target[i].placeholder : event.target[i].value;
        i++;
        onEdit(name, category, price, grams, image, newCat);
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


    return (<main className="firstElement">
        <section className="portfolio-block ">
            <div className="container">
                <div className="heading">
                    <h2>Изменить пункт меню</h2>
                </div>

                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Название</Form.Label>
                        <Form.Control type="text" placeholder={props.selectedItem.name}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Категория</Form.Label>
                        <AddCategoryField/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Граммы</Form.Label>
                        <Form.Control type="number" placeholder={props.selectedItem.grams}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Cтоимость</Form.Label>
                        <Form.Control type="number" placeholder={props.selectedItem.price}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>URL картинки</Form.Label>
                        <Form.Control type="text" placeholder={props.selectedItem.image}/>
                    </Form.Group>
                    <Button variant="none" className="btn btn-lg d-block w-100 gradient" type="submit">
                        {/*<NavLink to="/menu_add">*/}
                        Изменить
                        {/*</NavLink>*/}
                    </Button>
                </Form>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Сообщение системы</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Блюдо или напиток не существует! Возможно, вы неправильно перешли на эту
                        страницу</Modal.Body>
                    <Modal.Footer>
                        <Button variant="warring" className={"gradient"} onClick={() => handleClose()}>
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
                            Блюдо/Напиток успешно изменено/ён!
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warring" className={"gradient"} onClick={handleModalClose}>Хорошо</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </section>
    </main>)
}
