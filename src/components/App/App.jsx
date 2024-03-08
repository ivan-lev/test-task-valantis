import './App.css';

import { useEffect, useState } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import Filter from '../Filter/Filter';
import CardList from '../CardList/CardList';
import PaginatedItems from '../PaginatedItems/PaginatedItems';
import Preloader from '../Preloader/Preloader';

import { api } from '../../utils/api';
import { ITEMS_PER_PAGE } from '../../variables/variables';

export default function App() {
  const [ids, setIds] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [paginatedList, setPaginatedList] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [brands, setBrands] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all-brands');
  const [minCost, setMinCost] = useState('');
  const [maxCost, setMaxCost] = useState('');
  const [minMax, setMinMax] = useState({});

  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [showPreloder, setShowPreloader] = useState(false);
  const [showGreetingPhrase, setShowGreetingPhrase] = useState(true);
  const [nothingFound, setIsNothingFound] = useState(false);

  // get all available brands on query results
  useEffect(() => {
    // get all available brands
    if (itemsList.length !== 0) {
      api.getData('get_fields', { field: 'brand' }).then(response => {
        setBrands([...new Set(response.result.filter(brand => brand !== null))].sort());
      });
    }
  }, [itemsList]);

  // check if id-list is changed after first mount or searching and get new cards array
  useEffect(() => {
    if (ids.length !== 0) {
      api
        .getData('get_items', { ids: ids })
        .then(response => {
          //   get unique cards if some cards have the same ids;
          const list = getUniqueCards(response.result, 'id');
          const minMaxPrices = findMinMaxPrice(list);
          setMinMax(minMaxPrices);
          setItemsList(list);
          setFilteredList(list);
        })
        .catch(error => console.log(error))
        .finally(result => {
          setShowPreloader(false);
          setIsInputDisabled(false);
        });
    }
  }, [ids]);

  function getUniqueCards(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()];
  }

  function searchItems() {
    setIsInputDisabled(true);
    setShowPreloader(true);
    setShowGreetingPhrase(false);
    setIsNothingFound(false);
    setMaxCost('');
    setMinCost('');
    setMinMax({ min: '', max: '' });
    setIds([]);
    setItemsList([]);
    setFilteredList([]);
    api
      .getData('filter', { product: searchQuery.toString() })
      .then(response => {
        setIds(response.result.filter((value, index) => response.result.indexOf(value) === index));
        response.result.length === 0 && setIsNothingFound(true);
        setSelectedBrand('all-brands');
      })
      .catch(error => {
        setIsInputDisabled(false);
        setShowPreloader(false);
        console.log(error);
      });
  }

  function handleSetMinCost(event) {
    setMinCost(parseInt(event.target.value));
  }

  function handleSetMaxCost(event) {
    setMaxCost(parseInt(event.target.value));
  }

  function filterItems(event) {
    event.preventDefault();
    setIsNothingFound(false);
    setItemOffset(0);

    let newFilteredList = itemsList.filter(item => {
      if (selectedBrand === 'all-brands') {
        return true;
      }
      return item.brand === selectedBrand;
    });

    newFilteredList = newFilteredList.filter(item => {
      if (item.price >= (minCost || 0) && item.price <= (maxCost || Number.MAX_SAFE_INTEGER)) {
        return true;
      }
    });
    const minMaxPrices = findMinMaxPrice(newFilteredList);
    setMinMax(minMaxPrices);
    setFilteredList(newFilteredList);
    console.log('newFilteredList', newFilteredList);
    if (newFilteredList.length === 0) {
      setPaginatedList([]);
    }
    newFilteredList.length === 0 && setIsNothingFound(true);
  }

  function findMinMaxPrice(array) {
    if (array.length === 0) {
      return { min: '', max: '' };
    }
    const min = array.reduce(
      (prev, curr) => (prev < curr.price ? prev : curr.price),
      array[0].price
    );
    const max = array.reduce(
      (prev, curr) => (prev > curr.price ? prev : curr.price),
      array[0].price
    );

    return { min: min, max: max };
  }

  return (
    <section className="main">
      <h1>Каталог товаров</h1>
      <SearchForm
        searchQuery={searchQuery}
        onType={setSearchQuery}
        onSearch={searchItems}
        isInputDisabled={isInputDisabled}
      />
      <Filter
        brands={brands}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        minCost={minCost}
        maxCost={maxCost}
        setMinCost={handleSetMinCost}
        setMaxCost={handleSetMaxCost}
        minMax={minMax}
        onFilter={filterItems}
      />
      {showGreetingPhrase && <p className="main__search-greeting">Введите фразу для поиска</p>}
      {showPreloder ? <Preloader /> : <CardList paginatedList={paginatedList} />}
      {nothingFound && <p className="main__search-greeting">Ничего не найдено...</p>}

      {filteredList.length !== 0 && (
        <PaginatedItems
          itemOffset={itemOffset}
          setItemOffset={setItemOffset}
          itemsPerPage={ITEMS_PER_PAGE}
          itemsList={filteredList}
          setPaginatedList={setPaginatedList}
        />
      )}
    </section>
  );
}
