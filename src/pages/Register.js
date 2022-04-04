import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import InputMask from "react-input-mask";

import {host} from "../config/database";
import {domain} from "../config/domain";

export default function Register() {
    function submitHandler(event) {
        event.preventDefault();
        let sName = event.target[0].value;
        let fName = event.target[1].value;
        let email = event.target[2].value;
        let pass = event.target[3].value;
        let doublePass = event.target[4].value;
        let phone = event.target[5].value;
        let errorMessage = [];
        if (email === "" || pass === "" || phone === "") {
            errorMessage.push(<div>Данные не введены!<br/></div>)
        }
        if (pass !== doublePass) {
            errorMessage.push(<div>Пароли не совпадают!<br/></div>);
        }
        if (phone.split(" ").length !== 2) {
            errorMessage.push(<div>Номер телефона указан некорректно!<br/></div>);
        }
        fetch("http://" + host + "/actions-with-users/check-email-existence.php", {
            method: 'POST', body: JSON.stringify({email: email})
        }).then(response => response.text())
            .then(response => {
                if (JSON.parse(response).exist === true) {
                    errorMessage.push(<div>Пользователь с такой почтой уже зарегистрирован!<br/></div>);
                    setModalMessage(errorMessage);
                } else {
                    if (errorMessage.length !== 0) {
                        setModalMessage(errorMessage);
                    } else {
                        console.log({email: email, pass: pass, phone: phone})
                        fetch("http://" + host + "/actions-with-users/add-user.php", {
                            method: 'POST',
                            body: JSON.stringify({fname: fName, sname: sName, email: email, pass: pass, phone: phone})
                        }).then(response => response.text())
                            .then(response => {
                                console.log(response)
                                setModalMessage(() => "Вы успешно зарегистрировались!");
                                window.location = "/menu";
                            });
                    }
                }
            });


        handleModalShow();
    }

    const [modalMessage, setModalMessage] = React.useState("Регистрация НЕ выполнена, попробуйте позже.")
    const [modalShow, setModalShow] = React.useState(false);
    const handleModalShow = () => setModalShow(true);
    const handleModalClose = () => setModalShow(false);



    return (<div>
        <main className="firstElement"/>
        <section className="portfolio-block contact"
                 style={{"background-image": "url(" + domain + "/backgrounds/register_background.png)"}}>
            <div className="container">
                <div className="heading" style={{"color": "white"}}>
                    <h2>Регистрация</h2>
                </div>
                <Form onSubmit={submitHandler} >
                    <Form.Group className="mb-3" controlId="formBasicSecondName">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control type="text" placeholder="Введите фамилию"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control type="text" placeholder="Введите имя"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Электронная почта</Form.Label>
                        <Form.Control type="email" placeholder="Введите email"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Введите пароль"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDoublePassword">
                        <Form.Label>Повтрите пароль</Form.Label>
                        <Form.Control type="password" placeholder="Введите пароль повторно"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label>Телефон</Form.Label>
                        <InputMask className={"form-control item"} mask="+7\(999) 999-9999"
                                   placeholder="Введите телефон" maskChar=" "/>
                    </Form.Group>
                    <Button variant="dark" className={"w-100 gradient"} type="submit">
                        Зарегистрироваться
                    </Button>
                </Form>
                <Modal
                    show={modalShow} onHide={() => setModalShow(false)} size="lg"
                    aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Сообщение системы.
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{modalMessage}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" className={"gradient"} onClick={handleModalClose}>Хорошо</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </section>
    </div>)
}