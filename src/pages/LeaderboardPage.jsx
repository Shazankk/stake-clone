import { useState, useEffect } from "react";
import LeaderboardTable from "../components/LeaderboardTable";

const LeaderboardPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Append a cache-busting parameter (timestamp) to the request URL
        const response = await fetch(`/data.json?cacheBust=${Date.now()}`);
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

  return (
    <div className="p-6 bg-gray-900 min-h-screen flex justify-center">
      <div className="w-full max-w-8xl">
        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">Error: {error}</p>
        ) : (
          <LeaderboardTable data={data} />
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
