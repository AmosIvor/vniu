'use client'

import type { NavNavigationProps } from '@/components/layouts/nav'

export const SUB_NAVIGATION: NavNavigationProps['items'] = [
  {
    title: 'My account',
    items: [
      {
        href: '/dashboard/notifications',
        icon: {
          name: 'BellSimple',
          size: 'sm',
        },
        label: 'Notifications',
        description: {
          type: 'badge',
          content: 10,
          formatFn: (content) => {
            if (typeof content === 'string') return content
            return content < 10 ? content : '9+'
          },
        },
      },
      {
        href: '/logout',
        icon: {
          name: 'SignOut',
          size: 'sm',
        },
        label: 'Sign out',
      },
    ],
  },
]

const DEVELOPMENT_NAVIGATION: NavNavigationProps['items'] = [
  {
    title: 'Storybook',
    items: [
      {
        href: '/storybook',
        icon: {
          name: 'FileCode',
          size: {
            collapsed: 'sm',
            expanded: 'xs',
          },
        },
        label: 'Storybook',
      },
    ],
  },
  {
    title: 'Test Scroll',
    items: [...Array(10).keys()].map((index) => ({
      href: '/dashboard/test',
      icon: {
        name: 'StackOverflowLogo',
        size: {
          collapsed: 'sm',
          expanded: 'xs',
        },
      },
      label: `Test ${index + 1}`,
      description: 'hihi',
    })),
  },
]

export const DASHBOARD_MAIN_NAVIGATION: NavNavigationProps['items'] = [
  {
    title: 'Properties',
    items: [
      {
        href: '/dashboard/property',
        icon: {
          name: 'FolderOpen',
          size: {
            collapsed: 'sm',
            expanded: 'xs',
          },
        },
        label: 'Listing',
        description: 353,
      },
      {
        href: '/dashboard/property-types',
        icon: {
          name: 'SquaresFour',
          size: {
            collapsed: 'sm',
            expanded: 'xs',
          },
        },
        label: 'Property types',
        description: 5,
      },
      {
        href: '/dashboard/rent-status',
        icon: {
          name: 'CirclesThree',
          size: {
            collapsed: 'sm',
            expanded: 'xs',
          },
        },
        label: 'Rent status',
        description: 2,
      },
      {
        href: '/dashboard/contracts',
        icon: {
          name: 'Files',
          size: {
            collapsed: 'sm',
            expanded: 'xs',
          },
        },
        label: 'Contracts',
        description: 1234,
      },
    ],
  },
  {
    title: 'Users',
    items: [
      {
        href: '/dashboard/users',
        icon: {
          name: 'Users',
          size: {
            collapsed: 'sm',
            expanded: 'xs',
          },
        },
        label: 'All users',
        description: 5,
      },
    ],
  },
  ...(process.env.NODE_ENV === 'development' ? DEVELOPMENT_NAVIGATION : []),
]

export const STORYBOOK_MAIN_NAVIGATION: NavNavigationProps['items'] = [
  {
    title: 'Components',
    items: [
      {
        href: '/storybook/icon',
        icon: {
          name: 'FileCode',
          size: 'sm',
        },
        label: 'Icons',
      },
      {
        href: '/storybook/button',
        icon: {
          name: 'FileCode',
          size: 'sm',
        },
        label: 'Button',
      },
      {
        href: '/storybook/badge',
        icon: {
          name: 'FileCode',
          size: 'sm',
        },
        label: 'Badge',
      },
      {
        href: '/storybook/tooltip',
        icon: {
          name: 'FileCode',
          size: 'sm',
        },
        label: 'Tooltip',
      },
      {
        href: '/storybook/toast',
        icon: {
          name: 'FileCode',
          size: 'sm',
        },
        label: 'Toast',
      },
      {
        href: '/storybook/checkbox',
        icon: {
          name: 'FileCode',
          size: 'sm',
        },
        label: 'Checkbox',
      },
      {
        href: '/storybook/radio',
        icon: {
          name: 'FileCode',
          size: 'sm',
        },
        label: 'Radio',
      },
      {
        href: '/storybook/tree',
        icon: {
          name: 'FileCode',
          size: 'sm',
        },
        label: 'Tree',
      },
    ],
  },
  {
    title: 'Forms',
    items: [
      {
        href: '/storybook/fields',
        icon: {
          name: 'FileCode',
          size: 'sm',
        },
        label: 'Fields',
      },
    ],
  },
  {
    title: 'Others',
    items: [
      {
        href: '/storybook/tv',
        icon: {
          type: 'other',
          name: 'WalletConnect',
          size: 'sm',
        },
        label: 'Tailwind Variants',
      },
    ],
  },
]
