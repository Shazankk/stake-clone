// src/components/Footer.jsx

import { Footer } from "flowbite-react";
import { FaDiscord, FaKickstarter, FaTwitter } from "react-icons/fa";

const AppFooter = () => {
  return (
    <div className="bg-gray-900 text-white">
      <Footer container={true} className="py-10 px-6 text-gray-900 bg-blue">
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src="src\assets\cglogo.png" // Replace with your logo URL
              className="h-12 mb-2"
              alt="Team CGF Logo"
            />
            <span className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} teamcgf.com
            </span>
            <span className="text-gray-500 text-sm">
              Developed by{" "}
              <a
                href="https://www.shazankk.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Shazankk
              </a>
            </span>
          </div>

          {/* Main Section Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-400 uppercase">
              Main
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#LeaderboardPage"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Leaderboard
                </a>
              </li>
              <li>
                <a
                  href="/bonus-hunt"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Bonus Hunt
                </a>
              </li>
              <li>
                <a
                  href="/challenges"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Challenges
                </a>
              </li>
            </ul>
          </div>

          {/* About Section Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-400 uppercase">
              About
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="/terms"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Stay Connected Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-3 text-gray-400 uppercase">
              Stay Connected
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://discord.gg/teamcg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <FaDiscord size={20} />
              </a>
              <a
                href="http://kick.com/cherieann"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <FaKickstarter size={20} />
              </a>
              <a
                href="http://twitter.com/cherieann"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </Footer>

      {/* Disclaimer Section */}
      <div className="mt-6 px-4 py-4 bg-gray-800 text-gray-400 text-center text-sm md:max-w-3xl mx-auto rounded-md">
        <p>
          18+ WE DO NOT TAKE RESPONSIBILITY FOR ANY LOSSES FROM GAMBLING IN
          CASINOS AND BETTING SITES WHICH ARE LINKED OR PROMOTED ON OUR
          WEBSITE(S). AS A PLAYER, YOU ARE RESPONSIBLE FOR YOUR BETS. 18+
        </p>
      </div>
    </div>
  );
};

export default AppFooter;
