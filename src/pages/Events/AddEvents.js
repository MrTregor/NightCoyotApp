import React from "react";
import {host} from "../../config/database";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


export default function AddEvents(props) {

    const [modalShow, setModalShow] = React.useState(false);
    const handleModalShow = () => setModalShow(true);
    const handleModalClose = () => setModalShow(false);

    function submitHandler(event) {
        event.preventDefault()
        console.log(event.target)
        let i = 0;
        let name = event.target[i].value;
        i++;
        let date = event.target[i].value;
        i++;
        let image = event.target[i].value;
        i++;
        onCreate(name, date, image);
    }

    function onCreate(name, date, image) {
        console.log({name, date, image,});
        fetch("http://" + host + "/actions-with-events/add-event.php", {
            method: 'POST', body: JSON.stringify({name: name, date: date, image: image})
        }).then(response => response.text()).then(response => {
            console.log(JSON.parse(response))
            handleModalShow();
            props.events.push({id: Date.now(), title: name, date: date, image: image})
            console.log(props.events);
        });
    }


    return (<main className="firstElement">
        <section className="portfolio-block ">
            <div className="container">
                <div className="heading">
                    <h2>Создать новое мероприятие</h2>
                </div>

                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Название мероприятия</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Дата проведения</Form.Label>
                        <Form.Control type="date"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>URL картинки</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Button variant="none" className="btn btn-lg d-block w-100 gradient" type="submit">
                        {/*<NavLink to="/menu_add">*/}
                        Создать
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
                            Мероприятие успешно создано!
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warring" className={"gradient"} onClick={handleModalClose}>Хорошо</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </section>
    </main>);
}