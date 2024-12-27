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
        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
    </div>
  );
} 