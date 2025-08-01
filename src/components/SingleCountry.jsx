import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import countriesData from "/data.json?url&raw";

export const SingleCountry = () => {
  const { name } = useParams();

  const singleCountry = JSON.parse(countriesData).find(
    (country) => country.name === name
  );

  // Setze den Dokumententitel, wenn sich der Name ändert
  useEffect(() => {
    if (singleCountry) {
      document.title = `Countries | ${singleCountry.name.common}`;
    }
  }, [name, singleCountry]);

  // Zeige eine Meldung, wenn das Land nicht gefunden wurde
  if (!singleCountry) {
    return (
      <div className="p-8 text-center dark:text-white">
        <h1 className="text-2xl font-bold">Country not found</h1>
        <Link
          to="/"
          className="inline-block mt-8 bg-white py-2 px-6 rounded shadow text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200">
          &larr; Back to all countries
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="p-8 md:py-0 max-w-7xl mx-auto dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center md:h-screen">
          <article>
            <img
              src={singleCountry.flags.svg}
              alt={singleCountry.name.common}
            />
          </article>
          <article>
            <h1 className="font-bold text-gray-900 dark:text-white text-4xl lg-text-6xl mb-8">
              {singleCountry.name}
            </h1>
            <ul className="mt-4 flex flex-col items-start justify-start gap-2 text-slate-700 dark:text-gray-400 mb-3">
              <li>Capital: {singleCountry.capital}</li>
              <li>Population: {singleCountry.population.toLocaleString()}</li>
              <li>Region: {singleCountry.region}</li>

              {singleCountry.subregion && (
                <li>Subregion: {singleCountry.subregion}</li>
              )}

              <li>
                Languages:{" "}
                {singleCountry.languages &&
                  Object.values(singleCountry.languages)
                    .map((lang) => lang.name || lang) // Extrahiert den Namen oder nimmt den Wert, falls es doch nur ein String ist
                    .join(", ")}
              </li>
              <li>
                Currencies:{" "}
                {singleCountry.currencies &&
                  Object.values(singleCountry.currencies)
                    .map((currency) => currency.name)
                    .join(", ")}
              </li>
            </ul>

            {singleCountry.borders && singleCountry.borders.length > 0 && (
              <>
                <h3 className="text-gray-900 font-bold text-lg mb-2 dark:text-white">
                  Borders:
                </h3>
                <ul className="flex flex-wrap items-start justify-start gap-2">
                  {singleCountry.borders.map((border, index) => (
                    <li
                      className="text-xs px-2 py-2 bg-white text-gray rounded tracking-wide shadow dark:bg-gray-800 dark:text-gray-400"
                      key={index}>
                      {border}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <Link
              to="/"
              className="inline-block mt-8 bg-white py-2 px-6 rounded shadow text-gray-700 hover:bg-gray-200 trasition-all duration-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200">
              &larr; Back
            </Link>
          </article>
        </div>
      </section>
    </>
  );
};
