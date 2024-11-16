// src/components/NavbarHeader.jsx

import { Navbar } from "flowbite-react";

export default function NavbarHeader() {
  return (
    <Navbar
      fluid
      rounded
      className="bg-gray-800 text-white shadow-lg border-b border-gray-700"
    >
      <Navbar.Brand href="#">
        <img
          src="/cglogo.png"
          className="mr-3 h-8 sm:h-10"
          alt="Team CGF Logo"
        />
        <span className="self-center whitespace-nowrap text-2xl font-bold text-white">
          Team CGF
        </span>
      </Navbar.Brand>
      <div className="flex space-x-6 ml-auto">
        <a
          href="#"
          className="text-gray-300 hover:text-green-400 font-semibold transition-colors duration-200"
        >
          Home
        </a>
        <a
          href="#LeaderboardPage"
          className="text-gray-300 hover:text-green-400 font-semibold transition-colors duration-200"
        >
          Leaderboard
        </a>
        {/* <a
          href="/services"
          className="text-gray-300 hover:text-green-400 font-semibold transition-colors duration-200"
        >
          Services
        </a>
        <a
          href="/pricing"
          className="text-gray-300 hover:text-green-400 font-semibold transition-colors duration-200"
        >
          Pricing
        </a> */}
        <a
          href="https://discord.gg/teamcg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-green-400 font-semibold transition-colors duration-200"
        >
          Discord
        </a>
      </div>
    </Navbar>
  );
}
