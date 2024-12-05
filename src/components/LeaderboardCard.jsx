// src/components/LeaderboardCard.jsx

import { Card } from "flowbite-react";
import PropTypes from "prop-types";

const LeaderboardCard = ({ rank, username, wagered, prize }) => {
  // Define the trophy images based on rank
  const trophyImages = {
    1: "trophy1.png",
    2: "trophy2.png",
    3: "trophy3.png",
  };

  // Style adjustments for Rank 1 card elevation
  const cardElevation = rank === 1 ? "translate-y-[-30px]" : "";

  return (
    <Card
      className={`flex flex-col items-center bg-gray-800 text-white rounded-lg shadow-lg w-64 mb-6 border border-gray-700 hover:shadow-2xl ${cardElevation} transform hover:scale-105 transition-all duration-300 ease-in-out p-4`}
    >
      {/* Trophy Image with Padding */}
      <div className="mb-4 flex justify-center">
        <img
          src={trophyImages[rank]}
          alt={`${rank} place trophy`}
          className="h-32 w-32"
        />
      </div>

      {/* Username and Flag */}
      <div className="text-center mb-2">
        <span className="text-xl font-semibold">{username}</span>
      </div>

      {/* Wagered Amount */}
      <div className="text-center mb-4">
        <span className="text-xs font-semibold text-gray-400">WAGERED</span>
        <div className="text-green-400 text-lg font-bold">
          ${wagered.toLocaleString()}
        </div>
      </div>

      {/* Prize Amount with Hover Transition */}
      <div className="bg-gray-700 w-full text-center py-2 rounded-lg text-lg font-semibold hover:bg-gray-600 transition-colors duration-200 ease-in-out">
        ${prize}
      </div>
    </Card>
  );
};

// Define prop types
LeaderboardCard.propTypes = {
  rank: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  wagered: PropTypes.number.isRequired,
  prize: PropTypes.number.isRequired,
};

export default LeaderboardCard;
