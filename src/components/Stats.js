export default function Stats({ items }) {
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
