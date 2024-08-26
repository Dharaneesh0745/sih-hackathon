import React, { useState } from "react";

const Rank = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const users = [
    { rank: 1, name: "Dinesh", points: 5000 },
    { rank: 2, name: "Robin", points: 4500 },
    { rank: 3, name: "Muge", points: 4000 },
    { rank: 4, name: "Daddy", points: 3000 },
    { rank: 5, name: "Muthu Raja", points: 2999 },
    { rank: 6, name: "Krishnan", points: 2900 },
    { rank: 7, name: "Sujan", points: 2850 },
    { rank: 8, name: "Manickam", points: 2800 },
    { rank: 9, name: "Shaakthi", points: 2750 },
    { rank: 10, name: "Afsal", points: 2700 },
    { rank: 11, name: "Sanjeevi", points: 2650 },
    { rank: 12, name: "Dharaneesh", points: 2500 },
    { rank: 13, name: "Deepak", points: 2550 },
    { rank: 14, name: "Harshad", points: 2400 },
    { rank: 15, name: "Aathiyan", points: 2350 },
    // Add more users here...
  ];

  // Calculate the current users to display
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="max-h-screen bg-gray-100 flex items-center justify-center py-4 px-2 sm:px-4 lg:px-8 pt-9 pb-6">
        <div className="w-full max-w-8xl space-y-4">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Leaderboard
          </h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden ">
            <table className="min-w-full">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user) => (
                  <tr
                    key={user.rank}
                    className="hover:bg-gray-50 transform hover:-translate-y-1 hover:shadow-xl transition-all"
                  >
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.rank}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <img
                            className="h-8 w-8 rounded-full shadow-lg"
                            src="logo512.png"
                            alt={user.name}
                          />
                        </div>
                        <div className="ml-2">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.points}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center py-4">
              <button
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handleClick(i + 1)}
                  className={`px-3 py-1 mx-1 ${
                    currentPage === i + 1
                      ? "bg-blue-700 text-white"
                      : "bg-blue-500 text-white"
                  } rounded`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 mx-1 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rank;
