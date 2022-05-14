export default function SuggestionsList({ suggestions }) {
  return (
    <ul
      data-testid="results-list"
      className="border border-primary rounded-md w-96 text-lg bg-white"
    >
      {suggestions.map((item, i) => (
        <li key={item.id} className="p-1 bg-sky-600 hover:bg-primary hover:text-light">
          <span className="">{item.title || item.name}</span>
        </li>
      ))}
    </ul>
  );
}
