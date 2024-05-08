//Header elementas
//Sukūrė: Karolis Momkus

"use client";

import '../app/global.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import NavBar from './navbar';
import LogoutButton from './logoutButton';
import UserDetails from './userDetails';

function Header(){
    const pathName = usePathname();

    if(pathName === '/prisijungti'){
        return(
            <header className='w-full p-1 bg-[#192a60] flex flex-row'>
                <Image src='/stv_logo_mini-300x296.jpg' width={50} height={50} alt='ŠTV logotipas' />
            </header>
        );
    }
    else{
        return(
            <header className='w-full bg-[#192a60] flex flex-row'>
                <Image className='m-1' src='/stv_logo_mini-300x296.jpg' width='50' height='50' alt='ŠTV logotipas' />
                <NavBar />
                <div className="flex absolute right-0 mr-3 mt-1">
                    <div className=''>
                        <UserDetails />
                    </div>
                    <div className='mt-2 mr-2'>
                        <LogoutButton />
                    </div>
                </div>
            </header>
        );
    }
    
}

export default Header;