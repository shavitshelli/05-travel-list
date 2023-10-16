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
      <Stats items={items} />
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
  const [sortBy, setSortby] = useState("input");

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  } else if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortby(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description order</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
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
function Stats({ items }) {
  if (items.length === 0)
    return (
      <p className="stats">
        <em> Start adding items to your list 👌</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const precentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {precentage === 100
          ? "You got everything"
          : `💼 You have ${numItems} items on your list, and you already packed${" "}
          ${numPacked} (${precentage}%)`}
      </em>
    </footer>
  );
}
