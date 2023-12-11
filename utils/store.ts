import { create } from "zustand";
import { Blog } from "../models/UserModel";
import getBlogs from "@/actions/getBlogs";

interface BlogProps {
  blogs: Blog[];
  addBlogs: (blogs: Blog[]) => void;
}

export const useBlogStore = create((set) => ({
  blogs: [],
  addBlogs: (blogs: Blog[]) => set(() => ({ blogs: blogs })),
}));
