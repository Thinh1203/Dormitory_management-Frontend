import React from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer
            className="bg-gray-600 text-center dark:bg-neutral-600 lg:text-left">
            <div className="container px-6 py-2 text-white dark:text-neutral-200">
                <div className="grid gap-4 lg:grid-cols-3">
                    <div className="mb-6 md:mb-0">
                        <h5 className="mb-2 font-medium uppercase text-md">Hệ thống quản lý ký túc xá</h5>
                        <p className="mb-1 text-sm text-gray-300">
                            Trường Đại học Cần Thơ 	&#40; Can Tho University &#41;
                        </p>
                        <p className="mb-1 text-sm text-gray-300">
                            Địa chỉ: Khu II, đường 3/2, P.Xuân Khánh, Q.Ninh Kiều, TP.Cần Thơ.
                        </p>
                        <p className="mb-1 text-sm text-gray-300">
                            Điện thoại: 0345139122. {' '} Email: thinhb1910454@student.ctu.edu.vn
                        </p>
                    </div>

                    <div className="mb-6 md:mb-0 text-center">
                        <h5 className="mb-2 font-medium uppercase text-md">Mục lục</h5>
                        <Link to={"/trangchu"}>
                            <div className='text-sm text-gray-300 hover:text-white'>
                                TRANG CHỦ
                            </div>
                        </Link>
                        <Link to={"/trangchu"}>
                            <div className='text-sm text-gray-300 hover:text-white'>
                                TIN TỨC - SỰ KIỆN
                            </div>
                        </Link>
                        <Link to={"/trangchu"}>
                            <div className='text-sm text-gray-300 hover:text-white'>
                                GIỚI THIỆU
                            </div>
                        </Link>
                        <Link to={"/trangchu"}>
                            <div className='text-sm text-gray-300 hover:text-white'>
                                NỘI QUY
                            </div>
                        </Link>
                    </div>
                    <div className="mb-6 md:mb-0">
                        <h5 className="mb-2 font-medium uppercase text-md">Follow</h5>
                        <div className='grid gap-4 lg:grid-cols-3'>
                            <div className='flex flex-col'>
                                <div>
                                    <Tooltip title="Facebook" placement="top">
                                        <IconButton>
                                            <FacebookOutlinedIcon className='text-blue-500' />
                                        </IconButton>
                                    </Tooltip>
                                    <span className='p-1'>Facebook</span>
                                </div>
                                <div className=''>
                                    <Tooltip title="Twitter" placement="top">
                                        <IconButton>
                                            <TwitterIcon className='text-cyan-300' />
                                        </IconButton>
                                    </Tooltip>

                                    <span className='p-1'>Twitter</span>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='justify-start'>
                                    <Tooltip title="Instagram" placement="top">
                                        <IconButton>
                                            <InstagramIcon className='bg-gradient-to-r from-purple-500 via-red-300 to-orange-500' />
                                        </IconButton>
                                    </Tooltip>
                                    <span className='mx-2'>Instagram</span>
                                </div>
                                <div>
                                    <Tooltip title="Twitter" placement="top">
                                        <IconButton>
                                            <PinterestIcon className='text-red-400' />
                                        </IconButton>
                                    </Tooltip>
                                    <span className='p-1'>Pinterest</span>
                                </div>

                            </div>
                            <div className='flex flex-col'>
                                <div className='justify-start'>
                                    <Tooltip title="LinkedIn" placement="top">
                                        <IconButton>
                                            <LinkedInIcon className='text-cyan-300' />
                                        </IconButton>
                                    </Tooltip>
                                    <span className='mx-2'>LinkedIn</span>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* <!--Copyright section--> */}
            <div
                className="bg-neutral-200 p-2 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
                © 2023 Copyright:
                B1910454
            </div>
        </footer>
    );
}

export default Footer;