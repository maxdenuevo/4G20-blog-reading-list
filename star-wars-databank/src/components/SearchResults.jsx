import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export const SearchResults = ({ query }) => {
  const { searchResults } = useContext(AppContext);
  const navigate = useNavigate();

  if (!query || searchResults.length === 0) return null;

  return (
    <ListGroup className="position-absolute w-100 mt-1 shadow-sm">
      {searchResults.map((item) => (
        <ListGroup.Item
          key={item.uid}
          action
          onClick={() => navigate(`/${item.type}/${item.uid}`)}
          className="d-flex justify-content-between align-items-center"
        >
          <span>{item.name}</span>
          <small className="text-muted text-capitalize">{item.type}</small>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
