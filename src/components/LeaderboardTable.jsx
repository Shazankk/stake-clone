import PropTypes from "prop-types";

const LeaderboardTable = ({ data, category }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-300">No data available</p>;
  }

  // const hasPrize = data.some(
  //   (row) => row.prize !== "NA" && row.prize !== undefined
  // );

  return (
    <div className="overflow-auto">
      <table className="table-auto w-full bg-gray-900 text-white rounded-lg shadow-lg">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-bold">Rank</th>
            <th className="px-6 py-3 text-left text-sm font-bold">User</th>
            <th className="px-6 py-3 text-left text-sm font-bold">
              {category === "Points" ? "Points" : "Wagered"}
            </th>
            {category !== "Points" && (
              <th className="px-6 py-3 text-left text-sm font-bold">
                {category === "Wager Raffle" ? "Tickets" : "Prize"}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="px-6 py-4 text-left">{row.rank || index + 1}</td>
              <td className="px-6 py-4 text-left">{row.user || row.name}</td>
              <td className="px-6 py-4 text-left">
                {category === "Points"
                  ? row.wagered?.toLocaleString() || "0"
                  : `$${row.wagered?.toLocaleString() || "0"}`}
              </td>
              {category !== "Points" && (
                <td className="px-6 py-4 text-left">
                  {category === "Wager Raffle"
                    ? row.prize
                      ? row.prize.toLocaleString()
                      : "N/A"
                    : row.prize
                    ? `$${row.prize.toLocaleString()}`
                    : "N/A"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

LeaderboardTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      rank: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      user: PropTypes.string,
      name: PropTypes.string,
      wagered: PropTypes.number.isRequired,
      prize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      tickets: PropTypes.number,
    })
  ).isRequired,
  category: PropTypes.string.isRequired,
};

export default LeaderboardTable;
