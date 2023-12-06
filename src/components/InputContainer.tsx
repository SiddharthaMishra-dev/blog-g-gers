"use client";

import React from "react";
import { Button, Input, Textarea } from "@nextui-org/react";

interface InputContainerProps {
  title: string;
  hashtags: string;
  content: string;
  handleChange: (e: any) => void;
  handleSubmit: (e: any) => Promise<never>;
}

const InputContainer = ({
  title,
  hashtags,
  content,
  handleChange,
  handleSubmit,
}: InputContainerProps) => {
  return (
    <>
      <div className="p-4 flex flex-col w-3/5 ">
        <label>Title</label>
        <Input
          // color="primary"
          size="lg"
          placeholder="title"
          name="title"
          className=" p-2 text-lg "
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="p-4 flex flex-col w-3/5 ">
        <label>Hastags</label>
        <div className="relative">
          <Input
            size="lg"
            placeholder="hashtags"
            name="hashtags"
            className=" p-2 text-2xl"
            value={hashtags}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="p-4 flex flex-col w-3/5 ">
        <label>Content</label>
        <Textarea
          // color="primary"
          size="lg"
          minRows={10}
          // cols={40}
          name="content"
          className="p-2 text-lg"
          value={content}
          onChange={handleChange}
        />
      </div>
      <div>
        <Button
          size="lg"
          variant="light"
          className="text-3xl p-6 font-bold transition ease-in-out hover:scale-110 duration-300 gradient_blue-dark"
          onClick={handleSubmit}
        >
          Post
        </Button>
      </div>
    </>
  );
};

export default InputContainer;
