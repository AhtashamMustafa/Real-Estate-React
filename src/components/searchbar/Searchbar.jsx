import { useState } from "react";
import "./searchbar.scss";
import { Link } from "react-router-dom";

function Searchbar() {
  const [query, SetQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });
  const types = ["buy", "rent"];
  const switchType = (val) => {
    SetQuery((prev) => ({ ...prev, type: val }));
  };
  const handleChange = (e) => {
    SetQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => {
          return (
            <button
              key={type}
              onClick={() => {
                switchType(type);
              }}
              className={query.type === type ? "active" : ""}
            >
              {type}
            </button>
          );
        })}
      </div>
      <form action="">
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={handleChange}
        />
        <Link to={`/list?type=${query.type}&city=${query.location}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
          <button>
            <img src="/search.png" alt="" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Searchbar;
