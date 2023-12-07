"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Snackbar from "../../components/Snackbar";
import InputContainer from "@/components/InputContainer";

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
        <Snackbar
          message="Your Blog has been posted"
          show={snackbarVisible}
        />
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold">Jot down your thought</h2>
          <InputContainer
            title={formData.title}
            hashtags={formData.hashtags}
            content={formData.content}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}
