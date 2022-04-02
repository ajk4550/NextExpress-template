import { useState } from "react";
import { postReq } from "../../utils/api";

const login = () => {
  const loginURL = `http://localhost:5000/api/v1/users/login`;
  // Controlling the input for the email and password field.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    // Prevent the normal form submission behavior.
    event.preventDefault();
    const formData = { email, password };
    try {
      const response = await postReq(loginURL, formData);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      return err;
    } finally {
      setPassword("");
    }
  };

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            name="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            name="password"
            required
          />
        </div>
        <div>
          <button type="submit" value="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default login;
