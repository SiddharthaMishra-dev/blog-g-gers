"use client";

import React from "react";
import { useState, useEffect } from "react";
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

const InitialState = {
  title: "",
  hashtags: "",
  content: "",
  likes: [],
};

export default function PostModal({ isOpen, onOpenChange, setfunction }) {
  const [formData, setFormData] = useState(InitialState);
  const [posting, setPosting] = useState(false);
  const { data: session } = useSession();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPosting(true);
      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ ...formData, session }),
      });
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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <div className="w-full flex flex-col justify-center items-center">
                  <h2 className="text-2xl font-bold text-gray-700">Jot down your thought</h2>
                  <div className="p-1 flex flex-col w-full ">
                    <label>Title</label>
                    <Input
                      color="primary"
                      size="lg"
                      placeholder="title"
                      name="title"
                      className=" p-2 text-lg "
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="p-1 flex flex-col w-full ">
                    <label>Hastags</label>
                    <Input
                      color="secondary"
                      size="lg"
                      placeholder="hashtags"
                      name="hashtags"
                      className=" p-2 text-2xl"
                      value={formData.hashtags}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="p-1 flex flex-col w-full ">
                    <label>Content</label>
                    <Textarea
                      color="primary"
                      size="lg"
                      minRows={10}
                      // cols={40}
                      name="content"
                      className="p-2 text-lg"
                      value={formData.content}
                      onChange={handleChange}
                    />
                  </div>
                  {/* <div>
                    <Button color="primary" size="lg" onClick={handleSubmit}>
                      Post
                    </Button>
                  </div> */}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
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
