import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../utils/api";

function NavBar() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then((categoriesFromApi) => {
      setCategories(categoriesFromApi);
    });
  }, []);

  function handleClick(category) {
    navigate(`/category/${category}`);
  }

  return (
    <nav className="navbar">
      <p>filter by game category: </p>
      <ul className="navbar--list">
        {categories.map((category) => {
          return (
            <li className="navbar--list-item" key={category.slug}>
              <button
                className="navbar--button"
                onClick={() => handleClick(category.slug)}
              >
                {category.slug}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
