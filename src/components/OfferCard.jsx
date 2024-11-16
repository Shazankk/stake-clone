import { Card } from "flowbite-react";
import { HiClipboard } from "react-icons/hi";
import PropTypes from "prop-types";

const OfferCard = ({ logo, code, title, features, buttonLink }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="w-full max-w-sm">
      <Card className="flex flex-col items-center bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out p-6 border border-gray-700">
        <div className="flex flex-col items-center text-center">
          {/* Dynamic Logo */}
          <img src={logo} alt={`${title} Logo`} className="h-16 mb-6" />

          {/* Title */}
          <h2 className="text-3xl font-bold mb-4">{title}</h2>

          {/* Features */}
          <ul className="list-none space-y-3 text-sm mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <span className="text-green-400 mr-2">✔</span>
                {feature}
              </li>
            ))}
          </ul>

          {/* Bonus Code */}
          <div className="flex items-center justify-center bg-gray-700 p-3 rounded-lg mb-6 w-full">
            <span className="font-semibold text-lg mr-2">Code: {code}</span>
            <button
              onClick={copyToClipboard}
              className="flex items-center text-gray-400 hover:text-gray-200 transition"
            >
              <HiClipboard size={20} />
            </button>
          </div>

          {/* Claim Bonus Button */}
          <a
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            CLAIM BONUS
          </a>
        </div>
      </Card>
    </div>
  );
};

OfferCard.propTypes = {
  logo: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  buttonLink: PropTypes.string.isRequired,
};

export default OfferCard;
