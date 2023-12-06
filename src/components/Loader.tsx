import { CircularProgress } from "@nextui-org/progress";

const Loader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <CircularProgress aria-label="Loading ..." />
    </div>
  );
};

export default Loader;
