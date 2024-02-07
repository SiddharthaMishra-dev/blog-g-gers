import { create } from "zustand";
import { Blog } from "../models/UserModel";
interface BlogStoreProps {
  blogs: Blog[];
  addBlogs: (blogs: Blog[]) => void;
}

export const useBlogStore = create<BlogStoreProps>((set) => ({
  blogs: [],
  addBlogs: (blogs: Blog[]) => set(() => ({ blogs: blogs })),
}));
