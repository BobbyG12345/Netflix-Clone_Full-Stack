import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import axios from "axios";
import { Trash } from "lucide-react";

const SearchHistoryPage = () => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/search/history/${id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const [searchHistory, setSearchHistory] = useState([]);
  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get(`/api/v1/search/history`);
        const unique = res.data.content.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );
        setSearchHistory(unique);
      } catch (error) {
        setSearchHistory([]);
      }
    };

    getSearchHistory();
  }, []);

  if (searchHistory?.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory.map((entry) => (
            <div
              key={entry.id}
              className="bg-gray-800 p-4 rounded flex items-center space-x-4"
            >
              <img
                src={SMALL_IMG_BASE_URL + entry.image}
                alt="History image"
                className="w-16 h-16 rounded object-cover mr-4"
              />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-white text-lg line-clamp-2 overflow-hidden">
                  {entry.title}
                </span>
                <div className="flex justify-between items-center mt-1">
                  <span
                    className={`inline-flex flex-0.5 items-center justify-center font-medium text-[10px] py-0.5 px-1.5 rounded-full  whitespace-nowrap ${
                      entry.searchType === "movie"
                        ? "bg-red-600"
                        : entry.searchType === "tv"
                        ? "bg-blue-600"
                        : "bg-green-600"
                    }`}
                  >
                    {entry.searchType[0].toUpperCase() +
                      entry.searchType.slice(1)}
                  </span>
                  <span className="text-gray-400 items-center justify-center text-sm mr-7">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
              </div>

              <Trash
                className="size-5 ml-4 shrink-0 cursor-pointer hover:fill-red-600 hover:text-red-600"
                onClick={() => handleDelete(entry.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;

function formatDate(dateString) {
  // Create a Date object from the input date string
  const date = new Date(dateString);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract the month, day, and year from the Date object
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  // Return the formatted date string
  return `${month} ${day}, ${year}`;
}
