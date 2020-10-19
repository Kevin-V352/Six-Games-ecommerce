import React, { useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../../assets/logofull.svg';
import SearchBar from '../SearchBar/SearchBar.jsx';
import store from '../../redux/store/store.js'
import { useState } from 'react';
console.log(store.getState());

function NavBar( props ){

	const [cartCounter, setCartCounter] = useState(store.getState().cartCounter);
	
	useEffect(() => {
		
		store.subscribe(() => { 
			setCartCounter(store.getState().cartCounter) 
		});
		
    }, []);

	return (
		<Navbar collapseOnSelect expand="lg" fixed="top" variant="dark" className="navbar-main">
			<Navbar.Brand>
				<Logo className="navbar-logo"/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="navbarCollapse">
				<FontAwesomeIcon icon={ faBars } className="navbar-open-menu"/>
				<FontAwesomeIcon icon={ faTimes } className="navbar-close-menu"/>
			</Navbar.Toggle>
			<Navbar.Collapse id="navbarCollapse">
				<Nav className="navbar-nav-left">
					<Nav.Link href="/products">
						<p className="navbar-text navbar-text-outline">Tienda</p>
					</Nav.Link>
					<div className="navbar-separator"></div>
					<Nav.Link href="/admin">
						<p className="navbar-text navbar-text-outline">Administración</p>
					</Nav.Link>
				</Nav>
				<Nav className="navbar-nav-right">
					<Nav.Link className="navbar-nav-cart" href="/cart">
					<FontAwesomeIcon icon={ faShoppingCart }/> <p className="navbar-text">Carrito {cartCounter}</p>
					</Nav.Link>
					<Nav.Link className="navbar-nav-user" href="/userCreate">
						<FontAwesomeIcon icon={ faUser }/> <p className="navbar-text">Creá tu cuenta</p>
					</Nav.Link>
					<SearchBar/>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
