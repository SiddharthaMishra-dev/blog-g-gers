"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const { register, reset, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      hashtags: "",
      content: "",
      likes: [],
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);
    try {
      if (!session) {
        return router.push("/signin");
      }
      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ ...values, session }),
      });
      setIsLoading(false);
      toast.success("Your Blog has been posted");
      reset();
      router.push("/blogs");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold">Jot down your thought</h2>
          <div className="p-4 flex flex-col w-3/5 ">
            <label>Title</label>
            <Input
              size="lg"
              placeholder="title"
              id="title"
              className=" p-2 text-lg "
              {...register("title", { required: true })}
            />
          </div>
          <div className="p-4 flex flex-col w-3/5 ">
            <label>Hastags</label>
            <div className="relative">
              <Input
                size="lg"
                placeholder="hashtags"
                id="hashtags"
                className=" p-2 text-2xl"
                {...register("hashtags", { required: true })}
              />
            </div>
          </div>
          <div className="p-4 flex flex-col w-3/5 ">
            <label>Content</label>
            <Textarea
              size="lg"
              minRows={10}
              id="content"
              className="p-2 text-lg"
              {...register("content", { required: true })}
            />
          </div>
          <div>
            <Button
              disabled={isLoading}
              type="submit"
              size="lg"
              variant="light"
              className="text-2xl px-8 font-semibold transition ease-in-out hover:scale-110 duration-300 gradient_blue-dark"
            >
              Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
