import { useState, useEffect } from "react";
import ScrollButtons from "../components/ScrollButtons";
import Timer from "../components/Timer";

const LeaderboardPage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Stake");

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
      <ScrollButtons
        data={data}
        onCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default LeaderboardPage;