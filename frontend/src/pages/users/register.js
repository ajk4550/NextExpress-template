import { useState } from "react";
import { postReq } from "../../utils/api";

const register = () => {
  const registerURL = `http://localhost:5000/api/v1/users/register`;
  // Controlling the input for the registration fields.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    // Prevent the normal form submission behavior.
    event.preventDefault();
    const formData = { firstName, lastName, email, password };
    try {
      const response = await postReq(registerURL, formData);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      return err;
    } finally {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div>
      <h1>Register page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First Name"
            name="firstName"
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
            name="lastName"
            required
          />
        </div>

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

export default register;
