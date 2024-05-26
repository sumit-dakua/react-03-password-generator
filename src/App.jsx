import { useState,useCallback, useEffect, useRef} from 'react'

function App() {
  const [length,setLength] = useState(8);
  const [requireNumbers, setRequireNumbers]= useState(false);
  const [requireCharecters, setRequireCharecters] = useState(false);
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState("black")

  // useRef
  const passwdRef = useRef(null);
  // use of useCallBack hook to generate password
  const passwordGenerator = useCallback(()=>{
    let passwd = "";
    let alphabetsForPasswd="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbersForPasswd= "0123456789";
    let specialCharectersForPasswd= "~!@#$%^&*()_,.?{}[]`"

    

    if(requireNumbers)  alphabetsForPasswd+= numbersForPasswd;
    if(requireCharecters)  alphabetsForPasswd+= specialCharectersForPasswd;

    console.log(alphabetsForPasswd)
    for(let i=0; i < length; i++){
      let char =Math.floor(Math.random()*alphabetsForPasswd.length);
      passwd += alphabetsForPasswd.charAt(char);
      console.log(passwd);
    }
    setPassword(passwd);
  },[length, requireNumbers,requireCharecters, setPassword]);

  const copyPasswdToClipboard = useCallback(()=>{
    passwdRef.current?.select(); 
    passwdRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,requireNumbers,requireCharecters, passwordGenerator]);




  return (
    <>
          <div className="w-full max-w-md mx-auto  shadow-md rounded-lg px-2 py-3 my-8 bg-gray-800 text-orange-500">
          <h1 className='text-white text-center my-3'>
          <span className="material-symbols-outlined">
            key_vertical
          </span>
              Password generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type ="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
                ref={passwdRef}

          />
          <button
              onClick={passwordGenerator}
              className='outline-none bg-white text-gray-800 px-3 py-1 shrink-0 flex items-center'>
              <span className="material-symbols-outlined mr-1">
                  refresh
              </span>
          </button>
          <button
            onClick={copyPasswdToClipboard}
            className='outline-none bg-white text-gray-800 px-1 py-1 shrink-0 flex items-center'>
            <span className="material-symbols-outlined">
            content_copy
            </span>
          </button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input 
              type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
                />
                <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                  type="checkbox"
                  defaultChecked={requireNumbers}
                  id="numberInput"
                  onChange={() => {
                      setRequireNumbers((prev) => !prev);
                  }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                  type="checkbox"
                  defaultChecked={requireCharecters}
                  id="characterInput"
                  onChange={() => {
                      setRequireCharecters((prev) => !prev )
                  }}
              />
              <label htmlFor="characterInput"> Special characters</label>
            </div>
          </div>
        </div>
      
    </>
  )
}


export default App
