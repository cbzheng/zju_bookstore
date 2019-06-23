import * as React from 'react'
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import Login from "./login";
import PageState from '../utils/page-state'
import SignUp from "./signUp";
import Home from "./home";

export interface Props {
    isLogin: boolean

}

// the state of the page
export interface State {
    isLogin: boolean,
    pageState: PageState
}

class Page extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isLogin: props.isLogin,
            pageState: PageState.Login
        };
    }


    handlePageJump = (s: PageState): void => {
        this.setState((state) => ({
            pageState: s
        }))
    }

    render(): React.ReactNode {

        let mainContent;

        switch (this.state.pageState) {
            case PageState.Login:
                mainContent = <Login/>;
                break;
            case PageState.SignUp:
                mainContent = <SignUp/>;
                break;
            case PageState.Home:
                mainContent = <Home/>;
                break;
            default:
                break;
        }

        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
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

                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                            <Button variant="outline-success">搜索</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>

                <div style={{paddingLeft: '15%', paddingRight: '15%', margin: '5%'}}>
                    {mainContent}
                </div>
            </div>
        )
    }
}

export default Page;