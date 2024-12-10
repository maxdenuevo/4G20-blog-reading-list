import React, { useContext, useState } from 'react';
import { Navbar, Container, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { SearchResults } from './SearchResults';

export const Navigation = () => {
  const { favorites, searchItems } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchItems(query);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Star Wars Databank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/characters">Characters</Nav.Link>
            <Nav.Link as={Link} to="/vehicles">Vehicles</Nav.Link>
            <Nav.Link as={Link} to="/planets">Planets</Nav.Link>
            <Nav.Link as={Link} to="/favorites">
              Favorites ({favorites.length})
            </Nav.Link>
          </Nav>
          <div className="position-relative">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                value={searchQuery}
                onChange={handleSearch}
              />
            </Form>
            <SearchResults query={searchQuery} />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
