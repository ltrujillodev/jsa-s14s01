import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]); // Estado para los personajes
  const [search, setSearch] = useState(""); // Estado para el texto de búsqueda
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    fetchCharacters(); // Llama a la API cuando el componente se carga
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      setCharacters(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Filtrar personajes según el texto de búsqueda
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <h1>Rick and Morty: Personajes</h1>
        <input
          type="text"
          placeholder="Buscar personaje..."
          value={search}
          onChange={handleSearch}
          className="search-input"
        />
      </header>
      <main>
        {loading ? (
          <p className="loading">Cargando personajes...</p>
        ) : (
          <div className="gallery">
            {filteredCharacters.map((character) => (
              <div className="gallery-item" key={character.id}>
                <img
                  src={character.image}
                  alt={character.name}
                  className="gallery-image"
                />
                <p className="character-name">{character.name}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer>
        <div className="container">
          <p>
            &copy; 2024 Luis Trujillo<br></br>Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
