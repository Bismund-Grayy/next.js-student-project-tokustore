import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "../../../utils/supabase";

interface RegisterProps {
  onSwitch: () => void;
}

const RegisterComponent: React.FC<RegisterProps> = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // NEW
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage(null);

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage({
        type: "error",
        text: "Passwords do not match.",
      });

      setLoading(false);
      return;
    }

    // Optional minimum length check
    if (password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters long.",
      });

      setLoading(false);
      return;
    }

    // Password policy:
    // - at least 6 characters
    // - at least 1 uppercase letter
    // - at least 1 number

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
      setMessage({
        type: "error",
        text:
          "Password must be at least 6 characters long and include at least 1 capital letter and 1 number.",
      });

      setLoading(false);
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
      },
    });

    if (signUpError) {
      setMessage({
        type: "error",
        text: signUpError.message,
      });

      setLoading(false);
      return;
    }

    setMessage({
      type: "success",
      text: "Account created! Please check your email to verify your account before logging in.",
    });

    setLoading(false);
  };

  return (
    <section>
      <h2>Register</h2>

      {message && (
        <p style={{ color: message.type === "success" ? "green" : "red" }}>
          {message.text}
        </p>
      )}

      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="reg-username">Username:</label>

          <input
            type="text"
            id="reg-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="reg-email">Email:</label>

          <input
            type="email"
            id="reg-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        

        <div>
            <label htmlFor="reg-password">Password:</label>

            <input
              type="password"
              id="reg-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <small
              style={{
                display: "block",
                color: "gray",
                marginTop: "4px",
              }}
            >
              Password must contain:
              <br />
              • At least 1 capital letter
              <br />
              • At least 1 number
              <br />
              • At least 6 characters
            </small>
          </div>

        {/* NEW Confirm Password Field */}
        <div>
          <label htmlFor="reg-confirm-password">
            Confirm Password:
          </label>

          <input
            type="password"
            id="reg-confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p>
        <Link href="/">back to main page</Link>

        <br />

        Already have an account?{" "}
        <button
          onClick={onSwitch}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </p>
    </section>
  );
};

export default RegisterComponent;