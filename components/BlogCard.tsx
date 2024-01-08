import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";

import { Blog } from "@/models/UserModel";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";

interface CardProps {
  blog: Blog;
  handleLike: (blog: Blog) => void;
  handleComment: (blog: Blog) => void;
}

const BlogCard = ({ blog, handleLike, handleComment }: CardProps) => {
  return (
    <>
      <Card className="w-full p-2 m-4 bg-theme text-cyan-50 font-semibold  drop-shadow-2xl ">
        <CardHeader className="text-2xl p-4">{blog.title}</CardHeader>
        <CardBody className="p-4">{blog.content}</CardBody>
        <CardFooter className="p-4 flex justify-between items-center">
          <div className="flex justify-center items-center gap-x-6">
            <LikeButton
              blog={blog}
              handleLike={handleLike}
            />
            <CommentButton
              blog={blog}
              handleComment={handleComment}
            />
          </div>
          <div className="p-4 bg-slate-900 rounded-lg">{blog.username}</div>
        </CardFooter>
      </Card>
    </>
  );
};

export default BlogCard;
