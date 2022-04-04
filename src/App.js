import React, {useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {host} from './config/database';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Cookies from "universal-cookie";
import Title from './components/Title';
import NavBar from "./components/NavBar";
import Bucket from "./pages/Meals/Basket";
import Menu from "./pages/Meals/Menu";
import Main from "./pages/Main";
import MenuEditor from "./pages/Meals/MenuEditor";
import AddMeal from "./pages/Meals/AddMeal";
import EditMeal from "./pages/Meals/EditMeal";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cooker from "./pages/Cooker";
import Events from "./pages/Events/Events";
import EditEvents from "./pages/Events/EditEvents";
import EventsEditor from "./pages/Events/EventsEditor";
import AddEvents from "./pages/Events/AddEvents";
import DrawMealCard from "./components/meals/DrawMealCard";
import DrawCategory from "./components/meals/DrawCategory";
import BasketItem from "./components/meals/BasketItem";
import OrderCookerRow from "./components/meals/OrderCookerRow";
import "./resources/css/styles.min.css";
import menu from "./pages/Meals/Menu";
import {GetOrderedMeal} from "./utility/get_db_data";
import BigCategoryEditor from "./pages/big-categories/BigCategoryEditor";
import BigCategoryAdd from "./pages/big-categories/BigCategoryAdd";
import BigCategoryEdit from "./pages/big-categories/BigCategoryEdit";


const App = ({orderFetches, bigCategoriesDB, categoriesDB, mealsDB, eventsDB, ordersDB}) => {
    if (localStorage.getItem('orderNums') !== null) {
        JSON.parse(localStorage.getItem('orderNums')).forEach((num, index) => {
            if (num !== null && orderFetches && orderFetches.indexOf(num) === -1) {
                orderFetches.push(num)
                CheckOrderComplete(num, index);
            }
        })

    }
    const cookies = new Cookies();
    let categories = categoriesDB;
    let bigCategories = bigCategoriesDB;
    const [eventsList, setEventsList] = React.useState(eventsDB);
    const [orders, setOrders] = React.useState(ordersDB);
    const [meals, setMeals] = React.useState(mealsDB);
    const [orderNumForModal, setOrderNumForModal] = useState(0);

    const [selectedMeal, setSelectedMeals] = React.useState(() => {
        if (localStorage.getItem("selectedMeal") !== null) {
            return JSON.parse(localStorage.getItem("selectedMeal"));
        } else {
            return {id: "id", name: "name", category: "category", grams: "grams", price: "price", image: "image"};
        }
    });

    const [selectedEvent, setSelectedEvent] = React.useState(() => {
            if (localStorage.getItem('selectedEvent') != null) {
                return JSON.parse(localStorage.getItem('selectedEvent'));
            } else {
                return {id: "id", title: "title", date: "date", image: "image"}
            }
        }
    );

    const [selectedBigCategory, setSelectedBigCategory] = React.useState(() => {
        if (localStorage.getItem('selectedBigCategory') != null) {
            return JSON.parse(localStorage.getItem('selectedBigCategory'));
        } else {
            return {id: "id", name: "name"};
        }
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let menuRows = [], fastLinks = [], basketRows = [], basketMeals = JSON.parse(localStorage.getItem('basketItems'));
    let sumMoney = 0, id = 0;
    categories.forEach((category, index) => { // Для каждой категории вывожу своё блюдо
        fastLinks.push(<a key={index} className="text-nowrap fastLinkMenu"
                          href={"#" + category.name}>{category.name}</a>)
        menuRows.push(<DrawCategory key={category.name + "FastLink"} name={category.name}/>) // Заголовок категории
        id++;
        let categoryMenu = [];
        meals.forEach(menuItem => {
            if (basketMeals != null) {
                basketMeals.forEach((basketItem, index) => {
                    if (basketItem !== null && basketItem.meal_id === menuItem.meal_id) {
                        menuItem.checked = true;
                        menuItem.count = basketItem.count;
                    }
                })
            }
            if (menuItem.category.name === category.name) { // Если блюдо в данной категории, то добавлям в отрисовку
                if (menuItem.checked) { // Если блюдо отвечено то увеличиваем сумму заказа
                    sumMoney += menuItem.price * menuItem.count;
                }
                categoryMenu.push(<DrawMealCard key={id} anchorId={menuItem.category.name} menuItem={menuItem}
                                                onPressed={PressMealItem}/>);
                id++;
            }


        });
        // Вывод на отрисовку блюд категории
        menuRows.push(<div key={id} className="row">
            {categoryMenu}
        </div>);
        id++;
    });

    meals.forEach((menuItem, index) => {
        if (menuItem.checked) { // Если блюдо отвечено то увеличиваем сумму заказа
            basketRows.push(<BasketItem key={index} menuItem={menuItem} onPressed={PressMealItem}/>);
        }
    });

    let ordersRows = [];
    CookerOrderConstructor();


    let routes = {
        bucket: <Route path={"/bucket"} key={"br1"}
                       render={() => <Bucket basketRows={basketRows} sumMoney={sumMoney} takeOrder={SendOrder}/>}/>,
        cooker: <Route path={"/cooker"} key={"cr1"} render={() => <Cooker ordersRows={ordersRows}/>}/>,
        menu: <Route path={"/menu"} key={"mr1"}
                     render={() => <Menu menuRows={menuRows} onSelected={PressMealItem} sum={sumMoney}
                                         fastLinks={fastLinks}/>}/>,
        eventAdd: <Route path={"/add_event"} key={"ear1"} render={() => <AddEvents events={eventsList}/>}/>,
        eventEdit: <Route path={"/event_edit"} key={"eer1"}
                          render={() => <EditEvents events={eventsList} selectedItem={selectedEvent}
                                                    editGlobalEvents={EditEventItem}/>}/>,
        events: <Route path={"/events"} key={"er1"} render={() => <Events events={eventsList}/>}/>,
        eventsEditor: <Route path={"/events_editor"} key={"eer2"}
                             render={() => <EventsEditor events={eventsList} deleteItem={DeleteEventItem}
                                                         changeSelectedItem={ChangeSelectedEvent}/>}/>,
        menuEditor: <Route path={"/menu_editor"} key={"me1"}
                           render={() => <MenuEditor menu={meals} categories={categories}
                                                     deleteItem={DeleteMenuItem}
                                                     changeSelectedItem={ChangeSelectedMeal}/>}/>,
        menuAdd: <Route path={"/menu_add"} key={"ma1"} render={() => <AddMeal menu={meals} categories={categories}/>}/>,
        menuEdit: <Route path={"/menu_edit"} key={"me2"}
                         render={() => <EditMeal menu={meals} categories={categories}
                                                 selectedItem={selectedMeal}
                                                 editGlobalMeals={EditMealItem}/>}/>,
        bigCategoryEditor: <Route path={"/big_category_editor"} key={"bce1"}
                                  render={() => <BigCategoryEditor bigCategories={bigCategories} categories={categories} deleteItem={DeleteBigCategoryItem} changeSelectedItem={ChangeSelectedBigCategory}/>}/>,
        bigCategoryAdd: <Route path={"/big_category_add"} key={"bca1"}
                               render={() => <BigCategoryAdd/>}/>,
        bigCategoryEdit: <Route path={"/big_category_edit"} key={"bce2"}
                                render={() => <BigCategoryEdit bigCategories={bigCategories}
                                                               categories={categories}
                                                               selectedItem={selectedBigCategory}/>}/>,

        main: <Route path={"/main"} key={"mr2"} component={Main}/>,
        login: <Route key={"lr1"} path={"/login"} component={Login}/>,
        register: <Route path={"/register"} key={"rr1"} component={Register}/>,
    }
    let links = {
        bucket: {link: "bucket", label: "Корзина"}, cooker: {link: "cooker", label: "Список заказов"},
        menu: {link: "menu", label: "Меню"}, events: {link: "events", label: "Мероприятия"},
        eventsEditor: {link: "events_editor", label: "Редактор мероприятий"}, main: {link: "main", label: "Главная"},
        login: {link: "login", label: "Войти"}, register: {link: "register", label: "Зарегистрироваться"},
        menuEditor: {link: "menu_editor", label: "Редактор меню"},
        bigCategoryEditor: {link: "big_category_editor", label: "Редактор больших категорий"},
    }


    const userRoutes = [routes["bucket"], routes["main"], routes["menu"], routes["events"], routes["login"],
        routes["register"]];
    const userLinks = [links["main"], links["menu"], links["bucket"], links["events"]];
    const adminRoutes = [routes["bucket"], routes["main"], routes["menu"], routes["login"], routes["register"],
        routes["events"], routes["menuEditor"], routes["menuEdit"], routes["menuAdd"], routes["eventEdit"],
        routes["eventAdd"], routes["eventsEditor"], routes["bigCategoryEdit"], routes["bigCategoryAdd"],
        routes["bigCategoryEditor"]];
    const adminLinks = [links["main"], links["menu"], links["bucket"], links["events"],/*login["link"], register["link"],*/
        links["menuEditor"], links["eventsEditor"], links["bigCategoryEditor"]];
    const guestRoutes = [routes["bucket"], routes["main"], routes["menu"], routes["events"], routes["login"],
        routes["register"]];
    const guestLinks = [links["main"], links["menu"], links["bucket"], links["events"], links["login"],
        links["register"]];
    const cookerRoutes = [routes["main"], routes["cooker"], routes["login"]];
    const cookerLinks = [links["main"], links["cooker"]];


    // Переписан для перестройки
    function PressMealItem(id, type) {
        let newBasket = [];
        if (localStorage.getItem("basketItems") !== null) {
            newBasket = JSON.parse(localStorage.getItem("basketItems"));
        }
        switch (type) {
            case "add":
                setMeals(meals.map(meal => {
                    if ((meal.checked === undefined || meal.checked === false) && meal.meal_id === id) {
                        meal.checked = true;
                        meal.count = 1;
                        newBasket.push({meal_id: meal.meal_id, count: meal.count})
                        console.log("Add")
                    }
                    return meal;
                }))
                break;
            case "plus":
                setMeals(meals.map(meal => {
                    if (meal.meal_id === id) {
                        meal.count++;
                        newBasket.map(basketMeal => {
                            if (basketMeal.meal_id === id) {
                                basketMeal.count++;
                            }
                            return basketMeal;
                        })
                    }
                    return meal;
                }))
                break;
            case "minus":
                setMeals(meals.map(meal => {
                    if (meal.meal_id === id) {
                        meal.count -= 1;
                        newBasket.forEach((basketMeal, index) => {
                            if (basketMeal.meal_id === id) {
                                newBasket[index].count--;
                                if (newBasket[index].count < 1) {
                                    newBasket.splice(index, index);
                                }
                            }
                            return basketMeal;
                        })
                        if (meal.count < 1) {
                            meal.checked = false;
                            console.log(meal)
                        }
                    }

                    return meal;
                }))
                break;
            default:
                break;
        }
        localStorage.setItem("basketItems", JSON.stringify(newBasket))
    }

    function CookerOrderConstructor() {
        if (cookies.get("role") === "cooker") {
            console.log(orders)
            orders.forEach((value, index) => {
                if (value !== undefined) {
                    meals.forEach(meal => {
                        if (value.meal_id === meal.meal_id) {
                            ordersRows.push(<OrderCookerRow key={"c" + index} index={index} curMeal={meal}
                                                            CompleteOrder={CompleteOrder}
                                                            value={value}/>);
                        }
                    })
                }
            });
        }
    }

    function CheckOrderComplete(num, index) {
        fetch("http://" + host + "/actions-with-orders/check-order-completion.php", {
            method: 'POST', body: JSON.stringify({orderNum: num})
        }).then(resp => resp.text())
            .then(resp => {
                console.log(resp)
                let orderNum = JSON.parse(resp).orderNum;
                let localValues = JSON.parse(localStorage.getItem('orderNums'));
                localValues.splice(index, index)
                localStorage.setItem('orderNums', JSON.stringify(localValues))
                setOrderNumForModal(orderNum);
                handleShow();
            })
    }

    function SendOrder() {
        let orderedMeals = []
        setMeals(meals.map(meal => {
            if (meal.checked) {
                orderedMeals.push(meal)
                meal.checked = false;
                // meal.count = 0;
                localStorage.setItem('basketItems', "[]")
            }
            return meal;
        }))
        console.log(orderedMeals);
        let userId = cookies.get('userId') === undefined ? null : cookies.get('userId');
        let sendedOrder = fetch("http://" + host + "/actions-with-orders/create-order.php", {
            method: 'POST', body: JSON.stringify({order: orderedMeals, userId: userId})
        }).then(response => response.text())
            .then(response => {
                console.log(response)
                let orderNum = JSON.parse(response).orderNum;
                if (localStorage.getItem('orderNums') !== null) {
                    let localValues = JSON.parse(localStorage.getItem('orderNums'));
                    localValues.push(orderNum)
                    localStorage.setItem('orderNums', JSON.stringify(localValues))
                } else {
                    localStorage.setItem('orderNums', JSON.stringify([orderNum]))
                }
                CheckOrderComplete(orderNum)
            })

        console.log("Order on sending")
    }

    function CompleteOrder(orderId) {
        fetch("http://" + host + "/actions-with-orders/complete-order.php", {
            method: 'POST', body: JSON.stringify({orderId: orderId})
        }).then(response => response.text()).then(response => {
            JSON.parse(response);
            GetOrderedMeal().then(orders => {
                setOrders(orders);
            })

            CookerOrderConstructor();
        });
        console.log(orders);
        setOrders(orders.map(order => {
            if (order !== undefined && order.order_id !== orderId) {
                console.log(order);
                return order;
            }
        }));
        console.log(orders)
    }

    function EditEventItem(newEvent) {
        setEventsList(eventsList.map(eventItem => {
            console.log(eventItem)
            if (eventItem.id === newEvent.id) {
                console.log(newEvent.id + " " + eventItem.id)
                eventItem.title = newEvent.name;
                eventItem.date = newEvent.date;
                eventItem.image = newEvent.image;
            }
            return eventItem;
        }));
        return eventsList;
    }

    function EditMealItem(newMeal) {
        setMeals(meals.map(meal => {
            if (meal.name === selectedMeal.name) {
                meal.name = newMeal.name;
                meal.category = newMeal.category;
                meal.price = newMeal.price;
                meal.image = newMeal.image;
                meal.grams = newMeal.grams;
                // cookies.set(meal.id, meal.count.toString(), {path: '/'});
            }
            return meal;
        }))
    }

    function DeleteMenuItem(name) {
        meals.forEach((item, index) => {
            if (item.name === name) {
                console.log(index);
                meals.splice(index, index);
                fetch("http://" + host + "/actions-with-meals/delete-meal.php", {
                    method: 'POST', body: JSON.stringify({name: name})
                }).then(response => response.text())
                    .then(response => {
                        console.log(response)

                    });
            }
            return null;
        })
    }

    function DeleteEventItem(id) {
        eventsList.forEach((item, index) => {
            if (item.id === id) {
                console.log(index);
                eventsList.splice(index, index);
                fetch("http://" + host + "/actions-with-events/delete-event.php", {
                    method: 'POST', body: JSON.stringify({id: id})
                }).then(response => response.text())
                    .then(response => {
                        console.log(response)

                    });
            }
            return null;
        })
    }

    function DeleteBigCategoryItem(id) {
        // eventsList.forEach((item, index) => {
        //     if (item.id === id) {
        //         console.log(index);
        //         delete this.state.eventsList[index];
        //         fetch("http://" + host + "/actions-with-events/delete-event.php", {
        //             method: 'POST', body: JSON.stringify({id: id})
        //         }).then(response => response.text())
        //             .then(response => {
        //                 console.log(response)
        //
        //             });
        //     }
        //     return null;
        // })
    }

    function ChangeSelectedMeal(meal) {
        console.log(meal)
        setSelectedMeals(meal);
        localStorage.setItem('selectedMeal', JSON.stringify(meal))
    }

    function ChangeSelectedEvent(event) {
        console.log(event)
        setSelectedEvent(event);
        localStorage.setItem('selectedEvent', JSON.stringify(event))
    }

    function ChangeSelectedBigCategory(bigCategory) {
        console.log(bigCategory)
        setSelectedBigCategory(bigCategory);
        localStorage.setItem('selectedBigCategory', JSON.stringify(bigCategory))
    }


    let routesForRender = [], linksForRender = [];
    switch (cookies.get('role')) {
        case "user":
            routesForRender = userRoutes;
            linksForRender = userLinks;
            break;
        case "admin":
            routesForRender = adminRoutes;
            linksForRender = adminLinks;
            break;
        case "cooker":
            routesForRender = cookerRoutes;
            linksForRender = cookerLinks;
            break;
        default:
            routesForRender = guestRoutes;
            linksForRender = guestLinks;
            break;
    }

    return (<BrowserRouter>
        <div className="App">
            <Title name="Приложение для бара-ресторана"/>
            <NavBar links={linksForRender}/>
            {routesForRender}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Сообщение системы!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Заказ номер {orderNumForModal} готов! Пожалуйста подойдите к стойке и заберите свой заказ.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="none" className={"gradient"} onClick={handleClose}>Хорошо</Button>
                </Modal.Footer>
            </Modal>
        </div>
    </BrowserRouter>);
}

export default App;
