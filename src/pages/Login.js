import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'
import {host} from "../config/database";
import {domain} from "../config/domain";
import Cookies from "universal-cookie";


export default function Login() {
    function submitHandler(event) {
        event.preventDefault();
        let email = event.target[0].value;
        let pass = event.target[1].value;

        fetch("http://" + host + "/actions-with-users/check-email-existence.php", {
            method: 'POST', body: JSON.stringify({email: email, pass: pass})
        }).then(response => response.text())
            .then(response => {
                console.log(response)
                let responseData = JSON.parse(response)
                if (responseData.result === 'success' && responseData.exist === true) {
                    setModalMessage(() => "Вы успешно вошли!");
                    const cookies = new Cookies();
                    cookies.set('role', responseData.role);
                    cookies.set('userId', responseData.userId);
                    window.location = "/main";
                } else {
                    setModalMessage(() => "Вы НЕ вошли!");
                }
            });

        handleModalShow();
    }

    const [modalMessage, setModalMessage] = React.useState("Вход НЕ выполнен!")
    const [modalShow, setModalShow] = React.useState(false);
    const handleModalShow = () => setModalShow(true);
    const handleModalClose = () => setModalShow(false);


    return (<main className="firstElement">
            <section className="portfolio-block contact pageStretcher"
                     style={{backgroundImage: "url(" + domain + "/backgrounds/login_background.png)"}}>
                <div className="container">
                    <div className="heading" style={{"color": "white"}}>
                        <h2>Войти</h2>
                    </div>
                    <Form onSubmit={submitHandler} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Электронная почта</Form.Label>
                            <Form.Control type="email" placeholder="Введите email"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Введите пароль"/>
                        </Form.Group>
                        <Button variant="dark" className={"w-100 gradient"} type="submit">
                            Войти
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
                            <p>
                                {modalMessage}
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" className={"gradient"} onClick={handleModalClose}>Хорошо</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </section>
        </main>)
}