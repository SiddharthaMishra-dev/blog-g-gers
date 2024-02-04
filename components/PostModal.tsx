"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/progress";
import toast from "react-hot-toast";
import { PostBlog } from "@/actions/actions";

const InitialState = {
  title: "",
  hashtags: "",
  content: "",
  likes: [],
  comments: [],
};

interface PostModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  setfunction: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostModal({ isOpen, onOpenChange, setfunction }: PostModalProps) {
  const [formData, setFormData] = useState(InitialState);
  const [posting, setPosting] = useState(false);
  const { data: session } = useSession();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setPosting(true);
      // const response = await fetch("/api/user", {
      //   method: "POST",
      //   body: JSON.stringify({ ...formData, session }),
      // });
      await PostBlog(formData);
      setPosting(false);
      setfunction(true);
      onOpenChange();
      toast.success("Post successfully published");
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  const resetForm = () => {
    setFormData(InitialState);
  };

  return (
    <>
      <Modal
        className="dark"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-primary text-center">
                  Jot down your thought
                </h2>
              </ModalHeader>
              <ModalBody>
                <div className="w-full flex flex-col justify-center items-center gap-y-4">
                  <div className="p-1 flex flex-col w-full gap-y-2 ">
                    <Input
                      size="lg"
                      placeholder="title..."
                      name="title"
                      className=" p-2 text-lg "
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="p-1 flex flex-col w-full gap-y-2">
                    <Input
                      size="lg"
                      placeholder="hashtags..."
                      name="hashtags"
                      className=" p-2 text-2xl"
                      value={formData.hashtags}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="p-1 flex flex-col w-full gap-y-2">
                    <Textarea
                      size="lg"
                      minRows={10}
                      name="content"
                      className="p-2 text-lg"
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="write your thoughts..."
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  size="lg"
                  onPress={onClose}
                >
                  Exit
                </Button>
                {posting ? (
                  <CircularProgress aria-label="loading..." />
                ) : (
                  <Button
                    color="primary"
                    size="lg"
                    onClick={handleSubmit}
                  >
                    Post
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
