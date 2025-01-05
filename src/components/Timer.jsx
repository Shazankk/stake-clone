import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Timer = ({ category }) => {
  const calculateTimeLeft = () => {
    const now = Date.now();

    let targetDateMillis;

    if (category === "Stake") {
      const currentDate = new Date(now);
      const targetMonth =
        currentDate.getMonth() === 11 ? 0 : currentDate.getMonth() + 1;
      const targetYear =
        currentDate.getMonth() === 11
          ? currentDate.getFullYear() + 1
          : currentDate.getFullYear();
      const targetDate = new Date(targetYear, targetMonth, 1, 0, 0, 0);
      targetDateMillis = targetDate.getTime();
    } else if (category === "Wager Raffle") {
      const currentDate = new Date(now);
      const currentDay = currentDate.getDate();
      const targetMonth = currentDate.getMonth();
      const targetYear = currentDate.getFullYear();

      if (currentDay < 16) {
        const targetDate = new Date(targetYear, targetMonth, 16, 0, 0, 0);
        targetDateMillis = targetDate.getTime();
      } else {
        const nextMonth = targetMonth === 11 ? 0 : targetMonth + 1;
        const nextYear = targetMonth === 11 ? targetYear + 1 : targetYear;
        const targetDate = new Date(nextYear, nextMonth, 1, 0, 0, 0);
        targetDateMillis = targetDate.getTime();
      }
    }

    const difference = targetDateMillis - now;

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
  }, [category]);

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

Timer.propTypes = {
  category: PropTypes.string.isRequired,
};

export default Timer;