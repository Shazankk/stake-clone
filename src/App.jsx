// src/App.jsx

import NavbarHeader from "./components/NavbarHeader";
import { Leaderboard } from "./pages/Leaderboard";
import Timer from "./components/Timer";
import AppFooter from "./components/Footer";
import LeaderboardPage from "./pages/LeaderboardPage";
import Offers from "./pages/Offers";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <NavbarHeader />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-4 md:p-12">
        <h1 className="text-6xl font-bold mb-10 text-center text-gray-200">
          Welcome to Team CGF Leaderboard
        </h1>

        {/* Leaderboard Cards Section */}
        <div className="mb-8 w-full max-w-7xl flex flex-col items-center">
          <Leaderboard />
        </div>

        {/* Timer Section */}
        <div className="flex justify-center mb-8 w-full">
          <Timer />
        </div>

        {/* Leaderboard Table Section */}
        <div
          id="LeaderboardPage"
          className="w-full max-w-6xl mb-8 p-4 bg-gray-800 rounded-lg shadow-lg"
        >
          <LeaderboardPage />
        </div>

        {/* Offers Section */}
        <div className="w-full">
          <Offers />
        </div>
      </main>

      {/* Footer */}
      <AppFooter />
    </div>
  );
}

export default App;
