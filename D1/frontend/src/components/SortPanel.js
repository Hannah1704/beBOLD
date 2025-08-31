import React, { useState } from "react";

function SortPanel({ onSortChange }) {
  const [order, setOrder] = useState("asc"); 
  const [criteria, setCriteria] = useState({ popularity: false, downloads: false });
  const [feeds, setFeeds] = useState({ local: true, global: true });

  // ORDER
  const handleOrderChange = (e) => {
    setOrder(e.target.value);
    onSortChange({ order: e.target.value, criteria, feeds });
  };

  // CRITERIA
  const handleCriteriaChange = (e) => {
    const updated = { ...criteria, [e.target.name]: e.target.checked };
    setCriteria(updated);
    onSortChange({ order, criteria: updated, feeds });
  };

  // FEEDS
  const handleFeedChange = (e) => {
    const updated = { ...feeds, [e.target.name]: e.target.checked };
    setFeeds(updated);
    onSortChange({ order, criteria, feeds: updated });
  };

  return (
    <div>
      <h3>Sort Panel</h3>

      {/* ORDER */}
      <fieldset>
        <legend>Order</legend>
        <label>
          <input
            type="radio"
            name="order"
            value="asc"
            checked={order === "asc"}
            onChange={handleOrderChange}
          />
          A–Z / Lowest First
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="order"
            value="desc"
            checked={order === "desc"}
            onChange={handleOrderChange}
          />
          Z–A / Highest First
        </label>
      </fieldset>

      {/* SORT*/}
      <fieldset>
        <legend>Sort According To</legend>
        <label>
          <input
            type="checkbox"
            name="popularity"
            checked={criteria.popularity}
            onChange={handleCriteriaChange}
          />
          Popularity
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="downloads"
            checked={criteria.downloads}
            onChange={handleCriteriaChange}
          />
          File Downloads
        </label>
      </fieldset>

      {/* FEEDS*/}
      <fieldset>
        <legend>Which Feed to Sort</legend>
        <label>
          <input
            type="checkbox"
            name="local"
            checked={feeds.local}
            onChange={handleFeedChange}
          />
          Local
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="global"
            checked={feeds.global}
            onChange={handleFeedChange}
          />
          Global
        </label>
      </fieldset>
    </div>
  );
}

export { SortPanel };
