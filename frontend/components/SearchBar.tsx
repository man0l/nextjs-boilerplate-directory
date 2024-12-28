interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <input
        type="text"
        placeholder="Search AI tools..."
        onChange={(e) => onSearch(e.target.value)}
        className="input"
      />
    </div>
  );
} 