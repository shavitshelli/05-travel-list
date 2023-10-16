import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

  function habdleClearItems() {
    const confirmed = window.confirm(
      "Are you sure u want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItems={handleToggleItem}
        onClearItems={habdleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}
