import React, { useState } from 'react';
import linkedinLogo from "../assets/linkedin.svg";
import twitterLogo from "../assets/twitter.svg";
import { generateEnhancedText, GPT_OPTIONS } from '../gpt';
import { clipboardCopy } from '../utility';
import ThreeDotLoader from './ThreeDotLoader';

const EnhanceContent = ({recordedTextArr}) => {
	
	const [promptVal, setPromptVal] = useState("");
	const [divContent, setDivContent] = useState("");
	const [bottomCtaCopy, setBottomCtaCopy] = useState("Copy");
	const [isLoading, setIsLoading] = useState(false);

	const linkedinGeneratorHandler = async ()=>{
		setIsLoading(true);
		let txt = await generateEnhancedText(GPT_OPTIONS.LINKEDIN.id, recordedTextArr);
		setDivContent(txt);
		setIsLoading(false);
	}

	const twitterGeneratorHandler = async ()=>{
		setIsLoading(true);
		let txt = await generateEnhancedText(GPT_OPTIONS.TWITTER.id, recordedTextArr);
		setDivContent(txt);
		setIsLoading(false);
	}

	const customGeneratorHandler = async ()=>{
		setIsLoading(true);
		let txt = await generateEnhancedText(GPT_OPTIONS.CUSTOM.id, recordedTextArr, promptVal);
		setDivContent(txt);
		setIsLoading(false);
	}

	const copyCtaHandler = () => {
		try{
			clipboardCopy(divContent);
			setBottomCtaCopy("Copied!");
			setTimeout(()=>{
				setBottomCtaCopy("Copy");
			}, 3000);
		}
		catch(e){
			console.log("Error in copyCtaHandler: ", e);
		}
	}

  return (
    <div className='flex flex-col h-[95vh] md:h-[unset] w-full md:w-2/4 items-center border border-stone-300 md:ml-[20px] p-[10px] mt-[50px] md:mt-0 rounded-md'>
        <div className='flex-[0_0_20%] flex flex-col items-center w-full justify-center'>
            <div className='flex flex-col md:flex-row w-full justify-around items-center'>
                <input value={promptVal} onChange={(e)=> setPromptVal(e.target.value)} type='text' placeholder='Write your custom prompt here...' className='outline-none border border-stone-300 w-full md:w-[10em] lg:w-[12em] xl:w-[20em] h-[42px] rounded-md p-[10px]' />
                <button onClick={customGeneratorHandler} className='p-[20px] border-stone-400 hover:border-stone-600 border rounded-[14px] w-[100px] h-[42px] flex items-center justify-center mt-[10px] mb-[10px] md:mt-0 md:mb-0'>Generate</button>

                <div className='hidden md:block'>OR</div>
                <div className='flex mb-[5px] md:mb-0'>
                    <img src={linkedinLogo} onClick={linkedinGeneratorHandler} className='h-[35px] pt-[5px] mr-[5px] lg:mr-[15px] cursor-pointer' />
                    <img src={twitterLogo} onClick={twitterGeneratorHandler} className='h-[42px] p-[1px] cursor-pointer' />
                </div>
            </div>
            
        </div>
        

        <div className={`flex-[0_0_70%] w-full border p-[15px] whitespace-pre-line bg-gray-100 border-stone-400 rounded-md overflow-auto ${isLoading ? "flex justify-center items-center" : ""}`}>
					{isLoading ? <ThreeDotLoader /> : <>{divContent}</>}
        </div>

        <div className='flex-[0_0_10%] w-full flex justify-end items-end'>
            <button onClick={copyCtaHandler} className='p-[20px] border-stone-400 hover:border-stone-600 border rounded-[14px] w-[100px] h-[42px] flex items-center justify-center'>{bottomCtaCopy}</button>
        </div>
    </div>
  )
}

export default EnhanceContent