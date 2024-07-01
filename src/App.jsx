import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberActive, setNumberActive] = useState(false);
  const [charActive, setCharActive] = useState(false);
  const [password, setPassword] = useState("");

  //useref hook

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberActive) {
      str += "0123456789";
    }
    if (charActive) {
      str += "!@#$%^&*()_+";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberActive, charActive, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberActive, charActive, passwordGenerator]);

  return (
    <div className=" mt-10">
      <h1 className="text-4xl text-center text-slate-600 font-bold">
        Password Generator
      </h1>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 my-8 text-green-400 bg-gray-700">
        <div className="flex shadow-lg overflow-hidden rounded-lg mb-4 py-5">
          <input
            type="text"
            value={password}
            className="outline-none bg-gray-200 text-green-400 w-full p-2 rounded-s-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-green-400 text-white px-3 py-1 shrink-0 rounded-e-lg hover:bg-green-500"
            onClick={copyPasswordToClipboard}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 py-5">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="text-green-400">Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberActive}
              id="numberInput"
              onChange={() => setNumberActive((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="text-green-400">
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charActive}
              id="charInput"
              onChange={() => setCharActive((prev) => !prev)}
            />
            <label htmlFor="charInput" className="text-green-400">
              Special Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
