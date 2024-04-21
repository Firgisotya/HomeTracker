import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../../services/auth/AuthServices";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    try {
      const response = await login(data);
      console.log(response);

      if (response.status === 'success') {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.data));

        Swal.fire({
          title: "Success",
          text: response.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: false,
        });

        navigate("/dashboard");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: false,
      });
    }
  };

  return (
    <>
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          {/* Register */}
          <div className="card">
            <div className="card-body">
              {/* Logo */}
              <div className="app-brand justify-content-center">
                <a href="index.html" className="app-brand-link gap-2">
                  <span className="app-brand-logo demo">
                    <img src="/assets/img/icons/hi.png" className="avatar" alt="Brand Logo" />
                  </span>
                  <span className="app-brand-text demo text-body fw-bolder">
                    HomeTracker
                  </span>
                </a>
              </div>
              {/* /Logo */}
              <h4 className="mb-2">Welcome to HomeTracker! 👋</h4>
              <p className="mb-4">
                Please sign-in to your account and start the adventure
              </p>
              <form
                id="formAuthentication"
                className="mb-3"
                action="index.html"
                method="POST"
              >
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    autofocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3 form-password-toggle">
                  <div className="d-flex justify-content-between">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <a href="auth-forgot-password-basic.html">
                      <small>Forgot Password?</small>
                    </a>
                  </div>
                  <div className="input-group input-group-merge">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="············"
                      aria-describedby="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="input-group-text cursor-pointer">
                      <i className="bx bx-hide" />
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember-me"
                    />
                    <label className="form-check-label" htmlFor="remember-me">
                      {" "}
                      Remember Me{" "}
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-primary d-grid w-100"
                    type="submit"
                    onClick={handleLogin}
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <p className="text-center">
                <span>New on our platform?</span>
                <a href="auth-register-basic.html">
                  <span>Create an account</span>
                </a>
              </p>
            </div>
          </div>
          {/* /Register */}
        </div>
      </div>
    </>
  );
};

export default Login;
