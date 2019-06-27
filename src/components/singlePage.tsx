import * as React from 'react'
import {Button, Container, Form, FormControl, Jumbotron, Nav, Navbar} from 'react-bootstrap'
import Login from "./login";
import PageState from '../utils/page-state'
import SignUp from "./signUp";
import Home from "./home";
import NewProduct from "./product/sell";
import Product, {ProductProps, basicProduct} from "./product/product";
import UserContext from '../context/user-context'
import ProductContext, {myProduct, ProductInfo} from '../context/product-context'

export interface Props {
    isLogin: boolean

}

// the state of the page
export interface State {
    isLogin: boolean,
    pageState: PageState,
    userName: string
    product: ProductProps,
    curProduct: ProductInfo
}

class Page extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isLogin: props.isLogin,
            pageState: PageState.Login,
            userName: '',
            product: basicProduct,
            curProduct: myProduct
        };
    }

    // Share state: User Name
    handelUserInform = (name: string): void => {
        this.setState((state) => ({
            userName: name,
            isLogin: true
        }))
    }

    ExitLogin = (): void => {
        this.setState((state) => ({
            isLogin: false
        }))
    }

    handlePageJump = (s: PageState): void => {
        this.setState((state) => ({
            pageState: s
        }))
    }

    handleProductUpdate = (s : ProductInfo): void => {
        console.log(s);
        this.setState((state)=>({
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

    render(): React.ReactNode {

        let mainContent;

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
                                        <Nav.Link href="#msg" onClick={() => this.handlePageJump(PageState.Message)}>
                                            消息
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
                                <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                                <Button variant="outline-success">搜索</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>

                    <ProductContext.Provider value={this.state.curProduct}>
                        {mainContent}
                    </ProductContext.Provider>

                    <div style={{marginTop: '8%'}}>
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