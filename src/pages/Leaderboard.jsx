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
        <>
          {/* Rank 2 */}
          <div className="order-1 md:order-2">
            <LeaderboardCard
              rank={topThree[1]?.rank}
              username={topThree[1]?.user}
              wagered={topThree[1]?.wagered}
              prize={topThree[1]?.price}
            />
          </div>

          {/* Rank 1 */}
          <div className="order-2 md:order-1">
            <LeaderboardCard
              rank={topThree[0]?.rank}
              username={topThree[0]?.user}
              wagered={topThree[0]?.wagered}
              prize={topThree[0]?.price}
            />
          </div>

          {/* Rank 3 */}
          <div className="order-3 md:order-3">
            <LeaderboardCard
              rank={topThree[2]?.rank}
              username={topThree[2]?.user}
              wagered={topThree[2]?.wagered}
              prize={topThree[2]?.price}
            />
          </div>
        </>
      )}
    </div>
  );
};
