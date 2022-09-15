import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import Filter from './Filter';
import { FilterContext } from '../context/FilterContext';

function Flights() {
  const {
    data,
    setData,
  } = useContext(FilterContext);
  useEffect(() => {
    axios('http://localhost:3002/result')
      .then((res) => setData(res.data.flights));
  }, []);
  let withTransfer;
  return (
    <div className="cards">
      <Filter />
      <div className="allCard">
        {data.length ? data.map((el) => (
          <div className="card">
            <div className="cardHeader">
              <div />
              <div>
                <div className="headerRight">{`${el.flight.price.total.amount} ₽`}</div>
                <div className="headerRight">На одного взрослого</div>
              </div>
            </div>
            <div>
              <div>
                {`${el.flight.legs[0].segments[0]?.departureCity?.caption}, ${el.flight?.legs[0]?.segments[0]?.departureAirport?.caption}`}
                <span>
                  {`(${el.flight.legs[0].segments[0].departureAirport.uid})`}
                </span>
                {' '}
                →
                {' '}
                {(el.flight.legs[0].segments[1])
                  ? (`${el.flight.legs[0].segments[1]?.arrivalAirport?.caption}`)
                  : (`${el.flight.legs[0].segments[0]?.arrivalAirport?.caption}`)}
                <span>
                  {' '}
                  {(el.flight.legs[0].segments[1])
                    ? (`(${el.flight.legs[0].segments[1]?.arrivalAirport?.uid})`) : (`(${el.flight?.legs[0]?.segments[0]?.arrivalAirport?.uid})`)}
                </span>
              </div>
              <hr />
              <div className="travelTime">
                <time>{new Date(el.flight.legs[0].segments[0].departureDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
                <time>
                  {new Date(el.flight.legs[0].segments[0].departureDate).toLocaleDateString('ru-RU', {
                    month: "short",
                    day: "numeric",
                    weekday: 'short' })}
                </time>
                <div>
                  🕒
                  {' '}
                  {(el.flight.legs[0]?.segments[1])
                    ? `${Math.abs(new Date(el.flight.legs[0].segments[0]?.departureDate).getHours() - new Date(el.flight.legs[0]?.segments[1]?.arrivalDate).getHours())} ч 
                  ${Math.abs(new Date(el.flight.legs[0].segments[0]?.departureDate).getMinutes() - new Date(el.flight.legs[0]?.segments[1]?.arrivalDate).getMinutes())} м`
                    : `${Math.abs(new Date(el.flight.legs[0].segments[0]?.departureDate).getHours() - new Date(el.flight.legs[0].segments[0].arrivalDate).getHours())} ч 
                  ${Math.abs(new Date(el.flight.legs[0].segments[0]?.departureDate).getMinutes() - new Date(el.flight.legs[0].segments[0].arrivalDate).getMinutes())} м`}
                  {' '}
                </div>
                <time dateTime={el.flight.legs[0].segments[0].arrivalDate}>
                  {(el.flight.legs[0].segments[1])

                    ? (new Date(el.flight.legs[0].segments[1]?.arrivalDate).toLocaleDateString('ru-RU', {
                      month: "short",
                      day: "numeric",
                      weekday: 'short' }))
                    : (new Date(el.flight.legs[0].segments[0]?.arrivalDate).toLocaleDateString('ru-RU', {
                      month: "short",
                      day: "numeric",
                      weekday: 'short' }))}
                </time>
                <time dateTime={el.flight.legs[0].segments[0].arrivalDate}>
                  {(el.flight.legs[0].segments[1])
                    ? (new Date(el.flight.legs[0].segments[1].arrivalDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
                    : (new Date(el.flight.legs[0].segments[0].arrivalDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))}
                </time>
              </div>
              <div className="title">
                <span>
                  {(el.flight.legs[0].segments.length > 1) ? `1 пересадка` : `без пересадок`}
                </span>
              </div>
              <div>
                <p>
                  {`Рейс выполняет: ${(el.flight?.carrier.caption)}`}
                </p>
              </div>
              <hr className="hr" />
            </div>
            <div>
              {`${el.flight.legs[1].segments[0]?.departureCity?.caption}, ${el.flight?.legs[1]?.segments[0]?.departureAirport?.caption}`}
              <span>{`(${el.flight.legs[1].segments[0].departureAirport.uid})`}</span>
              {' '}
              →
              {' '}
              {(el.flight.legs[1].segments[1])
                ? (`${el.flight.legs[1].segments[1]?.arrivalCity?.caption}, ${el.flight.legs[1].segments[1]?.arrivalAirport?.caption}`)
                : (`${el.flight.legs[1].segments[0]?.arrivalCity?.caption}, ${el.flight.legs[1].segments[0]?.arrivalAirport?.caption}`)}
              <span>
                {' '}
                {(el.flight.legs[1].segments[1])
                  ? (`(${el.flight.legs[1].segments[1]?.arrivalAirport?.uid})`) : (`(${el.flight?.legs[1]?.segments[0]?.arrivalAirport?.uid})`)}
              </span>
            </div>
            <hr />
            <div className="travelTime">
              <time>{new Date(el.flight.legs[1].segments[0].departureDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
              <time>
                {new Date(el.flight.legs[1].segments[0].departureDate).toLocaleDateString('ru-RU', {
                  month: "short",
                  day: "numeric",
                  weekday: 'short' })}
              </time>
              <div>
                🕒
                {' '}
                {(el.flight.legs[1]?.segments[1])
                  ? `${Math.abs(new Date(el.flight.legs[1].segments[0]?.departureDate).getHours() - new Date(el.flight.legs[1]?.segments[1]?.arrivalDate).getHours())} ч 
                  ${Math.abs(new Date(el.flight.legs[1].segments[0]?.departureDate).getMinutes() - new Date(el.flight.legs[1]?.segments[1]?.arrivalDate).getMinutes())} м`
                  : `${Math.abs(new Date(el.flight.legs[1].segments[0]?.departureDate).getHours() - new Date(el.flight.legs[1].segments[0].arrivalDate).getHours())} ч 
                  ${Math.abs(new Date(el.flight.legs[1].segments[0]?.departureDate).getMinutes() - new Date(el.flight.legs[1].segments[0].arrivalDate).getMinutes())} м`}
                {' '}
              </div>
              <time dateTime={el.flight.legs[0].segments[0].arrivalDate}>
                {(el.flight.legs[1].segments[1])

                  ? (new Date(el.flight.legs[1].segments[1]?.arrivalDate).toLocaleDateString('ru-RU', {
                    month: "short",
                    day: "numeric",
                    weekday: 'short' }))
                  : (new Date(el.flight.legs[1].segments[0]?.arrivalDate).toLocaleDateString('ru-RU', {
                    month: "short",
                    day: "numeric",
                    weekday: 'short' }))}
              </time>
              <time dateTime={el.flight.legs[0].segments[0].arrivalDate}>
                {(el.flight.legs[1].segments[1])
                  ? (new Date(el.flight.legs[1].segments[1].arrivalDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
                  : (new Date(el.flight.legs[1].segments[0].arrivalDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))}
              </time>
            </div>
            <div className="title">
              <span>
                {(el.flight.legs[1].segments.length > 1) ? `1 пересадка` : `без пересадок`}
              </span>
            </div>
            <div>
              <p>{`Рейс выполняет: ${(el.flight?.carrier.caption)}`}</p>
            </div>
            <button type="button" className="button">ВЫБРАТЬ</button>
          </div>
        ))
          : (
            <div className="notFound">
              🛩
            </div>
          )}
      </div>

    </div>
  );
}

export default Flights;
