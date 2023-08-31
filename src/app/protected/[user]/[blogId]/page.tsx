"use client";

import React, { useState, useEffect } from "react";
import { redirect, useParams } from "next/navigation";
import { Button, Input, Textarea } from "@nextui-org/react";

const InitialState = {
  title: "",
  hashtags: "",
  content: "",
  likes: [],
};

const Page = () => {
  const params = useParams();
  const [formData, setFormData] = useState(InitialState);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };
  const fetchBlog = async () => {
    try {
      let url = `/api/user/${params.blogId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      // console.log(json);
      setFormData({ ...json });
    } catch (err) {
      console.log(err);
    }
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
      if (json === "updated") {
        redirect(`/protected/${params.user}`);
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
        <form>
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
            <div>
              <Button color="primary" size="lg" onClick={handleSubmit}>
                Edit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;