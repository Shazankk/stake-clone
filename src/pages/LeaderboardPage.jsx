import React, { useState, useEffect } from "react";
import ScrollButtons from "../components/ScrollButtons";
import LeaderboardTable from "../components/LeaderboardTable";

const LeaderboardPage = () => {
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

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Leaderboard</h1>
      <ScrollButtons data={data} />
      <LeaderboardTable data={data.Stake || []} />
    </div>
  );
};

export default LeaderboardPage;
