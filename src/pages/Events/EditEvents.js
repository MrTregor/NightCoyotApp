import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { updateEvent } from '../../utility/api_pathes'

export default function EditEvents(props) {
  const [modalShow, setModalShow] = React.useState(false)
  const handleModalShow = () => setModalShow(true)
  const handleModalClose = () => setModalShow(false)

  function onEdit(name, date, image) {
    console.log({ name, date, image })
    fetch(updateEvent, {
      method: 'POST', body: JSON.stringify({
        id: props.selectedItem.id, name: name, date: date, image: image,
      }),
    }).then(response => response.text()).then(() => {
      handleModalShow()
      console.log(props.editGlobalEvents({ id: props.selectedItem.id, name: name, date: date, image: image }))
    })
  }

  function submitHandler(event) {
    event.preventDefault()
    let i = 0
    let name = event.target[i].value === '' ? props.selectedItem.title : event.target[i].value
    i++
    let date = event.target[i].value === '' ? props.selectedItem.date : event.target[i].value
    i++
    let image = event.target[i].value === '' ? props.selectedItem.image : event.target[i].value
    i++
    onEdit(name, date, image)
  }

  return (<main className="firstElement">
    <section className="portfolio-block ">
      <div className="container">
        <div className="heading">
          <h2>Изменить выбранное мероприятие</h2>
        </div>

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Название мероприятия</Form.Label>
            <Form.Control type="text" placeholder={props.selectedItem.title}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Дата проведения</Form.Label>
            <Form.Control type="date" defaultValue={props.selectedItem.date}/>
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
            <Button variant="warring" className={'gradient'} onClick={handleModalClose}>Хорошо</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </section>
  </main>)
}