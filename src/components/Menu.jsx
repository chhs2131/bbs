import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Route, Routes, useNavigate} from "react-router-dom";
import About from "./About";
import Cart from "./book/Cart";
import Books from "./book/Books";
import Login from "./user/Login";
import Locals from "./local/Locals";
import Favorite from "./local/Favorite";
import Join from "./user/Join";
import MyPage from "./user/Mypage";
import ListPage from "./bbs/ListPage";
import InsertPage from "./bbs/InsertPage";
import ReadPage from "./bbs/ReadPage";
import UpdatePage from "./bbs/UpdatePage";

const Menu = () => {
    const navi = useNavigate();
    const onLogout = (e) => {
        e.preventDefault();
        if(window.confirm("정말로 로그아웃하실건가요?")) {
            sessionStorage.clear();
            navi('/');
        }
    }

    return (
        <>
            <Navbar expand="lg" bg="primary" data-bs-theme="dark" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{maxHeight: '100px'}}
                            navbarScroll
                        >
                            <Nav.Link href="/books">도서검색</Nav.Link>
                            <Nav.Link href="/locals">장소검색</Nav.Link>

                            {sessionStorage.getItem('uid') &&
                                <>
                                    <Nav.Link href="/cart">장바구니</Nav.Link>
                                    <Nav.Link href="/favorite">즐겨찾기</Nav.Link>
                                </>
                            }
                            <Nav.Link href="/bbs">게시판</Nav.Link>

                        </Nav>

                        {sessionStorage.getItem('email') ?
                            <Nav>
                                <Nav.Link href="/mypage" >{sessionStorage.getItem('email')}</Nav.Link>
                                <Nav.Link href="/login" onClick={onLogout}>로그아웃</Nav.Link>
                            </Nav>
                            :
                            <Nav>
                                <Nav.Link href="/login">로그인</Nav.Link>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<About/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/books" element={<Books/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/locals" element={<Locals/>}/>
                <Route path="/favorite" element={<Favorite/>}/>
                <Route path="/join" element={<Join/>}/>
                <Route path="/mypage" element={<MyPage/>}/>
                <Route path="/bbs" element={<ListPage/>}/>
                <Route path="/bbs/insert" element={<InsertPage/>}/>
                <Route path="/bbs/read/:id" element={<ReadPage/>}/>  {/* :id에 해당하는것이 userParams 이다. */}
                <Route path="/bbs/update/:id" element={<UpdatePage/>}/>  {/* :id에 해당하는것이 userParams 이다. */}
            </Routes>
        </>
    );
};

export default Menu;