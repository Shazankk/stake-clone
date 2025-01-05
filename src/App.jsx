import NavbarHeader from "./components/NavbarHeader";
import LeaderboardPage from "./pages/LeaderboardPage";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
import Offers from "./pages/Offers";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <NavbarHeader />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-4 md:p-12">
        {/* Page Title */}
        <h1 className="text-6xl font-bold mb-6 text-center text-gray-200">
          Welcome to Team CGF Leaderboard
        </h1>

        {/* Leaderboard Section */}
        <div id="LeaderboardPage" className="w-full max-w-7xl mb-8">
          <LeaderboardPage />
        </div>

        {/* Offers Section */}
        <div className="w-full max-w-7xl">
          <Offers />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
