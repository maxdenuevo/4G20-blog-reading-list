import React, { useContext, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { ItemCard } from '../components/Card';

const Characters = () => {
  const { characters, loading, fetchCharacters } = useContext(AppContext);

  useEffect(() => {
    if (characters.length === 0) {
      fetchCharacters();
    }
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4">Star Wars Characters</h2>
      <Row>
        {characters.map((character) => (
          <Col key={character.uid} xs={12} sm={6} md={4} lg={3}>
            <ItemCard item={character} type="character" />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Characters;
