import { useEffect, useRef, useState } from "react";
import ReactCodeMirror, { EditorState, EditorView } from "@uiw/react-codemirror";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { yCollab } from "y-codemirror.next";
import { indentUnit } from "@codemirror/language";    
import { DropdownArrow } from "../../Icons/DropdownArrow";
import { go } from "@codemirror/lang-go";
import { clsx } from "clsx";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { rust } from "@codemirror/lang-rust";
import {useParams} from 'react-router-dom'
import Loading from "../Loading";
import { PermissionManager } from "./PermissionManager";
import { AccessIcon } from "../../Icons/AccessIcon";
import { RunCodeIcon } from "../../Icons/RunCodeIcon";
import { SaveCodeIcon } from "../../Icons/SaveCodeIcon";
import { toast } from "react-toastify";
import { BackIcon } from "../../Icons/BackIcon";
function randomColor() : String{
  let color = "#"
  const opt = "1234567890abcdef"
  for(var i = 0; i < 6; i++){
    color += opt[Math.floor(Math.random()*16)]
  }
  return color;
}
const langContext = {
  javascript: javascript(),
  python: python(),
  c: cpp(), // C and C++ use the cpp() extension
  cpp: cpp(),
  go: go(),
  java: java(),
  rust: rust(),
};

const langToText = {
  javascript: "JavaScript",
  cpp: "C++",
  c: "C",
  python: "Python",
  go: "Go",
  java: "Java",
  rust: "Rust",
};
const langExtensions = {
  "javascript" : "js", "cpp":"cpp", "c":"c", "python":"py", "go":"go", "java":"java", "rust" : "rs"
}
const languages = ["javascript", "cpp", "c", "python", "go", "java", "rust"] as const;
function base64ToUint8Array(base64String : string) {
  const binaryString = atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function CollaborativeEditor() {
  const{room_id} = useParams();
  const [inputVal,setInput] = useState('');
  const [outputVal,setOutput] = useState('');
  const ydocRef = useRef<Y.Doc>(new Y.Doc());
  const ytextRef = useRef<Y.Text | null>(null);
  const providerRef = useRef<WebrtcProvider | null>(null);
  const undoManagerRef = useRef<Y.UndoManager | null>(null);
  const yMapRef = useRef<Y.Map<any> | null>(null);
  const [providerReady, setProviderReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang,setLang] = useState<typeof languages[number] >('javascript')
  const[content,setContent] = useState<{[l in typeof languages[number]]: "string"} | null>(null)
  const [readOnly,setReadOnly] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false)
  const [isOwner, setIsOwner] = useState(false);
  const [userInfo, setUserInfo] = useState<null | string>(null)
  useEffect(() => {
    // Initialize Yjs doc and providers 
    const langObserver = (event: Y.YMapEvent<any>) => {
      if (event.keysChanged.has("lang")) {
        const newLang = yMapRef.current!.get("lang");
        setLang(newLang);
      }
    };
    const permObserver = (event:Y.YMapEvent<any>)=>{
      console.log('change observed')
      if(event.keysChanged.has('permission')){
        setReadOnly(!(yMapRef?.current?.get('permission')[providerRef?.current?.awareness!.getLocalState()!.user.name]))
      }
    }
    getSavedContent(room_id as string).then((roomData)=>{
      const room = roomData.room
      Y.applyUpdate(ydocRef.current, base64ToUint8Array(room.ydoc))
      yMapRef.current = ydocRef.current.getMap('sharedstate')
      ytextRef.current = ydocRef.current.getText('codemirror')
      providerRef.current = new WebrtcProvider(room_id as string, ydocRef.current, {
        signaling: ["ws://localhost:4444"], // Adjust if needed
      });
      undoManagerRef.current = new Y.UndoManager(ytextRef.current!);
      setLang(yMapRef.current!.get("lang"));
      setContent(yMapRef.current!.get('content'))
      yMapRef.current!.observe(langObserver);
      yMapRef.current!.observe(permObserver);
      getUserInfo().then(userData=>{  
        setUserInfo(userData.username)
        providerRef.current!.awareness.setLocalStateField("user", {
          name: userData.username,
          color: randomColor(),
        });
        setIsOwner(userData._id == room.user)
      })
      // Observer callback to sync language changes from Yjs to React state
      setProviderReady(true);
    })
    
    return () => {  
      if (yMapRef.current) {
        yMapRef.current.unobserve(langObserver);
      }
      if (providerRef.current) {
        providerRef.current.awareness.setLocalStateField("user", null);
        providerRef.current.disconnect();
        providerRef.current.destroy();
      }
    };
  }, []);
  if (!providerReady) return <Loading/>;
  // Compose extensions   with current React language state to trigger reconfig on lang change
  const extensions = [
    langContext[lang],
    yCollab(ytextRef.current!, providerRef.current!.awareness, 
      {
        undoManager: undoManagerRef.current!,
      }),
    indentUnit.of("    "), // 4 spaces
    EditorState.readOnly.of(readOnly),
    EditorView.editable.of(!readOnly)
  ];
  async function handleSave(){
    if(readOnly) return;
    yMapRef.current?.set('content', {
      ...yMapRef.current!.get('content'),
      [yMapRef.current?.get('lang')] : ytextRef.current?.toString()
    })
    setContent(yMapRef.current?.get('content'))
    toast.success("Code Saved Successfull",{
      theme : 'dark',
      position:'top-right',
      autoClose : 1000,
      pauseOnHover : false
    })
  }
  async function handleRun(){
    const url = 'https://onecompiler-apis.p.rapidapi.com/api/v1/run';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': 'e933401f97msh38b1de3e6f8e51ap1bed78jsnbf58695a9dc1',
        'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language: lang,
        stdin : inputVal,
        files: [
          
          {
            name : "index."+langExtensions[lang],
            content: content![lang] || ''
          }
        ]
      })
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if(result.stderr || result.exception){
        setOutput(result.stderr || result.exception)
      }
      else{
        setOutput(result.stdout)
      }
    } catch (error) {
      console.error(error);
    }
    toast.success("Execution Successful",{
      theme : 'dark',
      position:'top-right',
      autoClose : 1000,
      pauseOnHover : false
    })
  }

  return (<> 
  {isOwner && <PermissionManager isOpen = {permissionModal} onClose={()=>{setPermissionModal(false)}} provider = {providerRef.current} ymap = {yMapRef.current}/>}
  <div className="grid grid-cols-2">
    <div className="h-screen grid grid-rows-[1fr_14fr] grid col-span-[1] border-e-2 border-e-secondary-900 outline-none">
      <div className="bg-primary-800 flex justify-between gap-4 p-3 text-sm items-center">
        <div className="text-primary-600 hover:text-secondary-800 cursor-pointer" onClick={()=>{window.location.href='/dashboard'}}>
          
          <BackIcon/>
        </div>
        <div className="flex gap-4 items-center">

          {isOwner && <div>
            <button
              className="rounded-sm w-20 py-2 items-center px-2 font-semibold text-xs flex items-center justify-between bg-primary-600 cursor-pointer text-primary-800 transition hover:text-secondary-900 "
              onClick={() => {
                setPermissionModal(true)
              }}
            >
              <div>Access</div>
              <AccessIcon/>
            </button>
          </div>}
          <div className="select-none relative">
            <button
              className="rounded-sm items-center w-24 h-8 px-2 text-xs font-semibold bg-primary-600 cursor-pointer text-primary-800 hover:text-secondary-900 transition flex justify-between"
              onClick={() => {
                if(readOnly) return;
                setOpen(!open)
              }}
            >
              <div className="">{langToText[lang]}</div>
              <DropdownArrow />
            </button>
            <ul
              className={clsx(
                "bg-primary-600 text-primary-800 text-xs font-semibold absolute z-20 mt-1 w-24 rounded shadow-md",
                !open && "hidden"
              )}
            >
              {languages.map((l) => (
                <li
                  key={l}
                  onClick={() => {
                    if(l!=lang){
                      yMapRef.current!.set("lang", l); // This triggers sync and langObserver
                      ytextRef.current!.delete(0,ytextRef.current!.length)
                      ytextRef.current!.insert(0,(yMapRef.current!.get('content')[l]))
                      setContent(yMapRef.current?.get('content')[l])
                    }
                    setOpen(false);
                  }}
                  className="p-2 hover:text-secondary-900 transition cursor-pointer transition "
                > 
                  
                  {langToText[l]}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button
              className="rounded-sm w-16 text-xs font-semibold py-2 px-2 bg-primary-600 cursor-pointer text-primary-800 transition hover:text-secondary-900 flex justify-between items-center"
              onClick={() => {
                handleRun();
              }}
            >
              <div>Run</div> 
              <RunCodeIcon/>
            </button>
          </div>
          <div>
            <button
              className="rounded-sm w-16 py-2 text-xs font-semibold px-2 bg-primary-600 cursor-pointer text-primary-800 hover:text-secondary-900 flex justify-between items-center  transition"
              onClick={() => {
                handleSave()
              }}
            >
              <div>Save</div> 
              <SaveCodeIcon/> 
            </button>
          </div>
        </div>
      </div>
      
      <ReactCodeMirror
        className="overflow-x-auto"
        height = "100%"
        theme={"dark"} 
        extensions={extensions}
      />
    </div>
    <div className="h-screen grid grid-rows-2 col-span-[1] outline-none">
      <div className="outline-none row-span-[1] min-h-0 flex flex-col">
        <div className='grow-none px-2 py-2 w-full bg-primary-800 text-secondary-900'>Input</div>
        <textarea placeholder = "Enter Input" value={inputVal} onChange={(e)=>setInput(e.target.value)} className="grow-1 text-primary-800 px-1 py-2 w-full h-full resize-none bg-primary-900 text-white outline-none border-b-2 border-b-secondary-900"/>
      </div>
      <div className="outline-none row-span-[1] min-h-0 flex flex-col">
        <div className='grow-none px-2 py-2 w-full bg-primary-800 text-secondary-900'>Output</div>
        <div className="grow-1 text-primary-800 px-1 py-2 w-full h-full resize-none bg-primary-900 text-white outline-none">{outputVal}</div>
      </div>
      

    </div>
  </div>
   </>
  );
}
function getSavedContent(room_id : string) : Promise<any>{
  return fetch(
  "http://localhost:8080/getRoomData?" + new URLSearchParams({ hash: room_id }),
  {
    method: "GET",
    credentials: "include",
    headers: { "Content-type": "application/json" }
  }
)
  .then((data) => data.json()) // return the parsed JSON
  .then((jsonData) => {
    return jsonData
  }); // return the content from JSON
}
function getUserInfo(): Promise<any> {
  return fetch("http://localhost:8080/getUser", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => data);
}
export default CollaborativeEditor;
