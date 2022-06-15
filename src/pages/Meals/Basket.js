import React from "react";
import "../../resources/css/Menu.css"
import {FaRubleSign} from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom'
import { domain } from '../../config/domain'

const Basket = ({ basketRows, sumMoney }) => {
    console.log(basketRows.length)
    return (<div className={"firstElement"}>
        {basketRows}
        <div className={"firstElement"}/>
        {basketRows.length? <div className={"pr_l_14 d-flex justify-content-md-center"}>
            <Link to='payment' className='menuOpen'>
                <Button variant={"success"} className="d-flex basketBtn mr_8 ml_8"  type="button"><label
                        className="form-label d-flex flex-fill justify-content-start "><strong>Заказать</strong></label>
                    <label
                            className="form-label d-flex justify-content-center align-items-center mx-auto  textBold">
                        <strong>{sumMoney}&nbsp;</strong>
                        <FaRubleSign/>
                    </label></Button>
            </Link>
        </div>:<div className={"d-flex justify-content-center pt-3 flex-column align-items-center"}>
            <img src={domain + "/EmptyBasket.png"} width={"300inch"} className={"opacity-75"} alt={"Картинка для пустой корзины"}/>
            <h3 style={{color:"#868686", margin: "12px", textAlign:"center"}}> Стакан пуст, выберите <br/>что-нибудь в меню</h3>
        </div>}

    </div>);
}
export default Basket