import * as React from 'react'
import {Button, Container, Form, FormControl, Jumbotron, Nav, Navbar} from 'react-bootstrap'
import Login from "./login";
import PageState from '../utils/page-state'
import SignUp from "./signUp";
import Home from "./home";
import NewProduct from "./product/sell";
import Product, {basicProduct, ProductProps} from "./product/product";
import UserContext from '../context/user-context'
import ProductContext, {myProduct, ProductInfo} from '../context/product-context'
import Profile from "./profile";
import SearchResult from "./present/search-book";
import Want from "./product/want";
import {getUnread} from "../API";
import {Badge} from "antd";
import MsgPage from "./message/msg-page";
import OrderPage from "./order-page";

export interface Props {
    isLogin: boolean

}

// the state of the page
export interface State {
    isLogin: boolean,
    pageState: PageState,
    userName: string
    product: ProductProps,
    curProduct: ProductInfo,
    searchValue: string,
    mainContent: JSX.Element
    unreadNum: number,
    ot: string
}

class Page extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isLogin: props.isLogin,
            pageState: PageState.Login,
            userName: '',
            product: basicProduct,
            curProduct: myProduct,
            searchValue: '',
            mainContent: <></>,
            unreadNum: 0,
            ot: ''
        };
    }

    componentDidMount(): void {
        setInterval(async () => {
            if (this.state.isLogin){
                let num = await getUnread(this.state.userName);
                this.setUnreadNum(num)
            }
        }, 5000);
    }

    componentWillUnmount(): void {
    }

    // Share state: User Name
    handelUserInform = (name: string): void => {
        this.setState((state) => ({
            userName: name,
            isLogin: true
        }))
    };

    handelOt = (ot: string): void => {
        this.setState((state) => ({
            ot: ot
        }))
    };

    setUnreadNum = (num: number): void => {
        this.setState((state) => ({
            unreadNum: num
        }))
    };

    handleSearchValue = (book: string): void => {
        this.setState((state) => ({
            searchValue: book
        }))
    }

    ExitLogin = (): void => {
        this.setState((state) => ({
            isLogin: false
        }))
    }

    handlePageJump = (s: PageState, ot=''): void => {
        this.handelOt(ot);
        this.setState((state) => ({
            pageState: s
        }))
    }

    handleProductUpdate = (s: ProductInfo): void => {
        console.log(s);
        this.setState((state) => ({
            curProduct: {
                img_src: s.img_src,
                book_name: s.book_name,
                book_class: s.book_class,
                original_price: s.original_price,
                current_price: s.current_price,
                description: s.description,
                seller: s.seller,
                timestamp: s.timestamp
            }
        }))
    }


    // top level handler
    handleProductRequest = (s: ProductProps): void => {
        this.setState((state) => ({
            // TODO delete the deeper props
            product: s,

            // TODO use Context fully substitute
            curProduct: {
                img_src: s.img_src,
                book_name: s.book_name,
                book_class: s.book_class,
                original_price: s.original_price,
                current_price: s.current_price,
                description: s.description,
                seller: s.seller,
                timestamp: s.timestamp,
                handleUpdate: this.handleProductUpdate
            }
        }))
    }

    handleSearch = (): void => {
        this.handlePageJump(PageState.SearchResult);
    }

    render(): React.ReactNode {

        let mainContent = this.state.mainContent;
        let unreadMsg = <></>;
        if (this.state.isLogin) {
            unreadMsg = <Badge count={this.state.unreadNum}/>;
        }

        switch (this.state.pageState) {
            case PageState.Login:
                mainContent = <Login emitUserName={this.handelUserInform} emitPageJump={this.handlePageJump}/>;
                break;
            case PageState.SignUp:
                mainContent = <SignUp emitPageJump={this.handlePageJump}/>;
                break;
            case PageState.Home:
                mainContent = <Home userName={this.state.userName} jump={this.handlePageJump}
                                    handleProductRequest={this.handleProductRequest}/>;
                break;
            case PageState.New_Product:
                mainContent = <NewProduct username={this.state.userName} jump={this.handlePageJump}
                                          handleProductRequest={this.handleProductRequest}/>;
                break;
            case PageState.Product:
                mainContent = <Product
                    jump={this.handlePageJump}
                    handleProductRequest={this.handleProductUpdate}
                />;
                break;
            case PageState.Want:
                mainContent = <Want username={this.state.userName} jump={this.handlePageJump}
                                    handleProductRequest={this.handleProductRequest}/>;
                break;
            case PageState.Profile:
                mainContent = <Profile jump={this.handlePageJump} handleProductRequest={this.handleProductRequest}/>
                break;
            case PageState.SearchResult:
                console.log('jump search')
                mainContent = <SearchResult username={this.state.userName}
                              bookname={this.state.searchValue}
                              jump={this.handlePageJump}
                              handleProductRequest={this.handleProductRequest}/>;
                break;
            case PageState.Message:
                mainContent = <MsgPage username={this.state.userName}/>;
                break;
            case PageState.Order:
                mainContent = <OrderPage jump={this.handlePageJump}
                                         handleProductRequest={this.handleProductRequest}
                                         orderTimeStamp={this.state.ot}/>
            default:
                break;
        }

        return (

            <div style={{display: 'flex', flexDirection: 'column'}}>
                <UserContext.Provider value={{userName: this.state.userName, isLogin: this.state.isLogin}}>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#home" onClick={() => this.handlePageJump(PageState.Home)}>ZJU
                            Bookstore</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">

                                {
                                    // show LOGIN and SIGNUP only when the user has logged in
                                    !this.state.isLogin &&
                                    <>
                                        <Nav.Link href="#login" onClick={() => this.handlePageJump(PageState.Login)}>
                                            登录
                                        </Nav.Link>
                                        <Nav.Link href="#signup" onClick={() => this.handlePageJump(PageState.SignUp)}>
                                            注册
                                        </Nav.Link>
                                    </>


                                }
                                {
                                    this.state.isLogin &&
                                    <>
                                        <Nav.Link href="#new"
                                                  onClick={() => this.handlePageJump(PageState.New_Product)}>
                                            发布商品
                                        </Nav.Link>
                                        <Nav.Link href="#want"
                                                  onClick={() => this.handlePageJump(PageState.Want)}>
                                            发布愿望
                                        </Nav.Link>
                                        <Nav.Link href="#msg" onClick={() => this.handlePageJump(PageState.Message)}>
                                            <Badge count={this.state.unreadNum}>
                                            消息
                                            </Badge>
                                        </Nav.Link>
                                        <Nav.Link href="#profile"
                                                  onClick={() => this.handlePageJump(PageState.Profile)}>
                                            个人中心
                                        </Nav.Link>
                                        <Nav.Link href="#profile" onClick={() => {
                                            this.ExitLogin();
                                            this.handlePageJump(PageState.Login)
                                        }}>
                                            退出登录
                                        </Nav.Link>
                                    </>
                                }

                            </Nav>
                            <Form inline>
                                <FormControl
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-2"
                                    value={this.state.searchValue}
                                    onChange={(e: any) => {
                                        this.handleSearchValue(e.target.value)
                                    }}/>
                                <Button variant="outline-success" onClick={this.handleSearch}>搜索</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>

                    <ProductContext.Provider value={this.state.curProduct}>
                        {mainContent}
                    </ProductContext.Provider>

                    <div style={{paddingTop: '8%'}}>
                        <Jumbotron fluid>

                            <Container>
                                <h3>ZJU 旧书交易平台</h3>

                                <p>
                                    在这里交换知识
                                </p>
                                <hr></hr>
                                &copy; {new Date().getFullYear()} Copyright
                            </Container>
                        </Jumbotron>
                    </div>
                </UserContext.Provider>
            </div>
        );
    }
}

export default Page;