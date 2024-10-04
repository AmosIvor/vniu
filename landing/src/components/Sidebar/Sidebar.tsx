/** @format */

import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import React, { useState } from 'react';
import { CommonSvg } from '@/assets/CommonSvg';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const mainNavItems = [
  {
    title: 'News',
    items: [
      {
        title: 'View News',
        href: '/news',
        description: 'All the products we have to offer.',
        items: [],
      },
    ],
  },
  {
    title: 'Events',
    items: [
      {
        title: 'View Events',
        href: '/events',
        description: 'All the products we have to offer.',
        items: [],
      },
    ],
  },
  {
    title: 'Settings',
    items: [
      {
        title: 'About Us',
        href: '/about-us',
        description: 'All the products we have to offer.',
        items: [],
      },
      {
        title: 'Term and Conditions',
        href: '/conditions',
        description: 'All the products we have to offer.',
        items: [],
      },
      {
        title: 'Banners',
        href: '/banners',
        description: 'All the products we have to offer.',
        items: [],
      },
    ],
  },
];
export function Sidebar() {
  const { onLogout } = useAuth();
  const handleLogout = () => {
    onLogout();
  };
  // const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 '
        >
          {CommonSvg.menuBurger()}
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='pl-1 pr-0'>
        <div className='px-7'>
          <Link
            aria-label='Home'
            to='/'
            className='flex items-center'
            onClick={() => setIsOpen(false)}
          >
            <span className='font-bold'>{'Admin'}</span>
          </Link>
        </div>
        <ScrollArea className='my-4 h-[calc(100vh-8rem)] pb-10 pl-6'>
          <div className='pl-1 pr-7'>
            <Accordion type='multiple' className='w-full'>
              {mainNavItems?.map((item, index) => (
                <AccordionItem value={item.title} key={index}>
                  <AccordionTrigger className='text-sm capitalize'>{item.title}</AccordionTrigger>
                  <AccordionContent>
                    <div className='flex flex-col space-y-2'>
                      {item.items?.map((subItem, index) =>
                        subItem.href ? (
                          <MobileLink
                            key={index}
                            href={subItem.href}
                            pathname={subItem.href}
                            setIsOpen={setIsOpen}
                            // disabled={subItem.disabled}
                          >
                            {subItem.title}
                          </MobileLink>
                        ) : (
                          <div key={index} className='text-foreground/70 transition-colors'>
                            {item.title}
                          </div>
                        ),
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
        <div className='w-full'>
          <Button className='w-full' onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  children?: React.ReactNode;
  href: string;
  disabled?: boolean;
  pathname: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileLink({ children, href, disabled, pathname, setIsOpen }: MobileLinkProps) {
  return (
    <Link
      to={href}
      className={cn(
        'text-foreground/70 transition-colors hover:text-foreground',
        pathname === href && 'text-foreground',
        disabled && 'pointer-events-none opacity-60',
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );
}
