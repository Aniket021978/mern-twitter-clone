import React, { useState } from "react";
import Usercard from "./Usercard";
const axios = require("axios");

function SearchArea() {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    setText(e.target.value);
  };

  // Handle form submission and fetch user data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.REACT_APP_API_URL; // Using environment variable
      const req = await fetch(`${apiUrl}/search/${text}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      const data = await req.json();
      if (data.status === "ok") {
        setUsers(data.users);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="HeaderAndFeed">
      <form
        className="search-form"
        onSubmit={handleSubmit}
        method="GET"
        action={`${process.env.REACT_APP_API_URL}/search/${text}`} // Using environment variable
      >
        <input
          autoFocus
          placeholder="Search users..."
          value={text}
          onChange={handleChange}
        ></input>
        <button type="submit" className="tweetBtn">
          Search
        </button>
      </form>

      <div className="allUsers">
        {users.length === 0 ? (
          <h1 className="noUserFound">No user found</h1>
        ) : (
          users.map((user) => (
            <Usercard
              avatar={user.avatar}
              username={user.username}
              followers={user.followers}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default SearchArea;
