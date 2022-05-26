import React, {useEffect, useState} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([])
  const [pizzaInForm, setPizzaInForm] = useState({})

  useEffect(() => {
    fetch('http://localhost:3001/pizzas')
      .then(resp => resp.json())
      .then(pizzaData => setPizzas(pizzaData))
  }, [])

  const sendPizzaToForm = selectedPizza => setPizzaInForm(selectedPizza)
  const handlePizzaUpdate = updatedPizza => {
    const updatedPizzaState = pizzas.map(pizza => {
      return pizza.id === updatedPizza.id ? updatedPizza : pizza
    })
    setPizzas(updatedPizzaState)
    setPizzaInForm({})
  }

  return (
    <>
      <Header />
      <PizzaForm selectedPizza={pizzaInForm} handlePizzaUpdate={handlePizzaUpdate}/>
      <PizzaList pizzaData={pizzas} handleClick={sendPizzaToForm}/>
    </>
  );
}

export default App;
