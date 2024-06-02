import { useEffect, useRef, useState } from 'react'
import micIcon from '../assets/mic.svg';
import micBlackIcon from '../assets/mic-black.svg';
import { capitalizeFirstLetter } from "../utility"

const GenerateContent = ({recordedTextArr, setRecordedTextArr}) => {
  
  const [recognitionObj, setRecognitionObj] = useState(null);
  const [blockMicClick, setBlockMicClick] = useState(false);
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

    recognition.addEventListener('result', handleSpeechResult);
    recognition.addEventListener('speechend', handleSpeechEnd);
    recognition.addEventListener('error', handleSpeechError);

    function handleSpeechEnd(){
      recognition.stop();
      setTimeout(()=>{
        recognition.start();
      },500)
    }

    function handleSpeechResult(e){
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
      recognition.removeEventListener('result', handleSpeechResult);
      recognition.removeEventListener('speechend', handleSpeechEnd);
      recognition.removeEventListener('error', handleSpeechError);
    }
  }, []);

  const toggleRecording = () => {
    if(blockMicClick) return;

    setBlockMicClick(true);
    setTimeout(()=>{
      setBlockMicClick(false);
    },2000);

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
    <div className='flex flex-col h-[80vh] md:h-[unset] w-full md:w-2/4 items-center border border-stone-300 md:mr-[20px] px-[15px] md:px-[30px] py-[10px] rounded-md overflow-auto bg-white shadow-md'>
        <div className='flex-[0_0_20%] flex items-center relative'>
            {
              showMicAnimation ? 
              <div className='z-0 absolute h-full w-full flex justify-center items-center'>
                  <span className="animate-ping inline-flex h-[45px] w-[45px] rounded-full bg-sky-600 opacity-75"></span>
              </div>
              : ""
            }
            <img src={showMicAnimation ? micIcon : micBlackIcon} alt='mic icon' className={`relative z-10 h-[70px] p-[15px] rounded-[40px] border border-stone-300 hover:border-stone-600 cursor-pointer ${showMicAnimation ? "bg-red-500" : ""}`} onClick={toggleRecording} />
        </div>
      
        <div ref={textContainerRef} className='flex-[0_0_68%] w-full bg-[#eee] p-[15px] border border-stone-400 rounded-md overflow-auto shadow-sm'>
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
            <textarea autoFocus={true} ref={textareaRef} className='resize-none outline-none h-full w-full bg-transparent' value={textareaVal} onChange={handleTextareaChange}/>
          }
        </div>

        <div className='flex-[0_0_12%] w-full flex justify-end items-center mt-[5px]'>
            <button className='p-[20px] border-stone-400 border rounded-[14px] w-[100px] h-[42px] flex items-center justify-center hover:border-stone-600 shadow-md' onClick={handleEditSave}>{isEditing ? "Save" : "Edit"}</button>
        </div>
        
    </div>
  )
}

export default GenerateContent;