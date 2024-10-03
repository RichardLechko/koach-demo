import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">The user you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;
