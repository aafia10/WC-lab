import React, { useState } from "react";
import "../style.css";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "", email: "", password: "", confirmPassword: "",
    phone: "", gender: "", dob: "", terms: false
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });

    if (name === "password") checkPasswordStrength(value);
  };

  const checkPasswordStrength = (pwd) => {
    if (pwd.length < 6) setPasswordStrength("strength-weak");
    else if (pwd.length < 10) setPasswordStrength("strength-medium");
    else setPasswordStrength("strength-strong");
  };

  const validateStep = () => {
    if (step === 1 && (!formData.fullName || !formData.email || !formData.phone)) {
      setMessage("Please fill all fields in this step"); setSuccess(false); return false;
    }
    if (step === 2 && (!formData.password || !formData.confirmPassword || !formData.gender || !formData.dob || !formData.terms)) {
      setMessage("Please complete all fields in this step"); setSuccess(false); return false;
    }
    if (step === 2 && formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match"); setSuccess(false); return false;
    }
    setMessage(""); setSuccess(true); return true;
  };

  const nextStep = () => { if (validateStep()) setStep(step + 1); };
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => { e.preventDefault(); if (validateStep()) setMessage("Registration Successful!"); };

  return (
    <div className="register-card">
      <h2>Register Account</h2>

      <div className="progress-bar">
        <div className={`progress-step ${step>=1?'active':''}`}></div>
        <div className={`progress-step ${step>=2?'active':''}`}></div>
      </div>

      <form onSubmit={handleSubmit}>
        {step===1 && <>
          <div className="input-container">
            <input type="text" name="fullName" placeholder=" " value={formData.fullName} onChange={handleChange} />
            <label>Full Name</label>
          </div>
          <div className="input-container">
            <input type="email" name="email" placeholder=" " value={formData.email} onChange={handleChange} />
            <label>Email Address</label>
          </div>
          <div className="input-container">
            <input type="tel" name="phone" placeholder=" " value={formData.phone} onChange={handleChange} />
            <label>Phone Number</label>
          </div>
          <button type="button" onClick={nextStep}>Next</button>
        </>}

        {step===2 && <>
          <div className="input-container">
            <input type="password" name="password" placeholder=" " value={formData.password} onChange={handleChange} />
            <label>Password</label>
            {formData.password && <div className={`strength-bar ${passwordStrength}`}></div>}
          </div>
          <div className="input-container">
            <input type="password" name="confirmPassword" placeholder=" " value={formData.confirmPassword} onChange={handleChange} />
            <label>Confirm Password</label>
          </div>
          <div className="input-container">
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
            </select>
            <label>Gender</label>
          </div>
          <div className="input-container">
            <input type="date" name="dob" value={formData.dob} onChange={handleChange}/>
            <label>Date of Birth</label>
          </div>
          <label className="checkbox-label">
            <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} /> I agree to Terms & Conditions
          </label>

          <button type="button" onClick={prevStep} style={{marginBottom:"10px"}}>Back</button>
          <button type="submit">Submit</button>
        </>}
      </form>

      {message && <div className={`message ${success?'success':'error'}`}>{message}</div>}
    </div>
  );
};

export default Register;
