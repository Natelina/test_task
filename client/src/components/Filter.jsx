import React, { useContext, useState } from 'react';
import axios from 'axios';
import { FilterContext } from '../context/FilterContext';

function Filter() {
  const {
    data,
    input,
    setMin,
    setMax,
    toggel, setToggel,
    checked, setChecked,
    oneChecked, setOneChecked,
    setData,
    handlerClick,
    handlerOneChange,
    handlerNoChange,
    handlerAscending,
    handlerDescending } = useContext(FilterContext);

  const minPriceHandler = (e) => {
    setMin(e.target.value);
  };
  const maxPriceHendler = (e) => {
    setMax(e.target.value);
  };

  const handlerClean = () => {
    axios('http://localhost:3002/result')
      .then((res) => setData(res.data.flights));
    // setToggel((prev) => !prev);
    // setChecked((prev) => !prev);
  };
  // const [carrier, setCarrier] = useState(['LOT Polish Airlines', 'Аэрофлот - российские авиалинии', 'Air France', 'KLM', 'TURK HAVA YOLLARI A.O.', 'Finnair Oyj', 'TURK HAVA YOLLARI A.O.']);
  const [carrier, setCarrier] = useState([]);
  const carrierArr = () => {
    // data.filter((el) => setCarrier((prev) => [...prev, el.flight.carrier.caption]));
  };
  carrierArr();
  console.log('carrier', carrier);
  const search = () => {
    handlerClean();
    setToggel((prev) => !prev);
  };
  const chose = () => {
    handlerClean();
    setChecked((prev) => !prev);
  };
  // const noChose = () => {
  //   handlerClean();
  //   setChecked((prev) => !prev);
  // };
  const handlerSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };
  const noChoseFunc = checked ? chose : handlerNoChange;
  const oneChoseFunc = checked ? chose : handlerOneChange;
  const choseFunc = toggel ? search : handlerClick;
  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <div>
          <h4>Сортировать</h4>
          <div>
            <input onClick={handlerAscending} id="ascending" type="radio" name="sort1" value="по возрастанию" />
            {' '}
            <label htmlFor="ascending">- по возрастанию цены</label>

          </div>
          <div>
            <input onClick={handlerDescending} id="descending" type="radio" name="sort1" value="по убыванию" />
            {' '}
            <label htmlFor="descending">- по убыванию цены</label>

          </div>
          <div>
            <input type="radio" name="sort1" />
            {' '}
            - по времени в пути
          </div>

        </div>
        <div>
          <h4>Фильтровать</h4>
          <div>
            <input onClick={oneChoseFunc} id="oneChange" name="change" type="checkbox" />
            <label htmlFor="oneChange">- 1 пересадка</label>
          </div>
          <div>
            <input onClick={noChoseFunc} id="noChange" name="change" type="checkbox" />
            <label htmlFor="noChange">- без пересадок</label>
          </div>
        </div>
        <div>
          <h4>Цена</h4>
          <div>
            От
            {' '}
            <input onChange={minPriceHandler} name="minPrice" value={input.minPrice} className="inputPrice" type="text" />
          </div>
          <div>
            До
            {' '}
            <input onChange={maxPriceHendler} name="maxPrice" value={input.maxPrice} className="inputPrice" type="text" />
          </div>
        </div>
        <div>
          <h4>Авиакомпании</h4>
          <div>
            <input type="checkbox" />
            - LOT Polish Airlines
          </div>
          <div>
            <input type="checkbox" />
            - Аэрофлот - российские авиалинии
          </div>
          <div>
            <input type="checkbox" />
            - Air France
          </div>
          <div>
            <input type="checkbox" />
            - KLM
          </div>
          <div>
            <input type="checkbox" />
            - TURK HAVA YOLLARI A.O.
          </div>
          <div>
            <input type="checkbox" />
            - Finnair Oyj
          </div>
          <div>
            <input type="checkbox" />
            - TURK HAVA YOLLARI A.O.
          </div>
        </div>
        <button type="submit" onClick={choseFunc}>
          {!toggel ? 'Найти' : 'Показать всё'}

        </button>
      </form>
    </div>
  );
}

export default Filter;
