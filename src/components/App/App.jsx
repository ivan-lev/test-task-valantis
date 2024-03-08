import './App.css';

import { useEffect, useState } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import Filter from '../Filter/Filter';
import CardList from '../CardList/CardList';
import PaginatedItems from '../PaginatedItems/PaginatedItems';

import { api } from '../../utils/api';

export default function App() {
  const [ids, setIds] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [listToDisplay, setListToDisplay] = useState([]);
  const [brands, setBrands] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [minCost, setMinCost] = useState(0);
  const [maxCost, setMaxCost] = useState(0);

  // get initial id-list of all products
  useEffect(() => {
    api.getData('get_ids', { offset: 0 }).then(response => {
      //   console.log(response.result);
      setIds(response.result.filter((value, index) => response.result.indexOf(value) === index));
    });
  }, []);

  // get all available brands
  useEffect(() => {
    api.getData('get_fields', { field: 'brand' }).then(response => {
      setBrands([...new Set(response.result.filter(brand => brand !== null))].sort());
    });
  }, []);

  // check if id-list is changed and get cards
  useEffect(() => {
    api.getData('get_items', { ids: ids }).then(response => {
      //   get unique cards if some cards have the same ids;
      const list = getUniqueCards(response.result, 'id');
      console.log(list);
      setItemsList(list);
    });
  }, [ids]);

  function getUniqueCards(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()];
  }

  function searchItems() {
    api.getData('filter', { product: searchQuery.toString() }).then(response => {
      console.log('click');
      setIds(response.result.filter((value, index) => response.result.indexOf(value) === index));
    });
  }

  function handleSetMinCost(event) {
    event.preventDefault();
    // console.log(event.target.value);
    setMinCost(event.target.value);
  }

  function handleSetMaxCost(event) {
    event.preventDefault();
    // console.log(event.target.value);
    setMaxCost(event.target.value);
  }

  return (
    <section className="main">
      <h1>Каталог товаров</h1>
      <SearchForm searchQuery={searchQuery} onType={setSearchQuery} onSearch={searchItems} />
      <Filter
        brands={brands}
        setSelectedBrand={setSelectedBrand}
        minCost={minCost}
        maxCost={maxCost}
        setMinCost={handleSetMinCost}
        setMaxCost={handleSetMaxCost}
      />
      {itemsList.length !== 0 && <CardList listToDisplay={listToDisplay} />}
      {itemsList.length !== 0 && (
        <PaginatedItems
          itemsPerPage={50}
          itemsList={itemsList}
          setListToDisplay={setListToDisplay}
        />
      )}
    </section>
  );
}
