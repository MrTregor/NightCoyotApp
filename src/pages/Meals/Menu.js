import React, {useEffect, useState} from "react";
import "../../resources/css/styles.min.css";
import "../../resources/css/Menu.css";
import {NavLink} from "react-router-dom";
import {FaRubleSign} from "react-icons/fa";


const Menu = ({menuRows, fastLinks, sum}) => {
    // Переход по быстрым ссылкам категорий //
    const [categoriesAnchor, setCategoriesAnchor] = useState(false)
    const menuScrollHandler = e => {
        if (e.target.documentElement.scrollTop > 36) {
            setCategoriesAnchor(true)
        } else {
            setCategoriesAnchor(false)
        }
    }
    useEffect(() => {
        document.addEventListener('scroll', menuScrollHandler)
        return function () {
            document.removeEventListener('scroll', menuScrollHandler)
        }
    }, [])
    //////////////////////////////////////////
    return (<main className=" firstElement">
        <section>
            <div className="container">
                <div className="heading text-center"><h1>{JSON.parse(localStorage.getItem('selectedSection')).name}</h1>
                    <div
                        className={"d-flex flex-row hideScrollBar " + categoriesAnchor.toString()}>{fastLinks[JSON.parse(localStorage.getItem('selectedSection')).big_category_id]}
                    </div>
                </div>
                {menuRows[JSON.parse(localStorage.getItem('selectedSection')).big_category_id]}
            </div>
        </section>
        <div className="basketBtnDiv">
            <NavLink to="/bucket">
                <button className="btn d-flex basketBtn" type="button">
                    <label className="form-label d-flex flex-fill justify-content-start"
                           style={{color: "var(--bs-dark)"}}>
                        <strong>Корзина</strong><br/></label>
                    <label
                        className="form-label d-flex justify-content-center align-items-center mx-auto"
                        style={{fontWeight: "bold", color: "var(--bs-dark)"}}><strong>{sum}</strong><br/>
                        <FaRubleSign/>
                    </label>
                </button>
            </NavLink>
        </div>
    </main>);
}
export default Menu;
