import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function User() {
  const [apiData, setApiData] = useState({});
  let { username } = useParams();

  useEffect(() => {
    let abortController = new AbortController();

    fetch(`https://api.github.com/users/${username}`, { signal: abortController.signal })
    .then(response => response.json())
    .then((data) => { setApiData(data); });

    return () => abortController.abort();
  }, [username]);

  return (
    <>
      {apiData.type == "User"
      ?
      <div className="profile">
        <div className="sidebar">
          <div className="sidebar-top">
            <img className="avatar" src={apiData.avatar_url} alt="avatar" height="296" width="296"></img>
            <b>{apiData.name}</b>
            <p>{apiData.login}</p>  
          </div>
          {apiData.bio && <p>{apiData.bio}</p>}
          <hr />

          {apiData.location &&
          <p className="icon-align">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path fill="currentColor" d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
            {apiData.location}
          </p>}

          {apiData.blog &&
          <p className="icon-align">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path fill="currentColor" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path>
            </svg>
            <a href={apiData.blog} target="_blank" rel="noreferrer">
              {apiData.blog}
            </a>
          </p>}

          {apiData.twitter_username &&
          <p className="icon-align">
            <svg width="16" height="16" viewBox="0 0 273.5 222.3">
              <path fill="currentColor" d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1"></path>
            </svg>
            <a href={"https://twitter.com/" + apiData.twitter_username} target="_blank" rel="noreferrer">
              @{apiData.twitter_username}
            </a>
          </p>}
        </div>
        <div className="profile-main"></div>
      </div>
      : 
      <div className="text">
        <h4>User not found</h4>
      </div>}
    </>
  );
}

export default User;