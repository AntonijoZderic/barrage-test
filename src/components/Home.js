import Search from './Search'
import SearchResults from './SearchResults'

function Home({apiData, getSearchTerm}) {
  return (
    <>
      <Search getSearchTerm={(st) => getSearchTerm(st)} />
      <SearchResults apiData={apiData} />
    </>
  );
}

export default Home;