"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

const InitialState = {
  title: "",
  hashtags: "",
  content: "",
  likes: [],
};

export default function Index() {
  const [formData, setFormData] = useState(InitialState);
  const { data: session } = useSession();
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
    console.log(response);
  };

  return (
    <div>
      <form>
        <div className="w-full">
          <div className="p-4 flex flex-col w-3/5 ">
            <label>Title</label>
            <input
              placeholder="title"
              name="title"
              className="text-black p-2 text-lg"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="p-4 flex flex-col w-3/5 ">
            <label>Hastags</label>
            <input
              placeholder="hashtags"
              name="hashtags"
              className="text-black p-2 text-lg"
              value={formData.hashtags}
              onChange={handleChange}
            />
          </div>
          <div className="p-4 flex flex-col w-3/5 ">
            <label>Content</label>
            <textarea
              rows={20}
              cols={40}
              name="content"
              className="text-black p-2 text-lg"
              value={formData.content}
              onChange={handleChange}
            />
          </div>
          <div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
