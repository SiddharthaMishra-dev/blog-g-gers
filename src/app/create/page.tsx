"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { redirect, useRouter } from "next/navigation";
import Snackbar from "../../components/Snackbar";

const InitialState = {
  title: "",
  hashtags: "",
  content: "",
  likes: [],
};

export default function Index() {
  const [formData, setFormData] = useState(InitialState);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { data: session } = useSession();
  const showMessage = () => {
    setSnackbarVisible(true);

    // Hide the Snackbar after a certain duration (e.g., 3 seconds)
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ ...formData, session }),
    });
    showMessage();
    resetForm();
    redirect("/blogs");
  };

  const resetForm = () => {
    setFormData(InitialState);
  };

  if (session === null) {
    redirect("/signin");
  }

  return (
    <div>
      <form>
        <Snackbar message="Your Blog has been posted" show={snackbarVisible} />
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
              minRows={10}
              // cols={40}
              name="content"
              className="p-2 text-lg"
              value={formData.content}
              onChange={handleChange}
            />
          </div>
          <div>
            <Button color="primary" size="lg" onClick={handleSubmit}>
              Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
