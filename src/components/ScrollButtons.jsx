import { ButtonGroup, Button } from "flowbite-react";

const ScrollButtons = () => {
  return (
    <div className="flex justify-center mt-10">
      <ButtonGroup className="flex justify-center space-x-28 rounded-lg p-8 mb-6">
        <Button className="px-14 py-4 text-lg font-semibold text-white-100 bg-gray-700 rounded-lg shadow-lg border-4 border-transparent bg-gradient-to-r from-gray-700 to-gray-700 hover:border-gray-900 focus:ring-4 focus:ring-black-400">
          Stake
        </Button>
        <Button className="px-14 py-5 text-lg font-semibold text-white-100 bg-gray-700 rounded-lg shadow-lg border-4 border-transparent bg-gradient-to-r from-gray-700 to-gray-700 hover:border-gray-900 focus:ring-4 focus:ring-black-400">
          Wager
        </Button>
        <Button className="px-14 py-5 text-lg font-semibold text-white-100 bg-gray-700 rounded-lg shadow-lg border-4 border-transparent bg-gradient-to-r from-gray-700 to-gray-700 hover:border-gray-900 focus:ring-4 focus:ring-black-400">
          Points
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default ScrollButtons;
