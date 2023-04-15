import React, { useState } from "react";
import { useRouter } from "next/router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { generate } from "shortid";
import { auth, db } from "../firebase/firebase";
import { AES, enc } from "crypto-js";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState("");

  const handleRegister = async () => {
    try {
      // Register user in Firebase
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Generate QR code value
      const qrCodeId = generate();
      const qrCodeValue = `${user.email}|${password}|${qrCodeId}`;
      const encryptedQrCodeValue = AES.encrypt(
        qrCodeValue,
        "passphrase"
      ).toString();
      console.log(encryptedQrCodeValue);
      setQrCodeValue(qrCodeValue);

      // Save QR code value to Firebase
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        userId: qrCodeValue,
        encryptedQrCodeValue,
        createdAt: serverTimestamp(),
      });

      toast.success("Registration successful!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Register</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleRegister();
        }}
      >
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
      </form>
      {qrCodeValue && (
        <div className="mt-4">
          <p className="mb-2">Scan this QR code to login:</p>
          <QRCode value={qrCodeValue} size={200} />
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Register;
