import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    //In react were not allowed to mutate state thus we cant push item to items array
    // The problem derives from the fact that useState need to get a new object to determine whether
    // it needs to re-render the component or not and the push method does not return a new object
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(item) {
    setItems((items) => items.filter((currItem) => currItem.id !== item.id));
  }

  function handleToggleItem(item) {
    setItems((items) =>
      items.map((currItem) =>
        currItem.id === item.id
          ? { ...currItem, packed: !currItem.packed }
          : currItem
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItems={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
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
function PackingList({ items, onDeleteItem, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItems(item);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      {/* arrow func is nessesary because we need to wait for the component (button) to be pressed 
      otherwise without arrow function it renders automaticlly and its not allowed   */}
      <button onClick={() => onDeleteItem(item)}>❌</button>
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
