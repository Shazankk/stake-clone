// src/pages/LeaderboardPage.jsx

import LeaderboardTable from "../components/LeaderboardTable";
import data from "../../public/data.json"; //For prod
// import data from "../constants/data.json";

const LeaderboardPage = () => {
  return (
    <div className="p-6 bg-gray-900 min-h-screen transform flex justify-center">
      <div className="w-full max-w-8xl">
        <LeaderboardTable data={data} />
      </div>
    </div>
  );
};

export default LeaderboardPage;
