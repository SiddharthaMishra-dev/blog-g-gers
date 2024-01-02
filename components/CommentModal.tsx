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
import toast from "react-hot-toast";

interface CommentModalProps {
  blog: Blog;
  isOpen: boolean;
  onOpenChange: () => void;
}

const CommentModal = ({ blog, isOpen, onOpenChange }: CommentModalProps) => {
  const [comment, setComment] = useState("");
  const [isCommentEmpty, setIsCommentEmpty] = useState(false);
  const [posting, setPosting] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const handleSubmit = async (e: any) => {
    if (comment.length > 0) {
      setPosting(true);
      let userName = session?.user?.name;
      let tempBlog = { ...blog, comments: [...blog.comments!, { userName, comment }] };
      const form = {
        session: session,
        blog: tempBlog,
      };

      try {
        const response = await fetch("/api/user", {
          method: "PUT",
          body: JSON.stringify(form),
        });
        if (response.ok) {
          onOpenChange();
          toast.success("Comment posted!");
          return router.refresh();
        }
      } catch (err) {
        console.log(err);
      }
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
