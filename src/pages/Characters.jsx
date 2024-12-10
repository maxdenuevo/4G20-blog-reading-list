import React, { useContext, useEffect } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { ItemCard } from '../components/Card';

const Characters = () => {
  const { characters, loading, error, fetchCharacters } = useContext(AppContext);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]); 

  if (error) {
    return (
      <Alert variant="danger">
        Error loading characters: {error}
      </Alert>
    );
  }

  if (loading && characters.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '200px' }}>
        <Spinner animation="border" role="status" />
        <span className="mt-2">Loading characters...</span>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4">Star Wars Characters</h2>
      <Row>
        {characters.map((character) => (
          <Col key={character.uid} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <ItemCard item={character} type="character" />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Characters;