import React, { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Html5QrcodePlugin from "@/components/HTML5QRCodePlugin";
import { AES, enc } from "crypto-js";

const Login = () => {
  const router = useRouter();
  const [result, setResult] = useState("");

  const onNewScanResult = (decodedText, decodedResult) => {
    console.log("Decoded Text: ", decodedText);
    setResult(decodedText);
    handleLogin(decodedText);
  };

  const handleLogin = async (encryptedText) => {
    try {
      const decryptedText = AES.decrypt(
        decodeURIComponent(encryptedText),
        "passphrase"
      ).toString(enc.Utf8);
      console.log("Decrypted Text", decryptedText);
      const [email, password, randomId] = decryptedText.split("|");
      console.log(email, password, randomId);

      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
 
    <div className="max-w-sm mx-auto mt-4">
      <h1 className="mb-4 text-2xl font-bold text-center">Login</h1>
      <form onSubmit={handleLogin}>
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none mt-4 focus:shadow-outline"
          type="submit"
        >
        No need to click here, Just upload qr and you are good to go!!!
        </button>
      </form>
      <ToastContainer />
    </div>

  );
};

export default Login;
