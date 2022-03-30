function SearchResults({apiData}) {
  return (
    <div>
      <h1>User info</h1>
      {apiData.login ? <>
        <p>{apiData.login}</p>
        <p>{apiData.followers}</p>
      </>
      : <p >Enter username</p>}
    </div>
  );
}

export default SearchResults;