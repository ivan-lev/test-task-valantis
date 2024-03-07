import './App.css';

import { useEffect, useState } from 'react';

import CardList from '../CardList/CardList';

import { api } from '../../utils/api';

export default function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.getCards('filter', { price: 17500.0 }).then(response => {
      console.log(response.result);
      setList(response.result);
    });
  }, []);

  return (
    <>
      <h1>List</h1>
      <CardList list={list} />
    </>
  );
}
