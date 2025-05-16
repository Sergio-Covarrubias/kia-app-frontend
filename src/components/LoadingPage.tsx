import LoadingIcon from "./LoadingIcon";

const LoadingPage = () => {
  return (
    <div className="page-container p-10 justify-center items-center bg-gray-100">
      <div className="flex gap-x-3 items-center">
        <span className="font-medium">Loading</span>
        <LoadingIcon color="text-black" />
      </div>
    </div>
  );
}

export default LoadingPage;
