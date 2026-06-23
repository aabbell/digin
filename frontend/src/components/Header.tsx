import { useState } from 'react';
import { fetchPaper } from '../api/apxiv';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const results = await fetchPaper(searchQuery, 10);
      console.log('Search results:', results);
      if (onSearch) {
        onSearch(searchQuery);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-b font-SN border-gray-300 px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">Digin</h1>
      <form onSubmit={handleSearch} className="w-1/2">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm"
          placeholder="Search articles, topics, authors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isLoading}
        />
      </form>
      <button className="text-sm text-blue-600">Login</button>
    </div>
  )
}