import React from "react";

interface UserProfileProps {
  name: string;
  email: string;
  phone: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email, phone }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-6">
      <h1 className="text-4xl font-bold text-gray-800">User Profile </h1>
      <div className="mt-4">
        <p className="text-gray-700">
          <span className="font-semibold">Name:</span> {name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Email: </span>
          <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
            {email}
          </a>
        </p>

        <p className="text-gray-700">
          <span className="font-semibold">Phone:</span> {phone}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
