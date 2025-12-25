import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const { googleLogin, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      Swal.fire("Success", "Login successful", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      Swal.fire("Success", "Google login successful", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-black text-white w-full py-2 mb-2">
          Login
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        className="bg-red-600 text-white w-full py-2"
      >
        Login with Google
      </button>

      <p className="mt-3 text-center">
        New user?{" "}
        <Link className="text-blue-600" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
