// src/components/Timer.jsx

import { useEffect, useState } from "react";

const Timer = () => {
  const calculateTimeLeft = () => {
    const now = new Date();

    // Calculate the next month (reset to January if current month is December)
    const targetMonth = now.getMonth() === 11 ? 0 : now.getMonth() + 1;
    const targetYear =
      now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();

    // Set the target date to the first day of the next month at 00:00:00
    const targetDate = new Date(targetYear, targetMonth, 1, 2, 0, 0);
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center p-6 bg-gray-900 rounded-lg shadow-lg text-green-400 space-x-6 transform hover:scale-105">
      <div className="text-center">
        <span className="text-2xl font-semibold text-gray-400">DAYS</span>
        <div className="text-7xl font-bold">{timeLeft.days}</div>
      </div>
      <div className="text-center">
        <span className="text-2xl font-semibold text-gray-400">HOURS</span>
        <div className="text-7xl font-bold">{timeLeft.hours}</div>
      </div>
      <div className="text-center">
        <span className="text-2xl font-semibold text-gray-400">MINUTES</span>
        <div className="text-7xl font-bold">{timeLeft.minutes}</div>
      </div>
      <div className="text-center">
        <span className="text-2xl font-semibold text-gray-400">SECONDS</span>
        <div className="text-7xl font-bold">{timeLeft.seconds}</div>
      </div>
    </div>
  );
};

export default Timer;
