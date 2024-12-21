'use client';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { CommonSvg } from '@/assets/CommonSvg';
import Link from 'next/link';

const sidebarNavItems = [
  {
    title: 'Account',
    href: '/dashboard/account',
    icon: 'user',
    items: [],
  },
  {
    title: 'Stores',
    href: '/dashboard/stores',
    icon: 'store',
    items: [],
  },
  {
    title: 'Add Product',
    href: '/admin/add-product',
    icon: 'billing',
    items: [],
  },
  {
    title: 'Purchases',
    href: '/dashboard/purchases',
    icon: 'dollarSign',
    items: [],
  },
];
const mainNavItems = [
  {
    title: 'Men',
    items: [
      {
        title: 'Shoes',
        href: '/products?gender=1&subcategories=1.2.3.4.9.10',
        description: 'All the products we have to offer.',
        items: [],
      },
      {
        title: 'Clothing',
        href: '/products?gender=1&subcategories=5.6.11.12.13.14',
        description: 'Build your own custom skateboard.',
        items: [],
      },
      {
        title: 'Accessories and Equipment',
        href: '/products?gender=1&subcategories=7.8.15.16.17.18',
        description: 'Read our latest blog posts.',
        items: [],
      },
    ],
  },
  {
    title: 'Women',
    items: [
      {
        title: 'Shoes',
        href: '/products?gender=2&subcategories=1.2.3.4.9.10',
        description: 'All the products we have to offer.',
        items: [],
      },
      {
        title: 'Clothing',
        href: '/products?gender=2&subcategories=5.6.11.12.13.14',
        description: 'Build your own custom skateboard.',
        items: [],
      },
      {
        title: 'Accessories and Equipment',
        href: '/products?gender=2&subcategories=7.8.15.16.17.18',
        description: 'Read our latest blog posts.',
        items: [],
      },
    ],
  },
  {
    title: 'Kids',
    items: [
      {
        title: 'Shoes',
        href: '/products?gender=3&subcategories=1.2.3.4.9.10',
        description: 'All the products we have to offer.',
        items: [],
      },
      {
        title: 'Clothing',
        href: '/products?gender=3&subcategories=5.6.11.12.13.14',
        description: 'Build your own custom skateboard.',
        items: [],
      },
      {
        title: 'Accessories and Equipment',
        href: '/products?gender=3&subcategories=7.8.15.16.17.18',
        description: 'Read our latest blog posts.',
        items: [],
      },
    ],
  },
];
export function MobileNav({ session }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent
           focus-visible:bg-transparent focus-visible:ring-0 
           focus-visible:ring-offset-0 lg:hidden"
        >
          {CommonSvg.menuBurger()}
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7">
          <Link
            aria-label="Home"
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <span className="font-bold">
              {session?.user ? `Hi, ${session?.user.name}` : 'Hi'}
            </span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <Accordion type="single" collapsible className="w-full">
              {mainNavItems?.map((item, index) => (
                <AccordionItem value={item.title} key={index}>
                  <AccordionTrigger className="text-sm capitalize">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {item.items?.map((subItem, index) =>
                        subItem.href ? (
                          <MobileLink
                            key={index}
                            href={String(subItem.href)}
                            pathname={pathname}
                            setIsOpen={setIsOpen}
                          >
                            {subItem.title}
                          </MobileLink>
                        ) : (
                          <div
                            key={index}
                            className="text-foreground/70 transition-colors"
                          >
                            {item.title}
                          </div>
                        )
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
              <AccordionItem value="sidebar">
                <AccordionTrigger className="text-sm">
                  Sidebar Menu
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2">
                    {sidebarNavItems?.map((item, index) =>
                      item.href ? (
                        <MobileLink
                          key={index}
                          href={String(item.href)}
                          pathname={pathname}
                          setIsOpen={setIsOpen}
                        >
                          {item.title}
                        </MobileLink>
                      ) : (
                        <div
                          key={index}
                          className="text-foreground/70 transition-colors"
                        >
                          {item.title}
                        </div>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
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

function MobileLink({
  children,
  href,
  disabled,
  pathname,
  setIsOpen,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-foreground/70 transition-colors hover:text-foreground',
        pathname === href && 'text-foreground',
        disabled && 'pointer-events-none opacity-60'
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );
}
