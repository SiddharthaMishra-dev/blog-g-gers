"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Button,
  Input,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

import toast from "react-hot-toast";
import getBlogById from "@/actions/getBlogById";

const InitialState = {
  title: "",
  hashtags: "",
  content: "",
  likes: [],
};

const Page = () => {
  const params = useParams();
  const [formData, setFormData] = useState(InitialState);
  const [deleted, setDeleted] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const fetchBlog = async () => {
    const json = await getBlogById(params.blogId);
    setFormData({ ...json });
  };

  const handleSubmit = async () => {
    try {
      let url = `/api/user/${params.blogId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      toast.success("Post successfully published");
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteBlog = async () => {
    const url = `/api/user/${params.blogId}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.status === 1) {
        router.push(`/protected/${params.user}`, { scroll: false });
        setDeleted(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <>
      <div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col text-center gap-1 text-blue-400">
                  Are you sure
                </ModalHeader>
                <ModalBody>
                  <div className="flex justify-center gap-9">
                    <Button
                      color="danger"
                      variant="flat"
                      onClick={handleDeleteBlog}
                    >
                      Yes
                    </Button>
                    <Button
                      color="primary"
                      variant="flat"
                    >
                      No
                    </Button>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
        <form>
          {/* <Snackbar
            message="Your Blog has been edited"
            show={snackbarVisible}
          /> */}

          <div className="w-full h-screen flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold">Jot down your thought</h2>
            <div className="p-4 flex flex-col w-3/5 ">
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
            <div className="p-4 flex flex-col w-3/5 ">
              <label>Hastags</label>
              <Input
                size="lg"
                placeholder="hashtags"
                name="hashtags"
                className=" p-2 text-2xl"
                value={formData.hashtags}
                onChange={handleChange}
              />
            </div>
            <div className="p-4 flex flex-col w-3/5 ">
              <label>Content</label>
              <Textarea
                color="primary"
                size="lg"
                rows={20}
                cols={40}
                name="content"
                className="p-2 text-lg"
                value={formData.content}
                onChange={handleChange}
              />
            </div>
            <div className="flex  gap-6">
              <Button
                color="primary"
                size="lg"
                onClick={handleSubmit}
              >
                Edit
              </Button>

              <Button
                color="danger"
                size="lg"
                onPress={onOpen}
              >
                Delete your Blog
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
