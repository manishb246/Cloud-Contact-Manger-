import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactCard from "../components/ContactCard";
import { useContacts } from "../context/ContactsContext";
import { searchContactsByName } from "../api/contactsApi";

export default function PhoneDirectory() {
  const navigate = useNavigate();
  const { contacts, loading, error, removeContact, refetch } = useContacts();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const displayContacts = searchResults ?? contacts;

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }
    setIsSearching(true);
    try {
      const results = await searchContactsByName(searchQuery);
      setSearchResults(results);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4 font-semibold">Error: {error}</p>
        <button
          onClick={refetch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Phone Directory
            </h1>
            <button
              onClick={() => navigate("/contacts/create")}
              className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New
            </button>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
            Manage your contact list with ease. Find, add, edit, or remove
            contacts through our easy-to-use directory interface.
          </p>
        </div>
      </div>

      {/* Search Bar - Responsive Stack on Mobile */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10 p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search Contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-inner"
          />
          <svg
            className="w-4 h-4 absolute left-3.5 top-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 disabled:opacity-50"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
          {searchResults && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSearchResults(null);
              }}
              className="bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 text-sm font-medium px-4 py-2.5 rounded-lg transition-all border shadow-sm"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Contact Grid - Fluid Layout */}
      {displayContacts.length === 0 ? (
        <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
          <svg
            className="w-16 h-16 mx-auto mb-4 opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <p className="text-lg font-medium">No contacts found.</p>
          <p className="text-sm">
            Try searching for something else or create a new contact.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayContacts.map((contact, index) => (
            <div
              key={contact.id}
              className="animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-both"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ContactCard
                contact={contact}
                onView={(c) => navigate(`/contacts/${c.id}`)}
                onEdit={(c) => navigate(`/contacts/${c.id}/edit`)}
                onDelete={(id) => {
                  removeContact(id);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
