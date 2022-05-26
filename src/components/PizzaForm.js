import React, {useState, useEffect} from "react";

// const formDefault = {size: '', topping: '', vegetarian: ''}

function PizzaForm({selectedPizza, handlePizzaUpdate}) {
  const [formData, setFormData] = useState(selectedPizza)

  useEffect(() => setFormData(selectedPizza), [selectedPizza])

  const handleFormChange = e => {
    if(e.target.type === 'radio') {
      const veggieValue = e.target.value === 'Vegetarian' ? true : false
      setFormData({...formData, [e.target.name]: veggieValue})
    } else {
      setFormData({...formData, [e.target.name]: e.target.value})
    }
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    fetch(`http://localhost:3001/pizzas/${selectedPizza.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(resp => resp.json())
      .then(updatedPizza => handlePizzaUpdate(updatedPizza)) 
  }

  return (
    <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={formData.topping}
          />
        </div>
        <div className="col">
          <select className="form-control" name="size" value={formData.size}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
              checked={formData.vegetarian}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
              checked={!formData.vegetarian}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
