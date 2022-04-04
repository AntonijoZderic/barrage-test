import { useNavigate } from 'react-router-dom'

function Search({ getSearchTerm }) {
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("../user/");
    getSearchTerm(e.target.username.value);
    e.target.username.value = "";
  }

  return (
    <form className="search" onSubmit={(e) => handleSubmit(e)}>
      <input type="text" placeholder="Enter username" name="username" />
      <button className="search-btn" type="submit">Search</button>
    </form>
    );
}
export default Search;