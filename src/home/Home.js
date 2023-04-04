import React, { useEffect, useState } from "react";
import { listDishes } from "../utils/api";
import DishCard from "./DishCard";
import ErrorAlert from "../layout/ErrorAlert";
import "./home.css";

function Home({ addToCart }) {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(loadDishes, []);

  function loadDishes() {
    const abortController = new AbortController();
    setError(null);
    listDishes(abortController.signal).then(setDishes).catch(setError);
    return () => abortController.abort();
  }

  const cards = dishes.map((dish) => (
    <DishCard key={dish.id} dish={dish}>
      <button className="btn btn-primary" onClick={() => addToCart(dish)}>
        <span className="oi oi-plus" /> Add to cart
      </button>
    </DishCard>
  ));

  return (
    <main>
      <ErrorAlert error={error} />
        {cards.length === 0 ? <div><div className="flexer"><h2>Retrieving data from database...</h2></div><div className="loader"></div></div> : <div className="row">{cards}</div>}
    </main>
  );
}

export default Home;
