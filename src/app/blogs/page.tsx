"use client";

export default function Blogs() {
  const fetchData = async () => {
    await fetch("/api/post");
  };
  const postData = async () => {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ Name: "Sid" }),
    });
    console.log(response);
  };
  return (
    <div className="h-screen">
      <h2>Blogs</h2>
      <button onClick={fetchData}>Fetch</button>
      {/* <button onClick={postData}>Post</button> */}
    </div>
  );
}