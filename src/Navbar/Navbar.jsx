import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from "react-router-dom";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { UserContext } from "../contexts.jsx";
import authService from "../appwrite/auth.js";
import Avatar from "../components/Avatar.jsx";

const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Settings', href: '/' },
  { name: 'Sign out', href: '/' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const location = useLocation();

  const navigation = useMemo(() => [
    { name: 'Home', href: '/' },
    { name: 'Login', href: '/login' },
    { name: 'Profile', href: '/profile' },
    { name: 'Calendar', href: '/' },
    { name: 'Reports', href: '/' },
  ].map(item => ({
    ...item,
    current: location.pathname === item.href
  })), [location.pathname]);

  // Page title mapping for more control
  const getPageTitle = (pathname) => {
    const titles = {
      '/': 'Home Page',
      '/login': 'Login/Logout Page',
      '/profile': 'User Projects',
      '/calendar': 'Calendar View',
      '/reports': 'Reports & Analytics'
    };
    return titles[pathname] || 'Dashboard';
  };

  const pageTitle = getPageTitle(location.pathname);


  const [user, setUser] = useContext(UserContext);

  // Check for existing session on page load (similar to Login.jsx)
  const getCurrentUser = useCallback(async () => {
    try {
      const data = await authService.getCurrentUser();
      if (data) {
        setUser(data);
        console.log("User session restored:", data.name);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user session:", error);
      setUser(null);
    }
  }, [setUser]);

  // Prefetch user session on component mount
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0">
                <img
                  alt="Sharp Solutions"
                  src="/vite.svg"
                  className="size-8"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {/*<button*/}
                {/*  type="button"*/}
                {/*  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"*/}
                {/*>*/}
                {/*  <span className="absolute -inset-1.5"/>*/}
                {/*  <span className="sr-only">View notifications</span>*/}
                {/*  <BellIcon aria-hidden="true" className="size-6"/>*/}
                {/*</button>*/}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <MenuButton
                    className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800">
                    <span className="absolute -inset-1.5"/>
                    <span className="sr-only">Open user menu</span>
                    {/*<img alt="" src={user.imageUrl} className="size-8 rounded-full"/>*/}
                    <Avatar name={user?.name} className="size-8 rounded-full"/>
                  </MenuButton>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <Link
                          to={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <DisclosureButton
                className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                <span className="absolute -inset-0.5"/>
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden"/>
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block"/>
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">

            {/*{navigation.map((item) => (*/}
            {/*  <DisclosureButton*/}
            {/*    key={item.name}*/}
            {/*    as="a"*/}
            {/*    href={item.href}*/}
            {/*    aria-current={item.current ? 'page' : undefined}*/}
            {/*    className={classNames(*/}
            {/*      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',*/}
            {/*      'block rounded-md px-3 py-2 text-base font-medium',*/}
            {/*    )}*/}
            {/*  >*/}
            {/*    {item.name}*/}
            {/*  </DisclosureButton>*/}
            {/*))}*/}

            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                <DisclosureButton as="span" className="w-full text-left">
                  {item.name}
                </DisclosureButton>
              </Link>
            ))}

          </div>
          <div className="border-t border-gray-700 pt-4 pb-3">
            <div className="flex items-center px-5">
              <div className="shrink-0">
                {/*<img alt="" src={user.imageUrl} className="size-10 rounded-full"/>*/}
                <Avatar name={user?.name} className="size-10 rounded-full"/>
              </div>
              <div className="ml-3">
                <div className="text-base/5 font-medium text-white">{user?.name}</div>
                <div className="text-sm font-medium text-gray-400">{user?.email}</div>
              </div>
              {/*<button*/}
              {/*  type="button"*/}
              {/*  className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"*/}
              {/*>*/}
              {/*  <span className="absolute -inset-1.5"/>*/}
              {/*  <span className="sr-only">View notifications</span>*/}
              {/*  <BellIcon aria-hidden="true" className="size-6"/>*/}
              {/*</button>*/}
            </div>
            <div className="mt-3 space-y-1 px-2">

              {/*{userNavigation.map((item) => (*/}
              {/*  <DisclosureButton*/}
              {/*    key={item.name}*/}
              {/*    as="a"*/}
              {/*    href={item.href}*/}
              {/*    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"*/}
              {/*  >*/}
              {/*    {item.name}*/}
              {/*  </DisclosureButton>*/}
              {/*))}*/}

              {userNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <DisclosureButton as="span" className="w-full text-left">
                    {item.name}
                  </DisclosureButton>
                </Link>
              ))}

            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{pageTitle}</h1>
        </div>
      </header>
    </>
  )
}
