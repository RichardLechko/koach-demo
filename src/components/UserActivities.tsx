import React from "react";
import { Post } from "../types";

interface UserActivitiesProps {
  posts: Post[];
  userId: number;
}

const UserActivities: React.FC<UserActivitiesProps> = ({ posts }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">User Activities:</h2>
      <div className="shadow-lg rounded-xl bg-gray-100 p-4">
        {posts.length === 0 ? (
          <p>No activities found.</p>
        ) : (
          <ul className="list-disc list-inside">
            {posts.map((post) => (
              <li key={post.id} className="mt-2 list-none">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="pl-4 py-2">
                  <span className="mr-1">&#8226;</span> {post.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserActivities;
