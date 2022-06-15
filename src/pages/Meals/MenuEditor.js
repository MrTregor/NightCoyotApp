import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import { NavLink } from 'react-router-dom'
import '../../resources/css/MenuEditor.css'
import { FaSearch } from 'react-icons/fa'
import MenuEditorRow from '../../components/meals/MenuEditorRow'

export default function Editor(props) {
  const [modalShow, setModalShow] = React.useState(false)
  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)
  const [itemNameToDelete, setItemNameToDelete] = React.useState('')

  function AddItemToDelete(name) {
    setItemNameToDelete(name)
    handleShow()
  }

  function DeleteItem() {
    handleClose()
    props.deleteItem(itemNameToDelete)
    rows.forEach((item, index) => {

      if (item && item.props.value.name === itemNameToDelete) {
        rows.splice(index, 1)
        console.log(item)
        console.log(index)
      }
    })
    props.UpdateMeals()
  }

  function returnMenuEditorRow(id, value, AddItemToDelete) {
    return (<MenuEditorRow id={id} key={'mere' + id} value={value} AddItemToDelete={AddItemToDelete}
                           changeSelectedItem={props.changeSelectedItem}/>)
  }

  let id = 0
  const [rows, setRows] = React.useState(props.menu.map(value => {
    id++
    return returnMenuEditorRow(id, value, AddItemToDelete)
  }))
  const [searchText, setSearchText] = useState('')
  function FindMealItem() {//ищет текст на странице, в параметр передается ID поля для ввода
    // Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу
    setRows(props.menu.map((value) => {
      // console.log(value);
      if (value.name.indexOf(searchText) !== -1) {
        id++
        return returnMenuEditorRow(id, value, AddItemToDelete)
      } else return null
    }))
  }


  return (<div>
    <main className="firstElement"/>
    <div className="d-flex justify-content-center">
      <Button variant="none" className="btn gradient mb-3 mt-3 mr_6" type="button">
        <NavLink to="/menu_add">
          <div className="nav-link-white">Добавить новое блюдо</div>
        </NavLink>
      </Button>
    </div>
    <div className="mr_8 ml_8 mb_8">
      <Form>
        <Form.Group className="mb-3 d-md-flex align-items-md-center" controlId="formBasicInput">
          <Form.Label className={'mr_8'}>Назание </Form.Label>
          <Form.Control type="text" placeholder="Блюдо/Напиток"
                        onChange={(event) => setSearchText(event.target.value)}/>
          <Button className="gradient mr_8 ml_8" variant={'none'} type="button"
                  onClick={() => FindMealItem()}><FaSearch/>
          </Button>
          <Dropdown>
            <Dropdown.Toggle variant="none" className={'gradient'} id="dropdown-basic">
              Категория
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {props.categories.map((category) => {
                return <Dropdown.Item key={category.name}
                                      href={'#' + category.name}>{category.name}</Dropdown.Item>
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
      </Form>

    </div>
    <div className="table-responsive">
      <Table responsive={'sm'} striped bordered hover>
        <thead>
        <tr>
          <th>Название</th>
          <th>Категория</th>
          <th>Стоимость</th>
          <th style={{ columnWidth: 50 + 'px' }}>URL картинки</th>

          <th style={{width: 126 + 'px'}}/>
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
        <Button variant="dark" className={'gradient'} onClick={() => DeleteItem()}>Да</Button>
      </Modal.Footer>
    </Modal>
  </div>)
}