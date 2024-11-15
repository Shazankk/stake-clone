// src/pages/Leaderboard.jsx

import LeaderboardCard from "../components/LeaderboardCard";
import data from "../constants/data.json";

export const Leaderboard = () => {
  // Sort data by wagered amount to get the top 3
  const topThree = [...data]
    .sort((a, b) => b.wagered - a.wagered)
    .slice(0, 3)
    .map((item, index) => ({ ...item, rank: index + 1 })); // Adding rank for top 3

  // Custom ordering for top three: 2, 1, 3
  const orderedTopThree = [topThree[1], topThree[0], topThree[2]];

  return (
    <div className="flex flex-wrap justify-center gap-8 bg-gray-900 p-8 pt-16">
      {orderedTopThree.map((user) => (
        <LeaderboardCard
          key={user.rank}
          rank={user.rank}
          username={user.user}
          wagered={user.wagered}
          prize={user.price}
        />
      ))}
    </div>
  );
};
