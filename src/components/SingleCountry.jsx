import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export const SingleCountry = () => {
  const [country, setCountry] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const getSingleCountry = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await res.json();
        setCountry(data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleCountry();
  }, [name]);

  useEffect(() => {
    document.title = `Countries | ${name}`;
  }, [name]);

  return (
    <>
      <section className="p-8 md:py-0 max-w-7xl mx-auto dark:bg-gray-800">
        {country.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center md:h-screen">
            <article>
              <img src={item.flags.svg} alt={item.name.common} />
            </article>
            <article>
              <h1 className="font-bold text-gray-900 dark:text-white text-4xl lg-text-6xl mb-8">
                {item.name.official}
              </h1>
              <ul className="mt-4 flex flex-col items-start justify-start gap-2 text-slate-700 dark:text-gray-400 mb-3">
                <li>Capital: {item.capital[0]}</li>
                <li>Population: {item.population.toLocaleString()}</li>
                <li>Region: {item.region}</li>
                {!item.subregion || <li>Subregion: {item.subregion}</li>}
                <li>
                  Languages:{" "}
                  {item.languages &&
                    Object.values(item.languages || {}).join(", ")}
                </li>
                <li>
                  Currencies:{" "}
                  {Object.values(item.currencies || {})
                    .map((currency) => currency.name)
                    .join(", ")}
                </li>
              </ul>

              {item.borders && (
                <>
                  <h3 className="text-gray-900 font-bold text-lg mb-2 dark:text-white">
                    Borders:
                  </h3>
                  <ul className="flex flex-wrap items-start justify-start gap-2">
                    {item.borders.map((border, index) => (
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
        ))}
      </section>
    </>
  );
};
