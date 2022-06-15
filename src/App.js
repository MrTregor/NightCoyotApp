import React, {useState} from 'react'
import {BrowserRouter, Link, NavLink, Route} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Cookies from 'universal-cookie'
import Title from './components/Title'
import NavBar from './components/NavBar'
import Bucket from './pages/Meals/Basket'
import Menu from './pages/Meals/Menu'
import Main from './pages/Main'
import MenuEditor from './pages/Meals/MenuEditor'
import AddMeal from './pages/Meals/AddMeal'
import EditMeal from './pages/Meals/EditMeal'
import Login from './pages/Login'
import Register from './pages/Register'
import Cooker from './pages/Cooker'
import Events from './pages/Events/Events'
import EditEvents from './pages/Events/EditEvents'
import EventsEditor from './pages/Events/EventsEditor'
import AddEvents from './pages/Events/AddEvents'
import DrawMealCard from './components/meals/DrawMealCard'
import DrawCategory from './components/meals/DrawCategory'
import BasketItem from './components/meals/BasketItem'
import OrderCookerRow from './components/meals/OrderCookerRow'
import './resources/css/styles.min.css'
import {GetOrderedMeal} from './utility/get_db_data'
import BigCategoryEditor from './pages/big-categories/BigCategoryEditor'
import {MenuSections} from './pages/Meals/MenuSections'
import {UserProfile} from './pages/UserProfile'
import {
    checkOrderCompletion, completeOrder, createOrder, deleteBigCategory, deleteEvent, deleteMeal,
} from './utility/api_pathes'
import {Payment} from './pages/Payment'
import {Alert, Spinner} from 'react-bootstrap'
import CompleteOrderModal from './components/meals/CompleteOrderModal'

const App = ({orderFetches, bigCategoriesDB, categoriesDB, mealsDB, eventsDB, ordersDB}) => {
    if (localStorage.getItem('orderNums') !== null) {
        JSON.parse(localStorage.getItem('orderNums')).forEach((num, index) => {
            if (num !== null && orderFetches && orderFetches.indexOf(num) === -1) {
                console.log('Checking order ' + num)
                console.log(orderFetches.indexOf(num))
                orderFetches.push(num)
                CheckOrderComplete(num)
            }
        })
    }
    const cookies = new Cookies()
    let categories = categoriesDB
    const [bigCategories, setBigCategories] = useState(bigCategoriesDB)
    const [eventsList, setEventsList] = React.useState(eventsDB)
    const [orders, setOrders] = React.useState(ordersDB)
    const [meals, setMeals] = React.useState(mealsDB)
    const [orderCompleteContentModal, setOrderCompleteContentModal] = useState(<div/>)
    const [selectedMeal, setSelectedMeals] = React.useState(() => {
        if (localStorage.getItem('selectedMeal') !== null) {
            return JSON.parse(localStorage.getItem('selectedMeal'))
        } else {
            return {id: 'id', name: 'name', category: 'category', grams: 'grams', price: 'price', image: 'image'}
        }
    })
    const [selectedEvent, setSelectedEvent] = React.useState(() => {
        if (localStorage.getItem('selectedEvent') != null) {
            return JSON.parse(localStorage.getItem('selectedEvent'))
        } else {
            return {id: 'id', title: 'title', date: 'date', image: 'image'}
        }
    })
    const [selectedBigCategory, setSelectedBigCategory] = React.useState(() => {
        if (localStorage.getItem('selectedBigCategory') != null) {
            return JSON.parse(localStorage.getItem('selectedBigCategory'))
        } else {
            return {id: 'id', name: 'name'}
        }
    })
    let menuRows = [], fastLinks = [], basketRows = [], basketMeals = JSON.parse(localStorage.getItem('basketItems'))
    const [sectionRows, setSectionRows] = useState([])
    let sumMoney = 0, id = 0
    let routes
    UpdateMeals();

    function UpdateMeals() {
        bigCategories.map(bigCategory => {
            fastLinks[bigCategory.big_category_id] = []
            menuRows[bigCategory.big_category_id] = []
            categories.forEach((category, index) => { // Для каждой категории вывожу своё блюдо
                if (category.big_category_id === bigCategory.big_category_id) {
                    console.log(category)
                    fastLinks[bigCategory.big_category_id].push(<a key={index} className="text-nowrap fastLinkMenu"
                                                                   href={'#' + category.name}>{category.name}</a>)
                    menuRows[bigCategory.big_category_id].push(<DrawCategory key={category.name + 'FastLink'}
                                                                             name={category.name}/>) // Заголовок категории
                    id++
                    let categoryMenu = []
                    meals.forEach(menuItem => {
                        if (basketMeals != null) {
                            basketMeals.forEach((basketItem, index) => {
                                if (basketItem !== null && basketItem.meal_id === menuItem.meal_id) {
                                    menuItem.checked = true
                                    menuItem.count = basketItem.count
                                }
                            })
                        }
                        if (menuItem.category.name === category.name) { // Если блюдо в данной категории, то добавлям в отрисовку
                            if (menuItem.checked) { // Если блюдо отвечено то увеличиваем сумму заказа
                                sumMoney += menuItem.price * menuItem.count
                            }
                            categoryMenu.push(<DrawMealCard key={id} anchorId={menuItem.category.name}
                                                            menuItem={menuItem}
                                                            onPressed={PressMealItem}/>)
                            id++
                        }
                    })
                    // Вывод на отрисовку блюд категории
                    menuRows[bigCategory.big_category_id].push(<div key={id} className="row">
                        {categoryMenu}
                    </div>)
                    id++
                }
            })
        })
        routes = {
            bucket: <Route path={'/bucket'} key={'br1'}
                           render={() => <Bucket basketRows={basketRows} sumMoney={sumMoney}/>}/>,
            cooker: <Route path={'/cooker'} key={'cr1'} render={() => <Cooker ordersRows={ordersRows}/>}/>,
            menu: <Route path={'/menu'} key={'mr1'}
                         render={() => <Menu menuRows={menuRows} sum={sumMoney} fastLinks={fastLinks}/>}/>,
            eventAdd: <Route path={'/add_event'} key={'ear1'} render={() => <AddEvents events={eventsList}/>}/>,
            eventEdit: <Route path={'/event_edit'} key={'eer1'}
                              render={() => <EditEvents events={eventsList} selectedItem={selectedEvent}
                                                        editGlobalEvents={EditEventItem}/>}/>,
            events: <Route path={'/events'} key={'er1'} render={() => <Events events={eventsList}/>}/>,
            eventsEditor: <Route path={'/events_editor'} key={'eer2'}
                                 render={() => <EventsEditor events={eventsList} deleteItem={DeleteEventItem}
                                                             changeSelectedItem={ChangeSelectedEvent}/>}/>,
            menuEditor: <Route path={'/menu_editor'} key={'mer1'}
                               render={() => <MenuEditor menu={meals} categories={categories}
                                                         deleteItem={DeleteMenuItem} UpdateMeals={UpdateMeals}
                                                         changeSelectedItem={ChangeSelectedMeal}/>}/>,
            menuAdd: <Route path={'/menu_add'} key={'mar1'}
                            render={() => <AddMeal menu={meals} categories={categories} UpdateMeals={UpdateMeals}/>}/>,
            menuEdit: <Route path={'/menu_edit'} key={'mer2'}
                             render={() => <EditMeal menu={meals} categories={categories}
                                                     selectedItem={selectedMeal}
                                                     editGlobalMeals={EditMealItem}/>}/>,
            sections: <Route path={'/sections'} key={'sr2'}
                             render={() => <MenuSections sectionRows={sectionRows}/>}/>,
            bigCategoryEditor: <Route path={'/big_category_editor'} key={'bcer1'}
                                      render={() => <BigCategoryEditor deleteItem={DeleteBigCategoryItem}
                                                                       addNewBigCategory={AddNewBigCategory}
                                                                       bigCategoryColumns={bigCategoryColumns}/>}/>,
            payment: <Route path={'/payment'} key={'payr1'}
                            render={() => <Payment takeOrder={SendOrder} sumMoney={sumMoney}/>}/>,
            userProfile: <Route path={'/user_profile'} key={'upr1'}
                                render={() => <UserProfile meals={meals}/>}/>,
            main: <Route path={'/main'} key={'mr2'} component={Main}/>,
            login: <Route key={'lr1'} path={'/login'} component={Login}/>,
            register: <Route path={'/register'} key={'rr1'} component={Register}/>,
        }
    }

    const [bigCategoryColumns, setBigCategoryColumns] = useState(() => {
        console.log('Big category constructor:')
        console.log(bigCategories)
        return bigCategories.map(bigCategory => {
            sectionRows.push(<Button key={'sr' + bigCategory.big_category_id} variant={'dark'} className={'m-2 p-3'}
                                     onClick={() => {
                                         localStorage.setItem('selectedSection', JSON.stringify(bigCategory))
                                     }}>
                <NavLink to="/menu">
                    <h1>{bigCategory.name}</h1>
                </NavLink>
            </Button>)
            return {
                [bigCategory.big_category_id]: {
                    name: bigCategory.name, items: categories.map((category, index) => {
                        if (category.big_category_id === bigCategory.big_category_id) {
                            category.id = category.category
                            return category
                        }
                    }),
                },
            }
        }).reduce((newObj, item) => {
            newObj[Object.keys(item)[0]] = item[Object.keys(item)[0]]
            return newObj
        }, {})
    })
    meals.forEach((menuItem, index) => {
        if (menuItem.checked) { // Если блюдо отвечено то увеличиваем сумму заказа
            basketRows.push(<BasketItem key={index} menuItem={menuItem} onPressed={PressMealItem}/>)
        }
    })
    let ordersRows = []
    CookerOrderConstructor()

    let links = {
        bucket: {link: 'bucket', label: 'Корзина'},
        cooker: {link: 'cooker', label: 'Список заказов'},
        sections: {link: 'sections', label: 'Меню'},
        events: {link: 'events', label: 'Мероприятия'},
        eventsEditor: {link: 'events_editor', label: 'Редактор мероприятий'},
        main: {link: 'main', label: 'Главная'},
        login: {link: 'login', label: 'Войти'},
        register: {link: 'register', label: 'Зарегистрироваться'},
        menuEditor: {link: 'menu_editor', label: 'Редактор меню'},
        bigCategoryEditor: {link: 'big_category_editor', label: 'Редактор разделов меню'},
        userProfile: {link: 'user_profile', label: 'Профиль'},
    }
    const userRoutes = [routes['bucket'], routes['main'], routes['menu'], routes['events'], routes['login'], routes['register'], routes['sections'], routes['userProfile'], routes['payment']]
    const userLinks = [links['main'], links['sections'], links['bucket'], links['events'], links['userProfile']]
    const adminRoutes = [routes['bucket'], routes['main'], routes['menu'], routes['login'], routes['register'], routes['events'], routes['menuEditor'], routes['menuEdit'], routes['menuAdd'], routes['eventEdit'], routes['eventAdd'], routes['eventsEditor'], routes['bigCategoryEdit'], routes['bigCategoryAdd'], routes['bigCategoryEditor'], routes['sections'], routes['payment']]
    const adminLinks = [links['main'], links['sections'], links['bucket'], links['events'],/*login["link"], register["link"],*/
        links['menuEditor'], links['eventsEditor'], links['bigCategoryEditor']]
    const guestRoutes = [routes['bucket'], routes['main'], routes['menu'], routes['events'], routes['login'], routes['register'], routes['sections'], routes['payment']]
    const guestLinks = [links['main'], links['sections'], links['bucket'], links['events'], links['login'], links['register']]
    const cookerRoutes = [routes['main'], routes['cooker'], routes['login']]
    const cookerLinks = [links['main'], links['cooker']]

    function PressMealItem(id, type) {
        let newBasket = []
        if (localStorage.getItem('basketItems') !== null) {
            newBasket = JSON.parse(localStorage.getItem('basketItems'))
        }
        switch (type) {
            case 'add':
                setMeals(meals.map(meal => {
                    if ((meal.checked === undefined || meal.checked === false) && meal.meal_id === id) {
                        meal.checked = true
                        meal.count = 1
                        newBasket.push({meal_id: meal.meal_id, count: meal.count})
                        console.log('Add')
                    }
                    return meal
                }))
                break
            case 'plus':
                setMeals(meals.map(meal => {
                    if (meal.meal_id === id) {
                        meal.count++
                        newBasket.map(basketMeal => {
                            if (basketMeal.meal_id === id) {
                                basketMeal.count++
                            }
                            return basketMeal
                        })
                    }
                    return meal
                }))
                break
            case 'minus':
                setMeals(meals.map(meal => {
                    if (meal.meal_id === id) {
                        meal.count -= 1
                        newBasket.forEach((basketMeal, index) => {
                            if (basketMeal.meal_id === id) {
                                newBasket[index].count--
                                if (newBasket[index].count < 1) {
                                    newBasket.splice(index, 1)
                                }
                            }
                            return basketMeal
                        })
                        if (meal.count < 1) {
                            meal.checked = false
                            console.log(meal)
                        }
                    }
                    return meal
                }))
                break
            default:
                break
        }
        localStorage.setItem('basketItems', JSON.stringify(newBasket))
    }

    const AddNewBigCategory = (newBigCategory) => {
        bigCategories.push(newBigCategory)
        console.log(bigCategories)
    }

    function CookerOrderConstructor() {
        if (cookies.get('role') === 'cooker') {
            console.log(orders)
            orders.forEach((value, index) => {
                if (value !== undefined) {
                    meals.forEach(meal => {
                        if (value.meal_id === meal.meal_id) {
                            ordersRows.push(<OrderCookerRow key={'c' + index} index={index} curMeal={meal}
                                                            CompleteOrder={CompleteOrder}
                                                            value={value}/>)
                        }
                    })
                }
            })
        }
    }

    function CheckOrderComplete(num) {
        fetch(checkOrderCompletion, {
            method: 'POST', body: JSON.stringify({orderNum: num}),
        }).then(resp => resp.text()).then(resp => {
            console.log(resp)
            let orderNum = JSON.parse(resp).orderNum
            let localValues = JSON.parse(localStorage.getItem('orderNums'))
            let index = -1
            localValues.forEach((val, localIndex) => {
                if (val == orderNum) {
                    index = localIndex
                }
            })
            localValues.splice(index, 1)
            localStorage.setItem('orderNums', JSON.stringify(localValues))
            if (!JSON.parse(localStorage.getItem('completedOrder'))) {
                localStorage.setItem('completedOrder', JSON.stringify([orderNum]))
            } else {
                let localCompleteOrderNum = JSON.parse(localStorage.getItem('completedOrder'))
                localCompleteOrderNum.push(orderNum)
                localStorage.setItem('completedOrder', JSON.stringify(localCompleteOrderNum))
            }
            console.log(orderCompleteContentModal)
            let localCompleteOrderNum = JSON.parse(localStorage.getItem('completedOrder'))
            console.log(localCompleteOrderNum)
            setOrderCompleteContentModal(localCompleteOrderNum.map(orderNum => {
                return <CompleteOrderModal key={"com" + orderNum} orderNum={orderNum}/>
            }))
            console.log(index)
            // handleShow()
        })
    }

    function SendOrder() {
        handleShowPayment()
        if (localStorage.getItem('basketItems') !== '[]') {
            let orderedMeals = []
            setMeals(meals.map(meal => {
                if (meal.checked) {
                    orderedMeals.push(meal)
                    meal.checked = false
                    // meal.count = 0;
                    localStorage.setItem('basketItems', '[]')
                }
                return meal
            }))
            console.log(orderedMeals)
            let userId = cookies.get('userId') === undefined ? null : cookies.get('userId')
            let sendedOrder = fetch(createOrder, {
                method: 'POST', body: JSON.stringify({order: orderedMeals, userId: userId}),
            }).then(response => response.text()).then(response => {
                console.log(response)
                let orderNum = JSON.parse(response).orderNum
                if (localStorage.getItem('orderNums') !== null) {
                    let localValues = JSON.parse(localStorage.getItem('orderNums'))
                    localValues.push(orderNum)
                    localStorage.setItem('orderNums', JSON.stringify(localValues))
                } else {
                    localStorage.setItem('orderNums', JSON.stringify([orderNum]))
                }
                if (orderNum !== null && orderFetches && orderFetches.indexOf(orderNum) === -1) {
                    orderFetches.push(orderNum)
                    CheckOrderComplete(orderNum)
                    setPaymentModalContent(<Alert variant="success">
                        <Alert.Heading>Оплата успешно выполнена!</Alert.Heading>
                        <hr/>
                        <p className="mb-0">
                            Номер вашего заказа: {orderNum}
                        </p>
                    </Alert>)
                }
            })
            console.log('Order on sending')
        }
    }

    function CompleteOrder(orderId) {
        fetch(completeOrder, {
            method: 'POST', body: JSON.stringify({orderId: orderId}),
        }).then(response => response.text()).then(response => {
            JSON.parse(response)
            GetOrderedMeal().then(orders => {
                setOrders(orders)
            })
            CookerOrderConstructor()
        })
        console.log(orders)
        setOrders(orders.map(order => {
            if (order !== undefined && order.order_id !== orderId) {
                console.log(order)
                return order
            }
        }))
        console.log(orders)
    }

    function EditEventItem(newEvent) {
        setEventsList(eventsList.map(eventItem => {
            console.log(eventItem)
            if (eventItem.id === newEvent.id) {
                console.log(newEvent.id + ' ' + eventItem.id)
                eventItem.title = newEvent.name
                eventItem.date = newEvent.date
                eventItem.image = newEvent.image
            }
            return eventItem
        }))
        return eventsList
    }

    function EditMealItem(newMeal) {
        setMeals(meals.map(meal => {
            if (meal.name === selectedMeal.name) {
                meal.name = newMeal.name
                meal.category = newMeal.category
                meal.price = newMeal.price
                meal.image = newMeal.image
                meal.grams = newMeal.grams
                // cookies.set(meal.id, meal.count.toString(), {path: '/'});
            }
            return meal
        }))
    }

    function DeleteMenuItem(name) {
        meals.forEach((item, index) => {
            if (item.name === name) {
                console.log(index)
                meals.splice(index, 1)
                let categoryEmpty = true
                meals.forEach((itemMeal) => {
                    if (itemMeal.category.name === item.category.name) {
                        categoryEmpty = false
                    }
                })
                if (categoryEmpty) {
                    window.location = "/menu_editor"
                }

                fetch(deleteMeal, {
                    method: 'POST', body: JSON.stringify({name: name}),
                }).then(response => response.text()).then(response => {
                    console.log(response)
                })

            }

        })
    }

    function DeleteEventItem(id) {
        eventsList.forEach((item, index) => {
            if (item.id === id) {
                console.log(index)
                eventsList.splice(index, 1)
                fetch(deleteEvent, {
                    method: 'POST', body: JSON.stringify({id: id}),
                }).then(response => response.text()).then(response => {
                    console.log(response)
                })
            }

        })
    }

    function DeleteBigCategoryItem(id) {
        console.log(bigCategories)
        bigCategories.forEach((item, index) => {
            console.log(item.big_category_id + ' == ' + id + ': ')
            if (item.big_category_id === id) {
                bigCategories.splice(index, 1)
                console.log(bigCategories)
                console.log(id)
                UpdateMeals()
                fetch(deleteBigCategory, {
                    method: 'POST', body: JSON.stringify({id: id}),
                }).then(response => response.text()).then(response => {
                    console.log(response)
                })
            }
        })
    }

    function ChangeSelectedMeal(meal) {
        console.log(meal)
        setSelectedMeals(meal)
        localStorage.setItem('selectedMeal', JSON.stringify(meal))
    }

    function ChangeSelectedEvent(event) {
        console.log(event)
        setSelectedEvent(event)
        localStorage.setItem('selectedEvent', JSON.stringify(event))
    }

    function ChangeSelectedBigCategory(bigCategory) {
        console.log(bigCategory)
        setSelectedBigCategory(bigCategory)
        localStorage.setItem('selectedBigCategory', JSON.stringify(bigCategory))
    }

    let routesForRender, linksForRender
    switch (cookies.get('role')) {
        case 'user':
            routesForRender = userRoutes
            linksForRender = userLinks
            break
        case 'admin':
            routesForRender = adminRoutes
            linksForRender = adminLinks
            break
        case 'cooker':
            routesForRender = cookerRoutes
            linksForRender = cookerLinks
            break
        default:
            routesForRender = guestRoutes
            linksForRender = guestLinks
            break
    }
    const [showPayment, setShowPayment] = useState(false)
    const [paymentModalContent, setPaymentModalContent] = useState(<Spinner animation="border"/>)
    const handleClosePayment = () => setShowPayment(false)
    const handleShowPayment = () => setShowPayment(true)
    return (<BrowserRouter>
        <div className="App">
            <Title name="Приложение для бара-ресторана"/>
            <NavBar links={linksForRender}/>
            {routesForRender}

            {orderCompleteContentModal}

            <Modal show={showPayment} onHide={handleClosePayment}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Проверка оплаты
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {paymentModalContent}

                </Modal.Body>
                <Modal.Footer>
                    <Link to="main" className="menuOpen"><Button variant="none" className={'gradient'}
                                                                 onClick={handleClosePayment}>Хорошо</Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    </BrowserRouter>)
}
export default App
