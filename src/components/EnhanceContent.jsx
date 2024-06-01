import React from 'react';
import linkedinLogo from "../assets/linkedin.svg";
import twitterLogo from "../assets/twitter.svg";

const EnhanceContent = () => {
  return (
    <div className='flex flex-col h-[95vh] md:h-[unset] w-full md:w-2/4 items-center border border-sky-200 ml-[5px] p-[10px] mt-[50px] md:mt-0'>
        <div className='flex-[0_0_20%] flex flex-col items-center w-full justify-center'>
            <div className='flex flex-col md:flex-row w-full justify-around items-center'>
                <input type='text' placeholder='Write your custom prompt here...' className='outline-none border border-sky-200 w-full md:w-[10em] lg:w-[12em] xl:w-[20em] h-[42px] rounded-md p-[10px]' />
                <button className='p-[20px] border-sky-400 border rounded-[14px] w-[100px] h-[42px] flex items-center justify-center mt-[10px] mb-[10px] md:mt-0 md:mb-0'>Generate</button>

                <div className='hidden md:block'>OR</div>
                <div className='flex mb-[5px] md:mb-0'>
                    <img src={linkedinLogo} className='h-[35px] pt-[5px] mr-[5px] lg:mr-[15px]' />
                    <img src={twitterLogo} className='h-[42px] p-[1px]' />
                </div>
            </div>
            
        </div>
        

        <div className='flex-[0_0_70%] w-full border p-[15px]  bg-gray-100 border-sky-400 rounded-md overflow-auto'>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </div>

        <div className='flex-[0_0_10%] w-full flex justify-end items-end'>
            <button className='p-[20px] border-sky-400 border rounded-[14px] w-[100px] h-[42px] flex items-center justify-center '>Copy</button>
        </div>
    </div>
  )
}

export default EnhanceContent