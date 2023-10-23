import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dialog, Disclosure, Popover, Transition, Menu } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Dropdown from './Dropdown'


const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }
    return (
        <header className="bg-gray-700">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/trangchu" className="-m-1.5 p-1.5">
                        {/* <span className="sr-only">Your Company</span> */}
                        <span>
                            <i>
                                <span className='font-serif text-3xl font-bold text-yellow-300'>Dor</span>
                                <span className='font-serif text-2xl font-semibold text-blue-700'>mi</span>
                                <span className='font-serif text-2xl font-semibold text-orange-500'>to</span>
                                <span className='font-serif text-2xl font-semibold text-pink-700'>ry</span>
                            </i>
                        </span>
                        {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> */}
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <Link to="/trangchu">
                        <button type='button' className="text-xl font-bold leading-6 text-white">
                            TRANG CHỦ
                        </button>
                    </Link>
                    <Link to="/tintuc-sukien">
                        <button type='button' className="text-xl font-bold leading-6 text-white">
                            TIN TỨC - SỰ KIỆN
                        </button>
                    </Link>
                    <Link to="/gioithieu">
                        <button type='button' className="text-xl font-bold leading-6 text-white">
                            GIỚI THIỆU
                        </button>
                    </Link>
                    <Link to="/noiquy">
                        <button type='button' className="text-xl font-bold leading-6 text-white">
                            NỘI QUY
                        </button>
                    </Link>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Dropdown />
                </div>
            </nav>
            {/* Mobile */}
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10  bg-gradient-to-b  from-cyan-500 to-green-300">
                    <div className="flex items-center justify-between">
                        <Link to="/trangchu" className="-m-1.5 p-1.5">
                            {/* <span className="sr-only">Your Company</span> */}
                            <span>
                                <i>
                                    <span className='font-serif text-3xl font-bold text-yellow-300'>Dor</span>
                                    <span className='font-serif text-2xl font-semibold text-blue-700'>mi</span>
                                    <span className='font-serif text-2xl font-semibold text-orange-500'>to</span>
                                    <span className='font-serif text-2xl font-semibold text-pink-700'>ry</span>
                                </i>
                            </span>
                            {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> */}
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link to="/trangchu" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-black">
                                    TRANG CHỦ
                                </Link>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-black"
                                >
                                    TIN TỨC - SỰ KIỆN
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-black"
                                >
                                    GIỚI THIỆU
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-black"
                                >
                                    NỘI QUY
                                </a>
                            </div>
                            <div className="py-6">
                                <Link
                                    to="/thongtincanhan"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white"
                                >
                                    Thông tin cá nhân
                                </Link>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white"
                                >
                                    B1910454
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-100 hover:text-red-500"
                                >
                                    Đăng xuất <span aria-hidden="true">&rarr;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}

export default Header;