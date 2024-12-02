import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom';
import { useContext } from "react";
import { ContextoUsuario } from "../../App";

export default function Menu(props) {
    const {usuario, setUsuario} = useContext(ContextoUsuario);
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#" as={Link} to="/">Menu</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#" as={Link} to="/mensagem">Mensagens</NavDropdown.Item>
                            <NavDropdown.Item href="#" as={Link} to="/usuario">Usuários</NavDropdown.Item>

                        </NavDropdown>
                        <Nav.Link href="#home">Sobre</Nav.Link>
                        <Nav.Link
                            onClick={()=>{
                                setUsuario({
                                    "usuario":"",
                                    "logado":false
                                })}
                            }>Sair
                        </Nav.Link>
                        <Nav.Link>Usuario logado: {usuario.usuario}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}