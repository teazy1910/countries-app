import { useState, useEffect } from "react";
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
      matches: (country) => country.region === "Europe",
    },
    {
      name: "Asia",
      matches: (country) => country.region === "Asia",
    },
    {
      name: "Africa",
      matches: (country) => country.region === "Africa",
    },
    {
      name: "Americas",
      matches: (country) => country.region === "Americas",
    },
    {
      name: "Oceania",
      matches: (country) => country.region === "Oceania",
    },
  ];

  useEffect(() => {
    loadCountries().then(setCountries);
  }, []);

  async function loadCountries() {
    return await fetch("/src/data.json").then((response) => response.json());
  }

  async function searchCountry() {
    const res = await fetch("./data.json");
    return res;
  }

  function filterByRegion(filterIndex) {
    let regionFilter = regions[filterIndex];
    loadCountries()
      .then((reloadedCountries) =>
        reloadedCountries.filter(regionFilter.matches)
      )
      .then(setCountries);
  }

  function handleSearchCountry(e) {
    e.preventDefault();
    searchCountry();
  }

  function handleFilterByRegion(e) {
    e.preventDefault();
    // filterByRegion();
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
                  {regions.map((region, index) => (
                    <option key={index} value={index}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </form>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {countries.map((country) => (
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
