"use client"
import React from "react";
import { assets, BagIcon, CartIcon} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import logo from '@/assets/img.jpg';
import { useClerk, UserButton } from "@clerk/nextjs";
const Navbar = () => {

  const { isSeller, router,user } = useAppContext();
const {openSignIn}=useClerk();
  return (
 <nav className="flex items-center justify-between py-3 px-3 md:px-16 lg:px-32 border-b border-gray-300 text-gray-700">

      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={logo}
        alt="logo"
      />
      
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/"   className="relative transition text-pink-700 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-purple-500 after:via-black after:to-blue-500 hover:after:w-full after:transition-all after:duration-300"
>
          Home
        </Link>
        <Link href="/all-products"   className="relative transition text-pink-700 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-purple-500 after:via-black after:to-blue-500 hover:after:w-full after:transition-all after:duration-300"
>
          Shop
        </Link>
        <Link href="/"   className="relative transition text-pink-700 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-purple-500 after:via-black after:to-blue-500 hover:after:w-full after:transition-all after:duration-300"
>
          About Us
        </Link>
        <Link href="/"   className="relative transition text-pink-700 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-purple-500 after:via-black after:to-blue-500 hover:after:w-full after:transition-all after:duration-300"
>
          Contact
        </Link>

        {isSeller && <button onClick={() => router.push('/seller')} className=" text-pink-700 bg-zinc-800 text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

      </div>
      
      <ul className="hidden md:flex items-center gap-4 ">
        <Link href="/cart">
  <CartIcon />
</Link>
       { user?<>
       <UserButton>
        <UserButton.MenuItems>
          <UserButton.Action label="My Orders" labelIcon={<BagIcon></BagIcon>} onClick={()=>router.push('/my-orders')}></UserButton.Action>
        </UserButton.MenuItems>
       </UserButton>
       </>:<button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>}
          <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
        { user?<>
       <UserButton>
        <UserButton.MenuItems>
          <UserButton.Action label="My Orders" labelIcon={<BagIcon></BagIcon>} onClick={()=>router.push('/my-orders')}></UserButton.Action>
        </UserButton.MenuItems>
       </UserButton>
       </>:<button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>}
      </div>
    </nav>
  );
};

export default Navbar;