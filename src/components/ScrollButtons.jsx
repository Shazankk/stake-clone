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
        {/* Rank 1 */}
        {topThree[0] && (
          <div className="order-1 sm:order-2">
            <LeaderboardCard
              rank={topThree[0].rank}
              username={topThree[0].user || topThree[0].name}
              wagered={topThree[0].wagered}
              prize={topThree[0].prize}
              category={selectedCategory}
            />
          </div>
        )}

        {/* Rank 2 */}
        {topThree[1] && (
          <div className="order-2 sm:order-1 sm:translate-y-4">
            <LeaderboardCard
              rank={topThree[1].rank}
              username={topThree[1].user || topThree[1].name}
              wagered={topThree[1].wagered}
              prize={topThree[1].prize}
              category={selectedCategory}
            />
          </div>
        )}

        {/* Rank 3 */}
        {topThree[2] && (
          <div className="order-3 sm:order-3 sm:translate-y-6">
            <LeaderboardCard
              rank={topThree[2].rank}
              username={topThree[2].user || topThree[2].name}
              wagered={topThree[2].wagered}
              prize={topThree[2].prize}
              category={selectedCategory}
            />
          </div>
        )}
      </div>

      {/* Leaderboard Table */}
      <LeaderboardTable data={selectedData} category={selectedCategory} />
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
