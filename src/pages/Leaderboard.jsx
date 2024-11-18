import { useState, useEffect } from "react";
import LeaderboardCard from "../components/LeaderboardCard";

export const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json"); // Fetching data.json locally
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Process data only when it's successfully loaded
  const getTopThree = (data) => {
    if (!data || data.length === 0) return [];
    const topThree = [...data]
      .sort((a, b) => b.wagered - a.wagered)
      .slice(0, 3)
      .map((item, index) => ({ ...item, rank: index + 1 })); // Adding rank for top 3

    // Custom ordering for top three: 2, 1, 3
    return [topThree[1], topThree[0], topThree[2]];
  };

  const topThree = getTopThree(data);

  return (
    <div className="flex flex-wrap justify-center gap-8 bg-gray-900 p-8 pt-16">
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        topThree.map((user) => (
          <LeaderboardCard
            key={user.rank}
            rank={user.rank}
            username={user.user}
            wagered={user.wagered}
            prize={user.price}
          />
        ))
      )}
    </div>
  );
};
