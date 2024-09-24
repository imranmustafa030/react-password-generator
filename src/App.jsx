import { useCallback, useEffect, useState, useRef } from 'react'

function App() {

  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [password,setPassword] = useState(null);

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if(number) str += '0123456789';
    if(symbol) str += '!@#$%^&*-_+=[]{}~`'

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length, number, symbol, setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length, number, symbol, passwordGenerator])

  return (
    <div className='w-screen h-screen mx-auto bg-gray-800 text-orange-500 py-4 px-4'>
      <h1 className='text-center text-4xl py-4'> Password Generator</h1>
      <div className='bg-slate-700 w-1/2 max-w-md mx-auto rounded-lg py-4 px-4 text-orange-500'>
        <div className=''>
          <div className='flex shadow rounded-lg overflow-hidden'>
            <input type="text" 
            placeholder='Password'
            value={password} 
            readOnly
            className='outline-none w-full py-1 px-3'
            ref={passwordRef}
            />
            <button 
              className='bg-blue-600 px-3 text-white'
              onClick={copyPasswordToClipboard}
            >Copy</button>
          </div>
        </div>
        <div className='flex text-sm gap-x-2 pt-4'>
          <div className='flex items-center gap-x-1'>
            <input type="range" 
              min={6}
              max={100}
              value={length}
              onChange={(e)=>{setLength(e.target.value)}}
              className=''
            />
            <label> length: {length} </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
              defaultChecked={number}
              onChange={()=> {setNumber((prev) => !prev)}}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={symbol}
              onChange={()=>{setSymbol((prev)=> !prev)}}
            />
            <label htmlFor="symbolInput">Symbols</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
