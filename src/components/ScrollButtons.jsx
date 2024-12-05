import { useState } from "react";
import PropTypes from "prop-types";
import LeaderboardCard from "./LeaderboardCard";
import LeaderboardTable from "./LeaderboardTable";

const ScrollButtons = ({ data }) => {
  const categories = Object.keys(data || {});
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || "");

  if (!data || categories.length === 0) {
    return <p className="text-center text-gray-300">No data available</p>;
  }

  const handleClick = (key) => {
    setSelectedCategory(key);
  };

  const selectedData = data[selectedCategory] || [];
  const topThree = selectedData.slice(0, 3).map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  return (
    <div>
      {/* Category Buttons */}
      <div className="flex justify-center gap-6 mb-8 space-x-12 p-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleClick(category)}
            className={`px-6 py-2 rounded-lg text-lg font-medium ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center mb-10">
        {topThree.map((entry, index) => (
          <LeaderboardCard
            key={index}
            rank={entry.rank}
            username={entry.user || entry.name}
            wagered={entry.wagered}
            prize={entry.prize !== "NA" ? entry.prize : undefined}
          />
        ))}
      </div>

      {/* Leaderboard Table */}
      <LeaderboardTable data={selectedData} />
    </div>
  );
};

ScrollButtons.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        rank: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        user: PropTypes.string,
        name: PropTypes.string,
        wagered: PropTypes.number,
        prize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      })
    )
  ).isRequired,
};

export default ScrollButtons;
