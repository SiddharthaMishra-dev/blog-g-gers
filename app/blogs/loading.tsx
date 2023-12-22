import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

const Loading = () => {
  return (
    <main className="h-full w-full overflow-auto p-4 flex flex-col  items-center">
      <div className="w-full overflow-hidden">
        <div className="max-w-[700px] mx-auto">
          <Skeleton className="w-full m-4 h-[200px] rouded-lg" />
          <Skeleton className="w-full m-4 h-[200px] rouded-lg" />
          <Skeleton className="w-full m-4 h-[200px] rouded-lg" />
        </div>
      </div>
    </main>
  );
};

export default Loading;
