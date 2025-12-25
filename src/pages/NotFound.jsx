import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center">
    <h1 className="text-5xl font-bold">404</h1>
    <Link to="/" className="mt-4 text-blue-600">Go Home</Link>
  </div>
);

export default NotFound;
