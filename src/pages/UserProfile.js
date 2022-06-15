import React, { Component } from 'react'
import Cookies from 'universal-cookie'
import { Alert, Button, Form, Spinner, Stack} from 'react-bootstrap'
import InputMask from 'react-input-mask'
import Modal from 'react-bootstrap/Modal'
import {
  checkEmailExistence, deleteUser, getCookOrders, getUserInfo, updateUser,
} from '../utility/api_pathes'
import { MealInProfile } from '../components/meals/MealInProfile'
import '../resources/css/UserProfile.css'
import md5 from "react-native-md5";

export class UserProfile extends Component {
  state = {
    isLoading: false, isUpdateUserInfoLoading: false, userData: [], // userOrders: [],
    modalShow: false, errorMessage: [], message: '', deleteModalShow: false, cookOrdersElements: [],
  }
  meals = []

  constructor(props) {
    super(props)
    this.meals = this.props.meals
  }

  cookies = new Cookies()
  getUserInfoFromAPI = () => {
    fetch(getUserInfo, {
      method: 'POST', body: JSON.stringify({ user_id: this.cookies.get('userId') }),
    }).then(response => response.text()).then(response => {
      console.log('User data: ')
      console.log(JSON.parse(response))
      this.setState({ userData: JSON.parse(response)[0] })
    })
  }
  getUserOrdersFromAPI = () => {
    fetch(getCookOrders, {
      method: 'POST', body: JSON.stringify({ userId: this.cookies.get('userId') }),
    }).then(response => response.text()).then(response => {
      response = JSON.parse(response)
      console.log('Users orders data: ')
      console.log(response)
      let cookOrdersElements = []
      let lastOrderNum = -1
      response.forEach((order, index) => {
        let mealForElement = {}
        this.meals.forEach((meal) => {
          if (meal.meal_id === order.meal_id) {
            mealForElement = meal
          }
        })
        if (lastOrderNum !== order.order_num) {
          lastOrderNum = order.order_num
          cookOrdersElements.push(<h3 key={"lon"+index} className={'whiteText'}>Заказ #{lastOrderNum}</h3>)
        }
        cookOrdersElements.push(<MealInProfile key={'mipe' + index} count={order.count} meal={mealForElement}/>)
      })
      this.setState({ cookOrdersElements: cookOrdersElements })
    })
  }
  lastOrdersLength = 0

  componentDidMount() {
    this.getUserInfoFromAPI()
    this.getUserOrdersFromAPI()
    setInterval(() => {
      if (JSON.parse(localStorage.getItem('orderNums')) && this.lastOrdersLength != JSON.parse(localStorage.getItem('orderNums')).length) {
        this.lastOrdersLength = JSON.parse(localStorage.getItem('orderNums')).length
        this.getUserOrdersFromAPI()
      }
    }, 1000)
  }

  handleModalShow = () => this.setState({ modalShow: true })
  handleModalClose = () => this.setState({ modalShow: false })
  deleteHandleModalClose = () => this.setState({ deleteModalShow: false })
  deleteHandleModalShow = () => this.setState({ deleteModalShow: true })

  submitHandler = (event) => {
    event.preventDefault()
    let formData = document.getElementById('updateForm')
    let sName = formData[0].value
    let fName = formData[1].value
    let email = formData[2].value
    let pass = formData[3].value
    let doublePass = formData[4].value
    let phone = formData[5].value
    this.state.errorMessage = []
    if (pass !== doublePass) {
      this.state.errorMessage.push(<div>Пароли не совпадают!<br/></div>)
    }
    if (phone !== '' && phone.split(' ').length !== 2) {
      this.state.errorMessage.push(<div>Номер телефона указан некорректно!<br/>
      </div>)
    }
    this.setState({ isUpdateUserInfoLoading: true })
    fetch(checkEmailExistence, {
      method: 'POST', body: JSON.stringify({
        email: email, userId: this.cookies.get('user_id'),
      }),
    }).then(response => response.text()).then(response => {
      this.setState({ isUpdateUserInfoLoading: false })
      response = JSON.parse(response)
      if (response.exist !== undefined && response.exist === true) {
        this.state.errorMessage.push(<div>Пользователь с такой почтой уже
          существует!<br/></div>)
      }
      console.log(this.state.errorMessage.length !== 0)
      if (this.state.errorMessage.length !== 0) {
        this.handleModalShow()
      } else {
        fetch(updateUser, {
          method: 'POST', body: JSON.stringify({
            email: email, fName: fName, sName: sName, pass: md5.hex_md5(pass), phone: phone, userId: this.cookies.get('userId'),
          }),
        }).then(response => response.text()).then(() => {
          this.handleModalShow()
          this.setState({ message: 'Данные успешно обновлены!' })
          this.getUserInfoFromAPI()
        })
      }
    })
  }

  deleteProfileHandler=()=> {
    fetch(deleteUser, {
      method: 'POST', body: JSON.stringify({ userId: this.cookies.get('userId') }),
    }).then(response => response.text()).then(response => {
      response = JSON.parse(response)
      console.log(response)
      if (response.result === 'OK') {
        this.handleModalShow()
        this.setState({ message: 'Пользователь успешно удалён!' })
        this.cookies.remove('role')
        this.cookies.remove('userId')
        window.location.href = '/login'
      }
    })
  }

  render() {
    if (this.state.userData !== undefined) {
      return <div key={'divRenderU1'}>
        <main className={'firstElement'}/>
        <div className={'container d-flex flex-column justify-content-center '}>
          <h1 className={'text-center'}>Профиль пользователя:</h1>
          <h1
                  className={'text-center'}>{this.state.userData.sname} {this.state.userData.fname}</h1>
          <h2 className={'text-center d-flex justify-content-center'}>
            <div style={{ color: '#faae0a' }}>Баллы:&nbsp;</div>
            {this.state.userData.bonus_points}</h2>
          <h2 className={'text-center d-flex justify-content-center'}
              style={{ textDecoration: 'underline' }}>1 пункт меню = 1 балл
            = 1 рубль</h2>
          <h5 className={'text-center whiteText'}>Если вы НЕ хотите изменять
            определённые поля, оставьте их без
            изменений.</h5>
          {!this.state.isUpdateUserInfoLoading ? <Form className={'d-flex flex-column justify-content-center'}
                                                       id={'updateForm'}>
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
              <Form.Control type="password"
                            placeholder="Введите пароль повторно"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Телефон</Form.Label>
              <InputMask className={'form-control item'}
                         mask="+7\(999) 999-9999"
                         placeholder="Введите телефон" maskChar=" "/>
            </Form.Group>
            <Button variant={'dark'} onClick={(event) => {
              this.submitHandler(event)
            }} className={'gradient'}><h3>Сохранить изменения</h3></Button>
          </Form> : <Spinner animation="border" role="status" className={'whiteText'}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>}

          <h1>Ожидают приготовления</h1>

          <Stack className="col-md-5 mx-auto order-list "
                 style={{ marginBottom: '20rem', width: '99%', background: 'var(--bs-dark)' }}>
            {this.state.cookOrdersElements}
          </Stack>

          <Button variant={'dark'} onClick={() => {
            this.deleteHandleModalShow()
          }} className={'gradient'}>
            <h3>Удалить профиль</h3>
          </Button>
          <Modal show={this.state.modalShow} onHide={() => this.handleModalClose} size="lg"
                 aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Сообщение системы.
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{this.state.errorMessage}</p>
              <p>{this.state.message}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" className={'gradient'}
                      onClick={this.handleModalClose}>Хорошо</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.deleteModalShow}
                 onHide={() => this.deleteHandleModalClose} size="lg"
                 aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Удаление профиля.
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Alert variant="danger">
                <Alert.Heading>Внимание!</Alert.Heading>
                <p>
                  Ваш профиль будет БЕЗВОЗВРАТНО УДАЛЁН из системы. Восстановить
                  его будет НЕВОЗМОЖНО!
                  Вы точно хотите УДАЛИТЬ ПРОФИЛЬ?
                </p>
              </Alert>
            </Modal.Body>
            <Modal.Footer className={'justify-content-between'}>
              <Button variant="danger" onClick={() => {
                this.deleteProfileHandler()
              }}>Да</Button>
              <Button variant="success" size="lg"
                      onClick={this.deleteHandleModalClose}>Нет</Button>
            </Modal.Footer>
          </Modal>
        </div>

      </div>
    } else {
      return <div/>
    }
  }
}