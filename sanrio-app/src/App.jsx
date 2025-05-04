import { useState, useEffect } from "react";

function App() {
  const [characters, setCharacters] = useState([]);
  const [username, setUsername] = useState("");
  const [assignedCharacter, setAssignedCharacter] = useState(null);

  useEffect(() => {
    fetch("/assets/sanrio.json")
      .then((res) => res.json())
      .then((data) => setCharacters(data.characters || data.scenario.characters));
  }, []);

  const handleAssign = () => {
    if (!username.trim()) return;

    const hash = [...username].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const character = characters[hash % characters.length];
    setAssignedCharacter(character);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        ✨ Sanrio Character Matcher ✨
      </h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button
          onClick={handleAssign}
          className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
        >
          Find My Character
        </button>
      </div>

      {assignedCharacter && (
        <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-sm">
          <h2 className="text-2xl font-semibold text-pink-700 mb-2">{assignedCharacter.name}</h2>
          <img
            src={assignedCharacter.image}
            alt={assignedCharacter.name}
            className="w-48 h-48 object-contain mx-auto mb-4"
          />
          <p className="text-gray-700">{assignedCharacter.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;