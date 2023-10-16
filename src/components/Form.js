import { useState } from "react";

export default function Form({ onAddItems }) {
  //The reason for us to want to use controlled elements is to be able to control all
  //the elements from inside react amd not be controled from within the DOM therfore we need state
  // to maintain the application in sync with the changes occuring
  //1)first we use useState to get the curr state of the description
  //2)second we give the input tag the value of desc
  //3)third onChange we set the text to be the value entered - e.target.value
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    //prevents from the page being reloaded on submit
    e.preventDefault();

    //if no description exist we dont need to submit
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    // console.log(newItem);

    onAddItems(newItem);

    //afet submitting we want to go back to initial state
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip 😍</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((opt) => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
