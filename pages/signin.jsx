import React, { useState } from "react";
import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QRCode from "qrcode.react";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [qrid, setQrid] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful!");

            // Decode QR code and compare with the qrid in the document
            const canvas = document.createElement("canvas");
            QRCode.toCanvas(canvas, qrid, (error) => {
                if (error) {
                    toast.error("Failed to decode QR code");
                } else {
                    const decodedQrid = canvas.toDataURL();
                    if (decodedQrid === qrid) {
                        // Redirect to dashboard page
                        router.push("/dashboard");
                    } else {
                        toast.error("QR code does not match");
                    }
                }
            });
        } catch (error) {
            toast.error(error.message);
        }
    };
    
    const handleScanQrCode = (data) => {
        setQrCodeValue(data);
        // Check if QR code value is the same as the one stored in the document
        // and perform login action accordingly
        if (data === "123456") {
          // QR code value is valid
          handleLogin({ preventDefault: () => {} });
        } else {
          // QR code value is not valid
          toast.error("Invalid QR code!");
        }
      };
    return (
        <div className="max-w-sm mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="email"
                    >
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
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="password"
                    >
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
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="qrid"
                    >
                        QR Code
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="qrCode"
                        type="file"
                        onChange={(event) => handleScanQrCode(event.target.files[0])}
                        accept="image/*"
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Login
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;