import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'
import {FaPlus} from "react-icons/fa";
import {addMeal} from "../../utility/api_pathes";


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

    const [modalErrorShow, setModalErrorShow] = React.useState(false);
    const handleModalErrorShow = () => setModalErrorShow(true);
    const handleModalErrorClose = () => setModalErrorShow(false);

    function onCreate(name, category, price, grams, image, newCat) {
        console.log({name, category, price, image, grams, newCat});


        fetch(addMeal, {
            method: 'POST', body: JSON.stringify(
                {name: name, category: category, price: price, grams: grams, image: image, newCateg: newCat})
        }).then(response => response.text())
            .then(response => {
                try {
                    console.log(JSON.parse(response))
                } catch (e) {
                    handleModalErrorShow()
                }
                if (JSON.parse(response).exist === true) {
                    handleShow();
                } else {
                    handleModalShow();
                    let newCategory = {id: Date.now(), name: category}
                    if (newCat === true) {
                        props.categories.push(newCategory)
                    }
                    console.log(category)
                    props.menu.push({
                        id: "",
                        name: name,
                        category: newCategory,
                        grams: grams,
                        price: price,
                        image: image
                    })
                    console.log(props.menu);
                    console.log(props.categories)
                    props.UpdateMeals();
                    if (newCat === true) {
                        window.location = "/menu_add"
                    }
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
        const [categoryField, setCategory] = useState(<div/>);
        const [isLoading, setLoading] = useState(false);
        useEffect(() => {
            if (isLoading) {
                setLoading(true);
                setCategory(<Form.Control type="text" id={"newCat"} placeholder="?????????????? ???????????????? ?????????? ??????????????????"/>);
            }
        }, [isLoading]);

        const handleClick = () => setLoading(true);
        return (<div className="w-100">
            <div className="d-flex align-items-center w-100">
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
                    <h2 className={"text-center"}>???????????????? ?????????? ?????????? ????????</h2>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>?????????????????? ??????????????</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>?????????? ?????? ?????????????? ?? ?????????? ???????????? ?????? ????????????????????!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="none" className={"gradient"} onClick={() => handleClose()}>
                            ????????
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
                            ?????????????????? ??????????????!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            ??????????/?????????????? ?????????????? ??????????????????!
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="none" className={"gradient"} onClick={handleModalClose}>????????????</Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={modalErrorShow}
                    onHide={() => setModalErrorShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            ?????????????????? ??????????????!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            ???????????????????? ?????????????????? ????????!
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="none" className={"gradient"} onClick={handleModalErrorClose}>????????????</Button>
                    </Modal.Footer>
                </Modal>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>????????????????</Form.Label>
                        <Form.Control type="text" placeholder="?????????????? ???????????????? ?????????? ?????? ??????????????"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>??????????????????</Form.Label>
                        <AddCategoryField/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>C????????????????</Form.Label>
                        <Form.Control type="number" placeholder="?????????????? ?????????????????? ?????????? ?????? ??????????????"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>????????????</Form.Label>
                        <Form.Control type="number" placeholder="?????????????? ????????????"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>URL ????????????????</Form.Label>
                        <Form.Control type="text" placeholder="?????????????? ?????????? ???????????????? ?????????? ?????? ??????????????"/>
                    </Form.Group>
                    <Button variant="none" className="btn btn-lg d-block w-100 gradient" type="submit">
                        {/*<NavLink to="/menu_add">*/}
                        <div className="nav-link-white">????????????????</div>
                        {/*</NavLink>*/}
                    </Button>
                </Form>
            </div>
        </section>
    </main>)
}
