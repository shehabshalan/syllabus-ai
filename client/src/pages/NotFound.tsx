import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="my-4 text-xl text-gray-600 ">
        Sorry, the page you're looking for cannot be found.
      </p>
      <Button>
        <Link to="/">Go to Homepage</Link>
      </Button>
    </div>
  );
};

export default NotFound;
