// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import './App.css'
import EnhanceContent from './components/EnhanceContent';
import GenerateContent from './components/GenerateContent';

function App() {

	return (
		<div className='h-screen w-screen flex flex-col'>
			<div className='text-center w-[100%] md:w-[80%] m-auto p-[2.5em] md:h-[20%]'>
				<h1 className='font-bold text-3xl md:text-4xl tracking-tight mb-2 text-black'>Voice2Post</h1>
				<p>
				Our web application lets you easily turn your spoken words into text. Then, it uses AI to improve the text, making it ready to share on any social media platform. Just speak, convert, and share your enhanced message effortlessly.
				</p>
			</div>

			<div className='flex flex-col md:flex-row p-[30px] pt-0 md:pt-[30px] md:h-[80%]'>
				<GenerateContent />
				<EnhanceContent />
			</div>
		</div>
	)
}

export default App