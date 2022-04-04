import React, {useState} from "react";
import {Link, NavLink} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container";
import {FaArrowLeft} from "react-icons/fa";
import {CgMenu} from "react-icons/cg";
import {domain} from "../config/domain";
import Cookies from "universal-cookie";
import '../resources/css/styles.min.css';
import '../resources/css/NavBar.css';

const NavBar = (props) => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    let cookies = new Cookies();
    let logOutBtn = <div/>;

    if (cookies.get('role') !== undefined) {
        logOutBtn = <Button variant="outline-light items mr_8 mt_8" onClick={() => {
            cookies.remove('role');
            cookies.remove('userId');
            window.location.href = "/main"
        }}>Выйти</Button>;
    }
    return (<Navbar fixed={"top"} bg="dark" variant="dark" expand="lg" className="gradient ">
        <Container className={'navBar_h'}>
            <img src={domain + "/logo.png"} alt={"НОЧНОЙ КОЙОТ"} height={"60xp"}/>
            <Navbar.Brand href="index">Ночной койот</Navbar.Brand>
            <div>
                <Link to='#' className='menuOpen'>
                    <div onClick={showSidebar}><CgMenu/></div>
                </Link>
            </div>
            <nav
                className={sidebar ? 'navMenu active d-flex flex-column align-items-end ' : 'navMenu d-flex flex-column align-items-end '}>
                <Link to='#' className='menuClose' onClick={showSidebar}>
                    <FaArrowLeft/>
                </Link>
                {props.links.map((link, index) => {
                    return <NavLink key={index = 'NavLink' + index} to={"/" + link.link} className={"items"}
                                    onClick={showSidebar}>
                        <div className="nav-link">{link.label}</div>
                    </NavLink>
                })}
                {logOutBtn}
            </nav>
        </Container>
    </Navbar>)
}
export default NavBar;