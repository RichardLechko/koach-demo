import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import UserProfile from "./components/UserProfile";
import UserActivities from "./components/UserActivities";
import UserSearch from "./components/UserSearch";
import { User, Post } from "./types";
import Footer from "./components/Footer";
import NotFoundPage from "./components/NotFoundPage";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("Error fetching users");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return <p className="text-center text-gray-600">Loading users...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto mt-8 mb-16 p-16 bg-white rounded-lg shadow-lg flex-grow">
          <h1 className="text-3xl font-bold text-center mb-4">User Search</h1>

          <UserSearch users={users} />

          <Routes>
            <Route path="/" element={<Navigate to="/users" />} />

            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

const UserList: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl text-center mt-16 font-semibold">
        Welcome to User List
      </h2>
    </div>
  );
};

const UserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      setNotFound(false);

      try {
        const userResponse = await axios.get<User>(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        setUser(userResponse.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setNotFound(true);
          } else {
            setError(err.message);
          }
        } else {
          setError("Error fetching user data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, id]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (user) {
        try {
          const response = await axios.get<Post[]>(
            `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
          );
          setPosts(response.data);
        } catch (err: unknown) {
          if (axios.isAxiosError(err)) {
            setError(err.message);
          } else {
            setError("Error fetching user activities");
          }
        }
      }
    };

    fetchUserPosts();
  }, [user, userId]);

  if (loading) return <p>Loading...</p>;
  if (notFound)
    return (
      <p className="text-red-500 text-center text-xl underline">
        User not found.
      </p>
    );
  if (error)
    return (
      <p className="text-red-500 text-center text-xl underline">{error}</p>
    );

  return (
    <div>
      {user && (
        <>
          <UserProfile name={user.name} email={user.email} phone={user.phone} />
          <UserActivities posts={posts} userId={user.id} />
        </>
      )}
    </div>
  );
};

export default App;
