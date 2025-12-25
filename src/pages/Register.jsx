import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return Swal.fire("Error", "Password must be 6+ characters", "error");
    }

    try {
      await registerUser(email, password);
      Swal.fire("Success", "Registration successful", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <form onSubmit={handleRegister}>
        <input placeholder="Full Name" className="border p-2 w-full mb-2" />
        <input placeholder="NID Number" className="border p-2 w-full mb-2" />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input placeholder="Contact Number" className="border p-2 w-full mb-2" />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-black text-white w-full py-2">
          Register
        </button>
      </form>

      <button
        onClick={googleLogin}
        className="bg-red-600 text-white w-full py-2 mt-2"
      >
        Register with Google
      </button>
    </div>
  );
};

export default Register;
