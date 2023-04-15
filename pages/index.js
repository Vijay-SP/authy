import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   
    <div className="flex flex-col justify-center items-center h-screen">
    <h1 className="text-4xl font-bold mb-6">Welcome to My Authy</h1>
    <div className="flex space-x-4">
      <Link href="/signin">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </Link>
      <Link href="/signup">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </button>
      </Link>
    </div>
  </div>
 
  )
}
