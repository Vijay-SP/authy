import React, { useState } from "react";
import { useRouter } from "next/router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { generate } from 'shortid';
import { db } from "../firebase/firebase";
import QRCode from "qrcode.react";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [qrCodeValue, setQrCodeValue] = useState('');
  
    const handleRegister = async () => {
      try {
        const auth = getAuth();
        // Register user in Firebase
        const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          
        // Generate QR code value
        const qrCodeId = generate();
        const qrCodeValue = `${user.uid},${qrCodeId}`;
        setQrCodeValue(qrCodeValue);
  
        // Save QR code value to Firebase
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            userId: qrCodeValue,
            createdAt: serverTimestamp(),
          });
  
        toast.success('Registration successful!');
      } catch (error) {
        toast.error(error.message);
      }
    };
  
    return (
      <div className="max-w-sm mx-auto">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={(event) => {
          event.preventDefault();
          handleRegister();
        }}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
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