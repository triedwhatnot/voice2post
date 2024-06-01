import React, { useEffect, useRef, useState } from 'react'
import micIcon from '../assets/mic.svg';
import { capitalizeFirstLetter } from "../utility"

const GenerateContent = () => {
  const [recognitionObj, setRecognitionObj] = useState(null);
  const [recordedTextArr, setRecordedTextArr] = useState([]);
  const [showMicAnimation, setShowMicAnimation] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [textareaVal, setTextareaVal] = useState(false);
  const textareaRef = useRef(null);
  const textContainerRef = useRef(null);
  
  useEffect(()=>{
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.log("SpeechRecognition not supported");
      return null;
    }
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setRecognitionObj(recognition);

    // document.querySelector('button').addEventListener('click', () => {
    //   recognition.start();
    // });

    // recognition.addEventListener('speechstart', handleSpeechStart);
    recognition.addEventListener('result', handleSpeechResult);
    recognition.addEventListener('speechend', handleSpeechEnd);
    recognition.addEventListener('error', handleSpeechError);

    // function handleSpeechStart(){
    //   console.log('Speech has been detected.');
    // }
    function handleSpeechEnd(){
      // console.log('Speech has been ended.');
      recognition.stop();
      setTimeout(()=>{
        recognition.start();
      },500)
    }

    function handleSpeechResult(e){
      // console.log('Result has been detected.');

      let last = e.results.length - 1;
      let text = e.results[last][0].transcript;

      handleText(capitalizeFirstLetter(text));
    }

    function handleSpeechError(e){
      console.log("recognition error", e);
      recognition.stop();
      setShowMicAnimation(false);
      setIsRecording(false);
    }

    return ()=>{
      // recognition.removeEventListener('speechstart', handleSpeechStart);
      recognition.removeEventListener('result', handleSpeechResult);
      recognition.removeEventListener('speechend', handleSpeechEnd);
      recognition.removeEventListener('error', handleSpeechError);
    }
  }, []);

  const toggleRecording = () => {
    if(isEditing){
      saveEditedText();
      setIsEditing(val => !val);
      return;
    }

    if(isRecording){
      recognitionObj.stop();
      setShowMicAnimation(false);
    }
    else{
      recognitionObj.start();
      setShowMicAnimation(true);
    }
    setIsRecording(isRecording => !isRecording);
  }

  const handleText = (text) => {
    setRecordedTextArr(arr => [...arr, text]);
    setTimeout(()=>{
      textContainerRef.current.scrollTop = textContainerRef.current?.scrollHeight;
    }, 100);
  }

  const handleTextareaChange = (e) => {
    setTextareaVal(e.target.value);
  }

  const handleEditSave = () => {
    try{
      // stop recording
      if(isRecording){
        recognitionObj.stop();
        setShowMicAnimation(false);
        setIsRecording(isRecording => !isRecording);
      }

      if(isEditing){
        // save
        saveEditedText();
      }
      else{
        // edit
        let text = recordedTextArr?.length ? recordedTextArr.reduce((acc, txt) => { 
          return `${acc + ". " + txt}`;
        }) : "";
        setTextareaVal(text);

        setTimeout(()=>{
          textareaRef.current?.setSelectionRange(textareaRef.current?.value.length,textareaRef.current?.value.length);
        }, 10);
        
      }
      setIsEditing(val => !val);
    }
    catch(ex){
      console.log("Error in handleEditSave", ex)
    }
  }

  const saveEditedText = () => {
    try{ 
      let allText = textareaRef.current?.value?.trim();
      allText = allText !== "" ? textareaRef.current?.value?.split(".") : [];
      allText = allText.map(txt => capitalizeFirstLetter(txt.trim()));
      setRecordedTextArr(allText);
      setTimeout(()=>{
        textContainerRef.current.scrollTop = textContainerRef.current?.scrollHeight;
      }, 100);
    }
    catch(e){
      console.log("Error in saveEditedText", e)
    }
  }

  return (
    <div className='flex flex-col h-[80vh] md:h-[unset] w-full md:w-2/4 items-center border border-sky-200 mr-[5px] p-[10px]'>
        <div className='flex-[0_0_20%] flex items-center relative'>
            {
              showMicAnimation ? 
              <div className='z-0 absolute h-full w-full flex justify-center items-center'>
                  <span className="animate-ping inline-flex h-[45px] w-[45px] rounded-full bg-sky-600 opacity-75"></span>
              </div>
              : ""
            }
            <img src={micIcon} className={`relative z-10 h-[75px] p-[15px] rounded-[40px] border border-sky-200 ${showMicAnimation ? "bg-sky-200" : ""}`} onClick={toggleRecording} />
        </div>
      
        <div ref={textContainerRef} className='flex-[0_0_70%] w-full bg-gray-100 p-[15px] border border-sky-400 rounded-md overflow-auto'>
          {
            !isEditing ? 
            
            (recordedTextArr?.length ?
            recordedTextArr.map((text, idx) => {
              return (
                <span key={idx}>{(idx === 0 ? "" : ". ") + text}</span>
              )
            })
             : "")

            :
            <textarea autoFocus={true} ref={textareaRef} className='resize-none outline-none h-full w-full bg-gray-100' value={textareaVal} onChange={handleTextareaChange}/>
          }
        </div>

        <div className='flex-[0_0_10%] w-full flex justify-end items-end'>
            <button className='p-[20px] border-sky-400 border rounded-[14px] w-[100px] h-[42px] flex items-center justify-center' onClick={handleEditSave}>{isEditing ? "Save" : "Edit"}</button>
        </div>
        
    </div>
  )
}

export default GenerateContent;