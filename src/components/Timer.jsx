import { useEffect, useState } from "react";

const Timer = () => {
  const calculateTimeLeft = () => {
    // Get current time as a timestamp in UTC
    const nowUTC = Date.now(); // Always in UTC

    const utcPlusTwo = nowUTC;

    // Calculate the target date for UTC+2
    const currentDateUTCPlusTwo = new Date(utcPlusTwo);
    const targetMonth =
      currentDateUTCPlusTwo.getUTCMonth() === 11
        ? 0
        : currentDateUTCPlusTwo.getUTCMonth() + 1;
    const targetYear =
      currentDateUTCPlusTwo.getUTCMonth() === 11
        ? currentDateUTCPlusTwo.getUTCFullYear() + 1
        : currentDateUTCPlusTwo.getUTCFullYear();

    // Target date is 1st of the next month at 00:00:00 UTC+2
    const targetDateUTCPlusTwo = Date.UTC(targetYear, targetMonth, 1, 0, 0, 0);

    // Add 2 hours to the target date to align with UTC+2
    const targetDateMillis = targetDateUTCPlusTwo + 2 * 60 * 60 * 1000;

    // Calculate the time difference
    const difference = targetDateMillis - utcPlusTwo;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
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
        <div className="text-6xl font-bold">{timeLeft.days}</div>
      </div>
      <div className="text-center">
        <span className="text-2xl font-semibold text-gray-400">HOURS</span>
        <div className="text-6xl font-bold">{timeLeft.hours}</div>
      </div>
      <div className="text-center">
        <span className="text-2xl font-semibold text-gray-400">MINUTES</span>
        <div className="text-6xl font-bold">{timeLeft.minutes}</div>
      </div>
      <div className="text-center">
        <span className="text-2xl font-semibold text-gray-400">SECONDS</span>
        <div className="text-6xl font-bold">{timeLeft.seconds}</div>
      </div>
    </div>
  );
};

export default Timer;
