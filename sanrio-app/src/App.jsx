import { useState } from "react";
import sanrioData from "./assets/sanrio.json"; // import the JSON directly

function hashUsernameToIndex(username, maxId) {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % maxId;
}

function App() {
  const [username, setUsername] = useState("");
  const [assignedCharacter, setAssignedCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const characters = sanrioData.characters || sanrioData.scenario.characters;

  const handleAssign = () => {
    if (!username.trim()) return;
    setLoading(true);
    setAssignedCharacter(null); // Clear previous result
    setTimeout(() => {
      const id = hashUsernameToIndex(username.trim(), characters.length);
      setAssignedCharacter(characters[id]);
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-300 flex items-center justify-center relative overflow-hidden">
      {/* Cloud & Heart Styles */}
      <style>
        {`
          @keyframes float {
            0% {
              opacity: 0;
              transform: translateY(0) scale(1);
            }
            50% {
              opacity: 1;
              transform: translateY(-50px) scale(1.2);
            }
            100% {
              opacity: 0;
              transform: translateY(-100px) scale(0.8);
            }
          }

          @keyframes cloudMove {
            0% { transform: translateX(-200px); }
            100% { transform: translateX(100vw); }
          }

          .floating-heart {
            position: absolute;
            color: #f472b6;
            animation: float 3s ease-in-out infinite;
            font-size: 1.5rem;
            opacity: 0;
          }

          .animate-cloud {
            animation: cloudMove 60s linear infinite;
            position: absolute;
            color: white;
            opacity: 0.7;
            font-size: 2.5rem;
          }
        `}
      </style>

      {/* Floating SVG Clouds */}
      <div className="absolute w-full h-full top-0 left-0 overflow-hidden z-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-cloud"
            style={{
              top: `${10 + i * 20}%`,
              left: `${-200 + i * 100}px`,
              animationDelay: `${i * 10}s`,
            }}
          >
            ☁️
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl text-center relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-pink-700">
          Sanrio Character Matcher
        </h1>

        <div className="flex items-center justify-center mb-4 gap-2">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-64 text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={handleAssign}
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg px-4 py-2 text-lg transition"
          >
            Assign Character
          </button>
        </div>

        {loading ? (
          <div className="relative mt-6 h-48 flex flex-col items-center justify-center">
            <p className="text-pink-600 text-xl mb-4">
              Matching you with a Sanrio character...
            </p>
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="floating-heart"
                style={{
                  left: `${10 + i * 12}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                ❤️
              </span>
            ))}
          </div>
        ) : assignedCharacter ? (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Hello{" "}
              <span className="text-pink-700">{username}</span>, your Sanrio
              character is:
            </h2>

            {/* Debug log */}
            {console.log("Character image URL:", assignedCharacter.image)}

            <img
              src={assignedCharacter.image}
              alt={assignedCharacter.name}
              className="w-48 mx-auto my-4 object-contain"
              onError={(e) => {
                console.error("❌ image failed to load:", assignedCharacter.image);
                e.currentTarget.src =
                  "https://via.placeholder.com/150?text=Image+Unavailable";
              }}
            />

            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {assignedCharacter.name}
            </h3>
            <p className="italic text-gray-500">
              {assignedCharacter.description}
            </p>
          </div>
        ) : (
          <p className="text-red-500 mt-4">
            No character found for that username. Try another one!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
