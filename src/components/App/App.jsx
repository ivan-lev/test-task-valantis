import './App.css';

import { useEffect, useState } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import Filter from '../Filter/Filter';
import CardList from '../CardList/CardList';
import PaginatedItems from '../PaginatedItems/PaginatedItems';

import { api } from '../../utils/api';

export default function App() {
  const [ids, setIds] = useState([]);
  const [list, setList] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');

  function getUniqueCards(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()];
  }

  const searchJewelry = () => {
    api.getData('filter', { brand: selectedBrand, price: 46000.0 }).then(response => {
      // api.getData('filter', { product: 'кольцо' }).then(response => {
      console.log('ids:', response);
      api.getData('get_items', { ids: response.result }).then(response => {
        console.log('objects:', response);
        const list = getUniqueCards(response.result, 'id');
        //   console.log(list);
        setList(list);
      });
    });
  };

  // get all available brands
  useEffect(() => {
    api.getData('get_fields', { field: 'brand' }).then(response => {
      setBrands([...new Set(response.result.filter(brand => brand !== null))].sort());
    });
  }, []);

  //   useEffect(() => {
  //     api.getData('get_fields', { field: 'price' }).then(response => {
  //       console.log([...new Set(response.result.filter(brand => brand !== null))].sort());
  //     });
  //   }, []);

  // get list
  useEffect(() => {
    api.getData('get_ids', { offset: 0 }).then(response => {
      //   console.log(response.result);
      setIds(response.result.filter((value, index) => response.result.indexOf(value) === index));
    });
  }, []);

  useEffect(() => {
    api.getData('get_items', { ids: ids }).then(response => {
      //   get unique cards if some cards have the same ids;
      const list = getUniqueCards(response.result, 'id');
      //   console.log(list);
      setList(list);
    });
  }, [ids]);

  return (
    <>
      <h1>Каталог товаров</h1>
      <SearchForm
        brands={brands}
        setSelectedBrand={setSelectedBrand}
        searchJewelry={searchJewelry}
      />
      {/* <Filter
        isShortMeter={isShortMeter}
        toggleIsShortMeter={toggleIsShortMeter}
        brands={brands}
        setSelectedBrand={setSelectedBrand}
      /> */}
      {/* {list.length !== 0 && <CardList list={list} />} */}
      {list.length !== 0 && <PaginatedItems itemsPerPage={50} itemsList={list} />}
    </>
  );
}
