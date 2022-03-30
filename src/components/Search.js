import { useState } from 'react'

function Search({getSearchTerm}) {
  const [searchTerm, setSearchTerm] = useState();

  return (
    <div className="search">
      <input
        type="text"
        value={searchTerm}
        placeholder="Search..."
        onChange={(e) => getSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default Search;