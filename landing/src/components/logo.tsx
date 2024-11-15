import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Logo() {
  return (
    <Link className="w-[200px]" href={'/'}>
      <div className="items-center w-full flex flex-row gap-2">
        <Image
          alt="VNIU"
          src={
            'https://utfs.io/f/wqOFJk3mOtDKWwSPKWxB2ObxaGdVBPfM7uRX40mweIjF3gzA'
          }
          width={40}
          height={40}
        />

        <div className="text-lg w-full font-bold tracking-tight">VNIU</div>
      </div>
    </Link>
  );
}

export default Logo;
