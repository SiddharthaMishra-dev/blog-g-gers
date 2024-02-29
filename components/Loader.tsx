import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      {/* <CircularProgress aria-label="Loading ..." /> */}
      <Loader2 className="animate-spin text-blue-600 h-32 w-32" />
    </div>
  );
};

export default Loader;
