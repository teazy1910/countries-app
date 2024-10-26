import React from "react";
import { Link } from "react-router-dom";

const Article = ({ flags, name, population, region, subregion, capital }) => {
  return (
    <>
      <Link to={`/${name.common}`}>
        <article className="bg-white dark:bg-gray-800 dark:hover:bg-gray-700 transition-all-duration-200 hover:bg-gray-200 rounded-lg shadow overflow-hidden">
          <img
            src={flags.svg}
            alt=""
            className="md:w-62 h-48 w-full object-contain"
          />
          <div className="p-2">
            <h2 className="font-bold text-lg text-gray-900 mb-2 dark:text-white">
              {name.common}
            </h2>
            <ul className="flex flex-col items-start justify-start gap-2 dark:text-gray-400">
              <li>Population: {population.toLocaleString()}</li>
              <li>Region: {region}</li>
              <li>Subregion: {subregion}</li>
              <li>Capital: {capital}</li>
            </ul>
          </div>
        </article>
      </Link>
    </>
  );
};

export default Article;
