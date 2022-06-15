import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const CompleteOrderModal = ({orderNum}) => {
  const [show, setShow] = useState(true)
  const handleClose = () => {
    let localValues = JSON.parse(localStorage.getItem('completedOrder'))
    let index = -1
    localValues.forEach((val, localIndex) => {
      if (val == orderNum) {
        index = localIndex
      }
    })
    localValues.splice(index, 1)
    localStorage.setItem('completedOrder', JSON.stringify(localValues))
    setShow(false)
  };
  // const handleShow = () => setShow(true)

  return (<div>
    <Modal show={show} id={'OrMl' + orderNum} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Сообщение системы!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Заказ номер {orderNum} готов! Пожалуйста подойдите к стойке и покажите это сообщение работнику за стойкой, чтобы получить ваш заказ.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="none" className={'gradient'} onClick={handleClose}>Хорошо</Button>
      </Modal.Footer>
    </Modal>
  </div>);
}

export default CompleteOrderModal;