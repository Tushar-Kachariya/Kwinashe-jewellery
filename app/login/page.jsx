"use client";

import { useState } from "react";

export default function Page() {
  const [showSignInPwd, setShowSignInPwd] = useState(false);
  const [showRegPwd, setShowRegPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [recaptchaChecked, setRecaptchaChecked] = useState(false);
  const [phone, setPhone] = useState("");

  // Sign In fields
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Register fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSignIn(e) {
    e.preventDefault();
    if (!signInEmail.trim()) { alert("Please enter your email address."); return; }
    if (!signInPassword.trim()) { alert("Please enter your password."); return; }
    alert("Sign In demo: credentials would be validated. (Demo flow)");
  }

  function handleCreateAccount(e) {
    e.preventDefault();
    if (!firstName.trim()) { alert("Please enter First Name"); return; }
    if (!lastName.trim()) { alert("Please enter Last Name"); return; }
    if (!regEmail.trim() || !regEmail.includes("@")) { alert("Please enter a valid email address"); return; }
    if (!phone.trim()) { alert("Please enter mobile number"); return; }
    if (!regPassword.trim()) { alert("Please create a password"); return; }
    if (regPassword !== confirmPassword) { alert("Passwords do not match"); return; }
    if (!recaptchaChecked) { alert("Please confirm that you are not a robot (reCAPTCHA demo)."); return; }
    alert(`Welcome ${firstName.trim()}! Account creation demo successful. (No backend storage)`);
  }

  return (
    <div className="min-h-screen! bg-white! font-sans! flex! flex-col! justify-start! relative! antialiased!">

      {/* ── Top Header Banner ── */}
      <div className="w-full! text-center! py-10! bg-[#fbfbfb]!">
        <h1 className="text-3xl! md:text-4xl! font-normal! text-gray-700! tracking-wide!">
          Already Registered?
        </h1>
        <p className="text-xs! md:text-sm! text-gray-500! mt-3! font-normal!">
          Welcome back to Kwinashe! Your exclusive perks await.
        </p>
      </div>

      {/* ── Main Form Columns ── */}
      <div className="max-w-6xl! w-full! mx-auto! px-6! md:px-12! py-12! flex-1!">
        <div className="flex! flex-col! md:flex-row! gap-12! md:gap-0!">

          {/* ── SIGN IN COLUMN ── */}
          <div className="flex-1! md:pr-16! md:border-r! md:border-gray-100!">
            <h2 className="text-2xl! font-normal! text-gray-900! mb-2!">Sign In</h2>
            <p className="text-xs! md:text-sm! text-gray-500! mb-6! font-normal!">
              If you have a Kwinashe customer account, please sign in.
            </p>

            <div className="space-y-4!">
              <input
                type="email"
                placeholder="Enter Email Address"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className="w-full! px-3! py-3! border! border-gray-200! text-sm! text-gray-800! placeholder-gray-400! focus:outline-none! focus:border-gray-400! bg-white!"
              />

              <div className="relative!">
                <input
                  type={showSignInPwd ? "text" : "password"}
                  placeholder="Enter password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className="w-full! px-3! py-3! border! border-gray-200! text-sm! text-gray-800! placeholder-gray-400! focus:outline-none! focus:border-gray-400! bg-white! pr-12!"
                />
                <button
                  type="button"
                  onClick={() => setShowSignInPwd(!showSignInPwd)}
                  className="absolute! right-4! top-1/2! -translate-y-1/2! text-gray-700! hover:text-gray-900!"
                >
                  {showSignInPwd ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              <div className="pt-1!">
                <a href="#" className="text-sm! text-gray-800! underline! underline-offset-2! hover:text-black!">
                  Forgot password?
                </a>
              </div>

              <button
                onClick={handleSignIn}
                className="w-full! bg-[#0b122c]! hover:bg-[#131d42]! active:scale-[0.98]! text-white! text-sm! font-semibold! tracking-widest! py-3.5! uppercase! transition-all! duration-200! mt-4!"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* ── CREATE ACCOUNT COLUMN ── */}
          <div className="flex-1! md:pl-16!">
            <h2 className="text-2xl! font-normal! text-gray-900! mb-2!">Create an Account</h2>
            <p className="text-xs! md:text-sm! text-gray-500! mb-6! font-normal!">
              Join Kwinashe today for exclusive updates and rewards.
            </p>

            <div className="space-y-4!">
              {/* First & Last Name */}
              <div className="grid! grid-cols-1! sm:grid-cols-2! gap-4!">
                <input
                  type="text"
                  placeholder="Enter First Name*"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full! px-3! py-3! border! border-gray-200! text-sm! text-gray-800! placeholder-gray-400! focus:outline-none! focus:border-gray-400! bg-white!"
                />
                <input
                  type="text"
                  placeholder="Enter Last Name*"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full! px-3! py-3! border! border-gray-200! text-sm! text-gray-800! placeholder-gray-400! focus:outline-none! focus:border-gray-400! bg-white!"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block! text-xs! text-gray-700! mb-1.5! font-medium!">Email:</label>
                <input
                  type="email"
                  placeholder="Enter Enter Email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full! px-3! py-3! border! border-gray-200! text-sm! text-gray-800! placeholder-gray-400! focus:outline-none! focus:border-gray-400! bg-white!"
                />
              </div>

              {/* Phone */}
              <div className="w-full! flex! border! border-gray-200! bg-white! focus-within:border-gray-400!">
                <div className="flex! items-center! gap-1.5! px-3! border-r! border-gray-200! bg-white! shrink-0! select-none! text-sm! text-gray-800!">
                  <span className="text-base! leading-none!">🇮🇳</span>
                  <svg className="w-2.5! h-2.5! text-gray-800! mt-0.5!" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="flex! items-center! px-3! text-sm! text-gray-600! bg-white! shrink-0! select-none! border-r! border-gray-200!">
                  +91
                </div>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1! px-4! py-3! text-sm! text-gray-800! placeholder-gray-400! focus:outline-none! bg-transparent!"
                />
              </div>

              {/* Password */}
              <div className="relative!">
                <input
                  type={showRegPwd ? "text" : "password"}
                  placeholder="Enter Your Password*"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full! px-3! py-3! border! border-gray-200! text-sm! text-gray-800! placeholder-gray-400! focus:outline-none! focus:border-gray-400! bg-white! pr-12!"
                />
                <button
                  type="button"
                  onClick={() => setShowRegPwd(!showRegPwd)}
                  className="absolute! right-4! top-1/2! -translate-y-1/2! text-gray-700! hover:text-gray-900!"
                >
                  {showRegPwd ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative!">
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  placeholder="Enter Your Confirm Password*"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full! px-3! py-3! border! border-gray-200! text-sm! text-gray-800! placeholder-gray-400! focus:outline-none! focus:border-gray-400! bg-white! pr-12!"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                  className="absolute! right-4! top-1/2! -translate-y-1/2! text-gray-700! hover:text-gray-900!"
                >
                  {showConfirmPwd ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              {/* reCAPTCHA */}
              <div
                onClick={() => setRecaptchaChecked(!recaptchaChecked)}
                className="flex! items-center! justify-between! border! border-[#d3d3d3]! bg-[#f9f9f9]! px-3! py-2! w-full! max-w-[304px]! h-[76px]! select-none! rounded-[3px]! cursor-pointer! transition-all!"
              >
                <div className="flex! items-center! gap-3!">
                  <div
                    className={`w-7! h-7! border-2! rounded-[2px]! flex! items-center! justify-center! transition-all! ${
                      recaptchaChecked
                        ? "bg-[#4a90e2]! border-[#4a90e2]!"
                        : "bg-white! border-[#c1c1c1]!"
                    }`}
                  >
                    {recaptchaChecked && (
                      <svg className="w-4! h-4! text-white!" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm! text-[#2b2b2b]! font-normal! tracking-wide!">I'm not a robot</span>
                </div>
                <div className="flex! flex-col! items-center! justify-center! pr-1!">
                  <svg viewBox="0 0 24 24" className="w-8! h-8!" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12s4.48-10 10-10zm0 2c-4.42 0-8 3.58-8 8 0 1.63.49 3.14 1.33 4.41L8 13.73V11h5.5c0 1.93-1.57 3.5-3.5 3.5-.66 0-1.27-.19-1.8-.51L6.72 15.4C8.16 16.41 9.93 17 12 17c3.87 0 7-3.13 7-7s-3.13-7-7-7zm0 2.5c2.48 0 4.5 2.02 4.5 4.5S14.48 13.5 12 13.5c-.7 0-1.35-.16-1.93-.44l1.37-1.37c.18.04.37.06.56.06 1.38 0 2.5-1.12 2.5-2.5S13.38 6.75 12 6.75c-.88 0-1.66.46-2.11 1.15l-1.42-1.42C9.33 5.4 10.59 4.5 12 4.5z" fill="#4a90e2"/>
                  </svg>
                  <span className="text-[8px]! text-[#555555]! font-medium! mt-0.5! tracking-tighter!">reCAPTCHA</span>
                  <div className="flex! gap-1! text-[8px]! text-[#555555]!">
                    <a href="#" onClick={(e) => e.stopPropagation()} className="hover:underline!">Privacy</a>
                    <span>•</span>
                    <a href="#" onClick={(e) => e.stopPropagation()} className="hover:underline!">Terms</a>
                  </div>
                </div>
              </div>

              {/* Create Account Button */}
              <button
                onClick={handleCreateAccount}
                className="w-full! bg-[#0b122c]! hover:bg-[#131d42]! active:scale-[0.98]! text-white! text-sm! font-semibold! tracking-widest! py-3.5! uppercase! transition-all! duration-200! mt-2!"
              >
                Create Account
              </button>

              {/* Privacy Note */}
              <p className="text-xs! text-gray-500! font-light! leading-relaxed! pt-1!">
                Your privacy is important to us. By Clicking "Create Account", you agree to our{" "}
                <a href="#" className="underline! text-gray-700! hover:text-black!">Terms</a>
                {" "}and{" "}
                <a href="#" className="underline! text-gray-700! hover:text-black!">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

function EyeIcon() {
  return (
    <svg className="w-5! h-5!" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg className="w-5! h-5!" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );
}