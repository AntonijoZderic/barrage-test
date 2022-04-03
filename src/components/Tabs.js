import { useState, useRef, useEffect } from 'react'
import Pagination from './Pagination'

function Tabs({ username, repositories, followersData, followingData }) {
  const [currentPage, setCurrentPage] = useState([1]);
  const activeTab = useRef("repositories");
  const sortBy = useRef("pushed");
  const filterBy = useRef("All");
  const pageLimit = 14;
  var languages = ["All"];
  var totalRecords = 0;
  var modifiedData = repositories.map(d => ({...d}));

  useEffect(() => {
    activeTab.current = "repositories";
    sortBy.current = "pushed";
    filterBy.current = "All";
  }, [username]);

  const activateTab = t => {
    activeTab.current = t;
    setCurrentPage([1])
  }

  const sort = sb => {
    sortBy.current = sb;
    setCurrentPage([1])
  }

  const filter = fb => {
    filterBy.current = fb;
    setCurrentPage([1])
  }

  const offset = () => (currentPage[0] - 1) * pageLimit;

  const compareDates = (a, b) => new Date(b.pushed_at)-new Date(a.pushed_at);
  
  const compareStars = (a, b) => b.stargazers_count-a.stargazers_count;

  const compareName = (a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }

    return 0;
  };

  const lastUpdateMessage = d => {
    let dateOfUpdate = new Date(d);
    let today = new Date();
    var s = (today.getTime() - dateOfUpdate.getTime()) / 1000;
    var m = Math.round(s / 60);
    var h = Math.round(s / 3600);
    var d = Math.round(s / 86400);

    if (s < 60) {
      return "Updated " + s + " seconds ago"
    } else if (s < 60*1.5) {
      return "Updated " + m + " minute ago";
    } else if (s < 60*60) {
      return "Updated " + m + " minutes ago";
    } else if (s < 60*60*1.5) {
      return "Updated " + h + " hour ago";
    } else if (s < 60*60*24) {
      return "Updated " + h + " hours ago";
    } else if (s < 60*60*24*1.5) {
      return "Updated yesterday";
    } else if (s < 60*60*24*31) {
      return "Updated " + d + " days ago";
    }

    const dateOfUpdateArr = dateOfUpdate.toString().split(" ");

    return "Updated on " + dateOfUpdateArr[1] + " " + dateOfUpdateArr[2] + ", " + dateOfUpdateArr[3];
  }

  if (activeTab.current == "followers") {
    sortBy.current = "pushed";
    filterBy.current = "All";

    followersData.forEach(() => {
      totalRecords++;
    });
  } else if (activeTab.current == "following") {
    sortBy.current = "pushed";
    filterBy.current = "All";

    followingData.forEach(() => {
      totalRecords++;
    });
  } else {
    repositories.forEach(data => {
      if (data.language != null && !languages.includes(data.language)) {
        languages.push(data.language);
      }

      if (data.language == filterBy.current || filterBy.current == "All") {
        totalRecords++;
      }
    });
  }

  if (sortBy.current == "pushed") {
    modifiedData.sort(compareDates);
  } else if (sortBy.current == "name") {
    modifiedData.sort(compareName);
  } else if (sortBy.current == "stars") {
    modifiedData.sort(compareStars);
  }

  if (filterBy.current != "All") {
    modifiedData = modifiedData.filter((val) => {
      if (val.language !== null) {
        return val.language == filterBy.current;
      }
    });
  }

  return (
  <>
  <div className="tabs">
    <p className={activeTab.current == "repositories" ? "tab active" : "tab"} onClick={() => activateTab("repositories")}>Repositories</p>
    <p className={activeTab.current == "followers" ? "tab active" : "tab"} onClick={() => activateTab("followers")}>Followers</p>
    <p className={activeTab.current == "following" ? "tab active" : "tab"} onClick={() => activateTab("following")}>Following</p>
  </div>
    
  <div className="tab-container">
    {activeTab.current == "repositories" &&
      <>
      <div className="sort-filter">
        <div className="dropdown">
          <button className="dropdown-btn">Sort {String.fromCharCode(709)}</button>
          <div className="dropdown-content">
            <ul>
              <li className={sortBy.current == "pushed" ? "active" : undefined} onClick={() => sort("pushed")}>Last updated</li>
              <li className={sortBy.current == "name" ? "active" : undefined} onClick={() => sort("name")}>Name</li>
              <li className={sortBy.current == "stars" ? "active" : undefined} onClick={() => sort("stars")}>Stars</li>
            </ul>
          </div>
        </div>

        <div className="dropdown">
          <button className="dropdown-btn">Language {String.fromCharCode(709)}</button>
          <div className="dropdown-content">
            <ul>
              {languages.map((language, index) => {
              return <li className={filterBy.current == language ? "active" : undefined} onClick={() => filter(language)} key={index}>{language}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
      
      {modifiedData.slice(offset(), offset() + pageLimit).map((data, index) => {
        return (
          <div className="card" key={index}>
            <a href={data.html_url} target="_blank" rel="noreferrer">
              <b>{data.name}</b>
            </a>
            <p>{data.description}</p>
            <br />
            <div className="icon-align">
              {data.language &&
                <p>{data.language}</p>
              }
              {data.stargazers_count != 0 &&
                <div className="icon-align">
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                  </svg>
                  {data.stargazers_count}
                </div>
              }
              <p title={new Date(data.pushed_at)}>{lastUpdateMessage(data.pushed_at)}</p>
            </div>
          </div>
        );
      })}
      </>
    }

    {activeTab.current == "followers" &&
      <>
      {followersData.slice(offset(), offset() + pageLimit).map((data, index) => {
        return (
        <a href={"/user/" + data.login} target="_blank" rel="noreferrer" key={index}>
          <div className="follow card"><img className="avatar" src={data.avatar_url} alt="avatar" height="100" width="100"></img>
            <p>{data.login}</p>
          </div>
        </a>
        );
      })}
      </>
    }

    {activeTab.current == "following" &&
      <>
      {followingData.slice(offset(), offset() + pageLimit).map((data, index) => {
        return (
        <a href={"/user/" + data.login} target="_blank" rel="noreferrer" key={index}>
          <div className="follow card"><img className="avatar" src={data.avatar_url} alt="avatar" height="100" width="100"></img>
            <p>{data.login}</p>
          </div>
        </a>
        );
      })}
      </>
    }
    <Pagination currentPage={currentPage[0]} getCurrentPage={(cp) => setCurrentPage([cp])} totalRecords={totalRecords} pageLimit={pageLimit} />
  </div>
  </>
  );
}

export default Tabs;