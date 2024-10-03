import React, { useState } from "react";
import { User } from "../types";
import { Link } from "react-router-dom";

interface UserSearchProps {
  users: User[];
}

const UserSearch: React.FC<UserSearchProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-4">
      <input
        type="text"
        className="border p-2 w-full"
        placeholder="Search for a user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="my-4 flex gap-4">
        {filteredUsers.map((user) => (
          <li key={user.id} className="py-1">
            <Link
              to={`/users/${user.id}`}
              className="text-blue-500 hover:underline"
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
