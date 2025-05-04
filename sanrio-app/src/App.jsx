import { useState } from "react";
import DataFile from "./assets/data_file";  // Ensure this is the correct path to your DataFile.js

// Hash function to map username to character index
function hashUsernameToIndex(username, max) {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % max;
}

export default function App() {
  const [username, setUsername] = useState("");  // To store the username
  const [assigned, setAssigned] = useState(null);  // To store the assigned character

  const handleAssign = () => {
    if (!username.trim()) return;  // Avoid processing empty usernames
    const idx = hashUsernameToIndex(username.trim(), DataFile.all.length);  // Get character index
    setAssigned(DataFile.all[idx]);  // Assign character based on hash
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-300 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-pink-700">
          Sanrio Character Matcher
        </h1>

        <div className="flex items-center justify-center mb-4 gap-2">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}  // Update username state on input change
            className="border border-gray-300 rounded-lg px-4 py-2 w-64 text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={handleAssign}  // Trigger the assign function
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg px-4 py-2 text-lg transition"
          >
            Assign Character
          </button>
        </div>

        {assigned ? (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Hello <span className="text-pink-700">{username}</span>, your Sanrio character is:
            </h2>

            <img
              src={assigned.picUrl}  // Display character image
              alt={assigned.nameEn}  // Alt text for accessibility
              className="w-48 mx-auto my-4 object-contain"
              onError={e => {
                e.currentTarget.src = "https://via.placeholder.com/150?text=No+Image";  // Fallback image if there's an error loading the character image
              }}
            />

            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {assigned.nameEn}  // Display character's English name
            </h3>
          </div>
        ) : (
          <p className="text-red-500 mt-4">
            No character assigned yet. Enter a username and click “Assign Character.”
          </p>
        )}
      </div>
    </div>
  );
}
