import { Link } from "react-router-dom";

// Die 'Article'-Komponente, angepasst an die neue Datenstruktur aus data.json
const Article = ({ name, flags, population, region, capital }) => {
  return (
    <Link to={`/${name}`}>
      <article className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
        {/* Länderflagge */}
        <img
          src={flags.svg}
          alt={`Flag of ${name}`}
          className="w-full h-40 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = flags.png;
          }}
        />
        {/* Länderinformationen */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            {name}
          </h2>
          <ul className="text-gray-700 dark:text-gray-300 space-y-1">
            <li>
              <strong>Population:</strong> {population.toLocaleString("de-DE")}
            </li>
            <li>
              <strong>Region:</strong> {region}
            </li>
            {/* Sicherstellen, dass eine Hauptstadt existiert, bevor sie angezeigt wird */}
            <li>
              <strong>Capital:</strong> {capital || "N/A"}
            </li>
          </ul>
        </div>
      </article>
    </Link>
  );
};

export default Article;
