// src/components/LeaderboardTable.jsx

import { Table } from "flowbite-react";
import PropTypes from "prop-types";

const LeaderboardTable = ({ data }) => {
  // Limit the data to 25 rows
  const limitedData = data.slice(3, 53);

  return (
    <div className="overflow-y-auto max-h-auto w-full">
      <Table className="w-full bg-gray-900 text-white rounded-lg shadow-lg">
        <Table.Head className="sticky top-0 bg-gray-800 z-10">
          <Table.HeadCell className="text-left text-gray-100 font-bold w-12 border-b border-gray-600">
            Rank
          </Table.HeadCell>
          <Table.HeadCell className="text-left text-gray-100 font-bold w-1/3 border-b border-gray-600">
            User
          </Table.HeadCell>
          <Table.HeadCell className="text-left text-gray-100 font-bold w-1/3 border-b border-gray-600">
            Wagered
          </Table.HeadCell>
          <Table.HeadCell className="text-left text-gray-100 font-bold w-1/3 border-b border-gray-600">
            Prize
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-700">
          {limitedData.map((row, index) => (
            <Table.Row
              key={index}
              className="bg-gray-800 hover:bg-gray-700 text-lg"
            >
              <Table.Cell className="font-bold text-center text-gray-400 w-12">
                {index + 4}
              </Table.Cell>
              <Table.Cell className="py-4 px-6 w-1/3">
                <span>{row.user}</span>
              </Table.Cell>
              <Table.Cell className="py-4 px-6 text-green-400 font-semibold w-1/3">
                ${row.wagered.toLocaleString()}
              </Table.Cell>
              <Table.Cell className="py-4 px-6 font-semibold w-1/3">
                ${row.price}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

LeaderboardTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string.isRequired,
      wagered: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default LeaderboardTable;
