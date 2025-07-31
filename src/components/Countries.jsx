import { useState, useEffect } from "react";
import Article from "./Article";

// Die Hauptkomponente zur Anzeige der Länder
const Countries = () => {
  // --- State-Variablen ---
  const [searchText, setSearchText] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  // Da die Daten lokal sind, ist ein Ladezustand nicht mehr unbedingt nötig.
  // Für den Fall, dass die Daten doch mal asynchron geladen werden.
  const [isLoading, setIsLoading] = useState(true);

  // Definition der verfügbaren Regionen für das Filter-Dropdown
  const regions = [
    "Filter by region",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
    "Polar",
  ];

  // --- Effekte (useEffect) ---

  // 1. Effekt: Lädt die Länderdaten einmalig aus der lokalen data.json Datei.
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("/src/data.json");
        const data = await response.json();
        setAllCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error("Fehler beim Laden der Länderdaten:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // 2. Effekt: Filtert die Länderliste bei Änderungen.
  useEffect(() => {
    let data = allCountries;

    if (searchText) {
      data = data.filter(
        (country) =>
          country.name &&
          country.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedRegion && selectedRegion !== "Filter by region") {
      data = data.filter((country) => country.region === selectedRegion);
    }

    setFilteredCountries(data);
  }, [searchText, selectedRegion, allCountries]);

  // --- Render-Methode ---

  if (isLoading) {
    return (
      <h1 className="text-gray-900 font-bold uppercase tracking-wide flex items-center justify-center text-center h-screen text-4xl dark:text-white dark:bg-gray-800">
        Loading...
      </h1>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen">
      <section className="container mx-auto p-8">
        {/* Kopfbereich mit Such- und Filterfeldern */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          {/* Suchformular */}
          <div className="max-w-md md:flex-1">
            <input
              type="text"
              name="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              id="search"
              placeholder="Search for a country..."
              className="py-3 px-4 text-gray-800 placeholder-gray-400 w-full shadow rounded-md outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-700 dark:focus:bg-gray-600 transition-all duration-200"
            />
          </div>

          {/* Regionsfilter-Dropdown */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            name="filter-by-region"
            id="filter-by-region"
            className="w-52 py-3 px-4 outline-none shadow rounded-md text-gray-600 dark:text-gray-400 dark:bg-gray-700 dark:focus:bg-gray-600 transition-all duration-200">
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Gitteransicht der Länder */}
        {filteredCountries.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredCountries.map((country) => (
              <Article key={country.name} {...country} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300 mt-8">
            No countries found matching your criteria.
          </p>
        )}
      </section>
    </div>
  );
};

export default Countries;
