import { useState, useEffect } from "react";
import LeaderboardCard from "./LeaderboardCard";

const Leaderboard = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cacheBustedUrl = `/data.json?cb=${Date.now()}`;
        const response = await fetch(cacheBustedUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data.Stake) return <p>No data available</p>;

  const topThree = data.Stake.slice(0, 3).map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {topThree.map((entry, index) => (
        <LeaderboardCard
          key={index}
          rank={entry.rank}
          username={entry.user || entry.name}
          wagered={entry.wagered}
          prize={entry.prize}
        />
      ))}
    </div>
  );
};

export default Leaderboard;
