import { Blog } from "@/models/UserModel";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

interface CommentModalProps {
  blog: Blog;
  isOpen: boolean;
  onOpenChange: () => void;
}

const CommentModal = ({ blog, isOpen, onOpenChange }: CommentModalProps) => {
  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);
  const { data: session } = useSession();
  const handleSubmit = async (e: any) => {
    if (comment.length > 0) {
      setPosting(true);
      let userName = session?.user?.name;
      let tempBlog = { ...blog, comments: [{ userName, comment }] };
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
          console.log("success");
        }
      } catch (err) {
        console.log(err);
      }
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
                  <Input
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
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
