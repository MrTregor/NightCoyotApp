import React, { Component } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import InputMask from 'react-input-mask'
import { getUserInfo, subLoyalScore } from '../utility/api_pathes'
import Cookies from 'universal-cookie'

export class Payment extends Component {
  state = { show: true, loyalScore: <Spinner animation="grow"/>, sumMoney: 0, maxSumMoney: 0, loyalPayment: <div/> ,
  cardNum:"", expireAt:""}
  setShow = (value) => {
    this.setState({ show: value })
  }
  setLoyal = (value) => {
    this.setState({ loyalScore: value })
  }
  setSumMoney = (value) => {
    this.setState({ sumMoney: value })
  }
  cookies = new Cookies()
  inputLoyalScore = 0
  changeLoyalCost = (value) => {
    if (parseInt(value.target.value) > this.state.loyalScore) {
      value.target.value = this.state.loyalScore
    }
    if (parseInt(value.target.value) < 0) {
      value.target.value = 0
    }
    this.setSumMoney(this.state.maxSumMoney - value.target.value)
    this.inputLoyalScore = value.target.value
  }

  componentDidMount() {
    console.log('mounted')
    if (this.cookies.get('userId')!=undefined){
      fetch(getUserInfo, {
        method: 'POST', body: JSON.stringify({ user_id: this.cookies.get('userId') }),
      }).then(resp => resp.text()).then(resp => {
        this.setLoyal(JSON.parse(resp)[0].bonus_points)
        this.setState({
          loyalPayment: <div><h3 className={'whiteText ml_8'}>Вы можете расплатиться баллами лояльности.</h3>
            <Form.Group className="mb-3 ml_8" controlId="formBasicSecondName">
              <Form.Label>Кол-во баллов, которые вы хотите потратить</Form.Label>
              <div className={'d-flex flex-row'}>
                <Form.Control type="number" className={'w-50'} onChange={(value) => {
                  this.changeLoyalCost(value)
                }} placeholder={"1"} name={'loyalScores'}/>
                <h1>&nbsp;/ {this.state.loyalScore}</h1>
              </div>
            </Form.Group></div>,
        })
      })
    }
    this.setSumMoney(this.props.sumMoney)
    this.setState({ maxSumMoney: this.props.sumMoney })
    if (localStorage.getItem('memoryCard') && localStorage.getItem('memoryCard') !== '') {
      let cardData = JSON.parse(localStorage.getItem('memoryCard'))
      let formData = document.getElementById('payForm')
      formData[0].value = cardData.cardHolder
      this.state.cardNum = cardData.cardNum
      this.state.expireAt = cardData.expireAt
      formData[3].value = cardData.CVV
      formData[4].checked = true
    }
  }

  submitHandler = () => {
    let formData = document.getElementById('payForm')
    let cardHolder = formData[0].value
    let cardNum = formData[1].value
    let expireAt = formData[2].value
    let CVV = formData[3].value
    let memoryCard = formData[4].checked
    cardHolder = cardHolder.toUpperCase()
    console.log({ cardHolder, cardNum, expireAt, CVV, memoryCard })
    if (memoryCard) {
      localStorage.setItem('memoryCard', JSON.stringify({
        cardHolder: cardHolder,
        cardNum: cardNum,
        expireAt: expireAt,
        CVV: CVV,
      }))
    } else {
      localStorage.setItem('memoryCard', '')
    }
    if (cardHolder != '' && cardNum.length == 19 && expireAt.length == 5 && CVV.length == 3) {
      this.props.takeOrder()
      if (this.cookies.get('userId') != undefined) {
        fetch(subLoyalScore, {
          method: 'POST',
          body: JSON.stringify({ user_id: this.cookies.get('userId'), sub_loyal_score: this.inputLoyalScore }),
        }).then(resp => resp.text()).then(resp => {
          console.log(resp)
        })
      }
    } else {
      this.handleShow()
    }
  }
  handleClose = () => this.setShow(true)
  handleShow = () => this.setShow(false)

  onChangeCardNum = (event) => {
    this.setState({
      cardNum: event.target.value
    });
  }

  onChangeExpireAt = (event) => {
    this.setState({
      expireAt: event.target.value
    });
  }

  render() {
    return <div>
      <main className={'firstElement'}/>
      {this.state.loyalPayment}
      <h3 className={'whiteText ml_8'}>Введите данные карты для оплаты заказа на сумму {this.state.sumMoney} р.</h3>
      <Form className={'d-flex flex-column justify-content-center'}
            id={'payForm'}>
        <Alert hidden={this.state.show} key={'danger'} variant={'danger'}>
          Проверьте правильность заполнения полей!
        </Alert>
        <Form.Group className="mb-3">
          <Form.Label>ИМЯ ФАМИЛИЯ владельца карты</Form.Label>
          <Form.Control type="text" placeholder="ИВАН ИВАНОВ" name={'cardHolder'}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Номер карты</Form.Label>
          <InputMask className={'form-control item'}
                     mask="9999 9999 9999 9999" name={'cardNum'} id={'cardNum'} value={this.state.cardNum} onChange={this.onChangeCardNum}
                     placeholder="1234 4567 7890 1234" maskChar=" "/>
        </Form.Group>
        <div className={'d-flex flex-row'}>
          <Form.Group className="mb-3 mr_8">
            <Form.Label>Истекает</Form.Label>
            <InputMask className={'form-control item'}
                       mask="99/99" value={this.state.expireAt} onChange={this.onChangeExpireAt}
                       name={'expireAt'} id={'expireAt'}
                       placeholder="10/25" maskChar=" "/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>CVV код</Form.Label>
            <Form.Control type="password" name={'cvv'} id={'cvv'} maxLength={3} placeholder="123"/>
          </Form.Group>
        </div>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" name={'memoryCard'} label="Запомнить карту для будущих платежей"/>
        </Form.Group>
        <Button variant={'dark'} onClick={(event) => {
          this.submitHandler(event)
        }} className={'gradient'}><h3>Оплатить</h3></Button>
      </Form>

    </div>
  }
}
