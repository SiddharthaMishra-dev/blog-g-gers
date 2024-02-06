"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { DeleteBlog, FetchBlog, UpdateBlog } from "@/actions/actions";
import toast from "react-hot-toast";

const InitialState = {
  id: "",
  title: "",
  hashtags: "",
  content: "",
  likes: [""],
  username: "",
};

const Page = () => {
  const params = useParams();
  let blogId = params.blogId;

  const [formData, setFormData] = useState(InitialState);
  const [deleted, setDeleted] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const fetchBlog = async () => {
    const json = await FetchBlog(blogId);
    setFormData({
      id: json?.id!,
      title: json?.title!,
      hashtags: json?.hashtags!,
      content: json?.content!,
      likes: json?.likes!,
      username: json?.username!,
    });
  };

  const handleSubmit = async () => {
    try {
      const resp = await UpdateBlog(formData);
      toast.success("Post successfully published");
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteBlog = async () => {
    try {
      const resp = await DeleteBlog(params.blogId);
      router.push(`/protected/${params.user}`, { scroll: false });
      setDeleted(true);
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
          className="dark"
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
          <div className="w-full h-screen flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold">Update your thought</h2>
            <div className="p-4 flex flex-col w-3/5 ">
              <label>Title</label>
              <Input
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
                className="font-semibold"
              >
                Edit
              </Button>

              <Button
                color="danger"
                size="lg"
                onPress={onOpen}
                className="font-semibold"
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
