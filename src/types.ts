export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface UserProfileProps {
  name: string;
  email: string;
  phone: string;
}

export interface UserActivitiesProps {
  posts: Post[];
  userId: number;
}

export interface UserSearchProps {
  users: User[];
}
