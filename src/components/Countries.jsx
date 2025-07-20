import { useState } from "react";
import countriesData from "../data.json";
import Article from "./Article";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const regions = [
    {
      name: "Filter by region",
    },
    {
      name: "Europe",
    },
    {
      name: "Asia",
    },
    {
      name: "Africa",
    },
    {
      name: "Americas",
    },
    {
      name: "Oceania",
    },
  ];

  async function searchCountry() {
    const res = fetch("/src/data.json");
    const data = await res.json();
    setCountries(data);
  }
  async function filterByRegion(region) {
    const res = fetch("/src/data.json");
    const data = await res.json();
    setCountries(data);
  }

  function handleSearchCountry(e) {
    e.preventDefault();
    searchCountry();
  }

  function handleFilterByRegion(e) {
    e.preventDefault();
    searchCountry();
  }

  return (
    <>
      <div className="dark:bg-gray-800">
        {!countries ? (
          <h1 className="text-gray-900 font-bold uppercase tracking-wide flex items-center justify-center text-center h-screen text-4xl dark:text-white dark:bg-gray-800">
            Loading..
          </h1>
        ) : (
          <section className="container mx-auto p-8 dark:bg-gray-800">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
              <form
                onSubmit={handleSearchCountry}
                autoComplete="off"
                className="max-w-4xl md:flex-1">
                <input
                  type="text"
                  name="search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  id="search"
                  placeholder="Search for a country by its name"
                  required
                  className="py-3 px-4 text-gray-800 placeholder-gray-400 w-full shadow rounded outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700 transition-all duration-200"
                />
              </form>
              <form onSubmit={handleFilterByRegion}>
                <select
                  value={regions.name}
                  onChange={(e) => filterByRegion(e.target.value)}
                  name="filter-by-region"
                  id="filter-by-region"
                  className="w-52 py-3 px-4 outline-none shadow rounded text-gray-600 dark:text-gray-400 dark:bg-gray-800  dark:focus:bg-gray-700">
                  {countriesData.map((region, index) => (
                    <option key={index} value={region.name}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </form>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {countriesData.map((country) => (
                <Article key={country.name} {...country} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Countries;
