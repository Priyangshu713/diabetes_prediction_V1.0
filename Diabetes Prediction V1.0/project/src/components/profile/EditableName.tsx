import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';

export default function EditableName() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleNameSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          autoFocus
        />
        <button
          type="submit"
          className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Save
        </button>
      </form>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <h1 className="text-3xl font-bold text-white">
        Hi {name} <span className="wave">👋</span>
      </h1>
      <button
        onClick={() => setIsEditing(true)}
        className="p-1.5 rounded-full hover:bg-gray-800/50 transition-colors"
      >
        <Edit2 className="h-4 w-4 text-gray-400" />
      </button>
    </div>
  );
}