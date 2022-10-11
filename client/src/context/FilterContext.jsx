import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

function FilterContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [input, setInput] = useState([]);
  const [min, setMin] = useState([]);
  const [max, setMax] = useState([]);
  const [toggel, setToggel] = useState(false);
  const [checked, setChecked] = useState(false);
  const [flag, setFlag] = useState(false);

  const handlerClick = () => {
    setData(data.filter((el) => (+el.flight.price.total.amount >= min && +el.flight.price.total.amount <= max)));
    setToggel((prev) => !prev);
  };
  const handlerMinPrice = () => {
    setData(data.filter((el) => (+el.flight.price.total.amount >= min)));
  };
  console.log(data);
  const handlerOneChange = () => {
    setChecked((prev) => !prev);
    setData(data.filter((el) => (el.flight.legs[0].segments.length > 1) && (el.flight.legs[1].segments.length > 1)));
  };
  const handlerNoChange = () => {
    setChecked((prev) => !prev);
    setData(data.filter((el) => (el.flight.legs[0].segments.length === 1) && (el.flight.legs[1].segments.length === 1)));
  };
  const handlerAscending = () => {
    setFlag((prev) => !prev);
    setData(data.sort((a, b) => a.flight.price.total.amount - b.flight.price.total.amount));
  };
  const handlerDescending = () => {
    setFlag((prev) => !prev);
    setData(data.sort((a, b) => b.flight.price.total.amount - a.flight.price.total.amount));
  };
  const handlerTravelTime = () => {
    setFlag((prev) => !prev);
    setData(data.sort((a, b) => new Date(a.flight.legs[0].segments[0]?.departureDate) - new Date(b.flight.legs[0].segments[0]?.departureDate)))
  }
  return (
    <FilterContext.Provider value={{ flag, setFlag, checked, setChecked, toggel, setToggel, max, setMax, min, setMin, input, setInput, data, setData, handlerClick, handlerMinPrice, handlerOneChange, handlerNoChange, handlerAscending, handlerDescending, handlerTravelTime }}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterContextProvider;
