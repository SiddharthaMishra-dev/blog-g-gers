"use client";

import { Blog } from "@/models/UserModel";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import type { Prisma, blogs } from "@prisma/client";

type UpdatedBlogType = blogs & {
  comments: Prisma.JsonArray; // Update this to explicitly specify an array
};

interface CommentModalProps {
  // blog: Blog;
  // isOpen: boolean;
  // onOpenChange: () => void;
  // handleComment: (blog: Blog) => void;
  blog: blogs;
  isOpen: boolean;
  onOpenChange: () => void;
  handleComment: (blog: blogs) => void;
}

const CommentModal = ({ blog, isOpen, onOpenChange, handleComment }: CommentModalProps) => {
  const [comment, setComment] = useState("");
  const [isCommentEmpty, setIsCommentEmpty] = useState(false);
  const [posting, setPosting] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const handleSubmit = (e: any) => {
    if (comment.length > 0) {
      setPosting(true);
      let userName = session?.user?.name || "";
      let tempBlog: blogs = {
        ...blog,
        // comments: [...(blog.comments ?? []), { userName, comment }],
        comments: { userName, comment },
      };
      handleComment(tempBlog);
      onOpenChange();
    } else {
      setIsCommentEmpty(true);
      setTimeout(() => {
        setIsCommentEmpty(false);
      }, 3000);
    }
  };
  return (
    <>
      <Modal
        className="dark"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1>{blog.username}</h1>
              </ModalHeader>
              <ModalBody>
                <div>
                  <Input
                    value={blog.content}
                    readOnly
                  />
                </div>

                <div className=" py-4">
                  <Textarea
                    isInvalid={isCommentEmpty}
                    className="text-lg"
                    placeholder="Add a comment"
                    minRows={5}
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    errorMessage={isCommentEmpty && "Please add a comment"}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  className="font-semibold"
                  onClick={handleSubmit}
                >
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommentModal;
