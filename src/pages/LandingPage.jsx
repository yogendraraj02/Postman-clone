import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './LandingPage.css';

function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Here you would typically handle the authentication logic
  };

  return (
    <div className="landing-page">
      <header>
        <h1>Postman Clone</h1>
      </header>
      <main>
        <div className="auth-form">
          <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <span className="error">{errors.name.message}</span>}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>
            <button type="submit">{isLogin ? 'Log In' : 'Sign Up'}</button>
          </form>
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button className="switch-auth" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;