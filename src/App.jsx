// import { useState } from 'react'

import { useState } from 'react';
import './App.css'
import EnhanceContent from './components/EnhanceContent';
import GenerateContent from './components/GenerateContent';

function App() {
	const [recordedTextArr, setRecordedTextArr] = useState([]);

	return (
		<div className='h-screen w-screen flex flex-col bg-stone-50'>
			<div className='text-center w-[100%] md:w-[80%] m-auto p-[2.5em] md:h-[20%]'>
				<h1 className='font-bold text-3xl md:text-4xl tracking-tight mb-2 text-black'>Voice2Post</h1>
				<p className='text-blue-950'>
				Our web application lets you easily turn your spoken words into text. Then, it uses AI to improve the text, making it ready to share on any social media platform. Just speak, convert, and share your enhanced message effortlessly.
				</p>
			</div>

			<div className='flex flex-col md:flex-row p-[30px] pt-0 md:pt-[30px] md:h-[80%]'>
				<GenerateContent 
					recordedTextArr={recordedTextArr}
					setRecordedTextArr={setRecordedTextArr}
				/>
				<EnhanceContent 
					recordedTextArr={recordedTextArr}
					setRecordedTextArr={setRecordedTextArr}
				/>
			</div>
		</div>
	)
}

export default App
