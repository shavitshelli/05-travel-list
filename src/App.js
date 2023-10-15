import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
  { id: 4, description: "Computer", quantity: 1, packed: false },
  { id: 5, description: "Keys", quantity: 1, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}
function Form() {
  //The reason for us to want to use controlled elements is to be able to control all
  //the elements from inside react amd not be controled from within the DOM therfore we need state
  // to maintain the application in sync with the changes occuring
  //1)first we use useState to get the curr state of the description
  //2)second we give the input tag the value of desc
  //3)third onChange we set the text to be the value entered - e.target.value
  const [desc, setDesc] = useState("");
  const [numItems, setNumItems] = useState(1);

  function handleSubmit(e) {
    //prevents from the page being reloaded on submit
    e.preventDefault();

    //if no description exist we dont need to submit
    if (!desc) return;

    const newItem = { desc, numItems, packed: false, id: Date.now() };
    console.log(newItem);

    //afet submitting we want to go back to initial state
    setDesc("");
    setNumItems(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip 😍</h3>
      <select
        value={numItems}
        onChange={(e) => setNumItems(Number(e.target.value))}
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
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
