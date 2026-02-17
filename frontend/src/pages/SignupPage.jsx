import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const SignupPage = () => {
  const state = useAuthStore();
  console.log("user : ", state.authUser);
  console.log("isLoading : ", state.isLoading);

  const handleLogin = () => {
    state.login();
  };
  return (
    <div>
      SignupPage
      <button onClick={handleLogin} className="z-50">
        Click Me
      </button>
      <button onClick={handleLogin} className="absolute z-50">
        Test Click
      </button>
    </div>
  );
};

export default SignupPage;
