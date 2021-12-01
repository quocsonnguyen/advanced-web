import React, { useLayoutEffect, useEffect, useState } from 'react';
import s from './Navigation.module.css'
import { Dropdown, Navbar, Nav, Container, Offcanvas } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';




function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const Navigation = (props) => {
    const [width] = useWindowSize();
    const [navExpand, setNavExpand] = useState(true)
    const navigate = useNavigate()
    let currentUser = JSON.parse(localStorage.getItem('user'))

 
    let isFalculty = false;
    let isAdmin = false
    let i = 0;
    for (i; i < currentUser.role.length; i++){
        if(currentUser.role[i]==="Role: FALCULTY"){
            isFalculty= true;
        }
        if(currentUser.role[i]==="Role: ADMIN"){
            isAdmin= true;
        }
    }
    console.log(isAdmin,isFalculty)
    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('uid')
        navigate('/login')
    }

    useEffect(() => {
        if (width <= 768) {
            setNavExpand(false)
        } else {
            setNavExpand(true)
        }
    }, [width])

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand={navExpand}>
                <Container>
                    <Navbar.Brand href="/"><b>STUDENT SOCIAL MEDIA</b></Navbar.Brand>
                    {
                        navExpand && <>
                        <Nav className="me-auto">
                            <Nav.Link href="/notifications">Thông báo</Nav.Link>
                            {isAdmin &&(<Nav.Link href="/manage">Quản lý</Nav.Link>)}
                        </Nav>
                        <Nav className={s.Navigation_name_and_avatar}>
                            <div className={s.Navigation_name}>
                                {currentUser && currentUser.name}
                            </div>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" bsPrefix="p-0" className={s.Navigation_avatar}>
                                    <img 
                                        className={s.Navigation_avatar_img}
                                        src={`http://localhost:3300/api/image/${currentUser && currentUser.image}`} alt="avatar" 
                                    />
                                </Dropdown.Toggle>

                                <Dropdown.Menu className={s.Navigation_toggle_menu}>
                                    <Dropdown.Item>
                                        Thông tin
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={logout}>
                                        Đăng xuất
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                        </>
                    }
        
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">Xin chào, {currentUser && currentUser.name}</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/notifications">Thông báo</Nav.Link>
                                <Nav.Link href="/notifications">Chỉnh sửa thông tin</Nav.Link>
                                <Nav.Link onClick={logout} href="#">Đăng xuất</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            {/* <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/"><b>STUDENT SOCIAL MEDIA</b></Navbar.Brand>

                    <Nav>

                    </Nav>


                    
                </Container>
            </Navbar> */}
        </div>
    )
};

export default Navigation;