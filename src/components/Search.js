import { useNavigate } from 'react-router-dom'

function Search() {
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("../user/" + e.target.username.value);
    e.target.username.value = "";
  }

  return (
    <form className="search" onSubmit={(e) => handleSubmit(e)}>
      <input type="text" placeholder="Search..." name="username" />
      <input className="button" type="submit" />
    </form>
  );
}

export default Search;