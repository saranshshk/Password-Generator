import { useState, useCallback, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.css";
import icon from "./assets/icon1.svg";
function App() {
  const [length, setLength] = useState(6);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [low, setLow] = useState(true);
  const [upp, setUPP] = useState(false);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const passwordref = useRef(null);
// COPY TO CLIPBOARD
  const copyPassword = useCallback(() => {
    if (!password) {
      toast.error("No password to copy ❌");
      return;
    }
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
    toast.success("Password copied ✅");
  }, [password]);

////GENERATE PASSWORD
  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "";
    if (low) str += "abcdefghijklmnopqrstuvwxyz";
    if (upp) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number) str += "0123456789";
    if (char) str += "@#$&{}+=)(*";
    if (!low && !upp && !number && !char) {
      toast.error("Select at least one option", { toastId: "one-toast-only" });
      return;
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, char, low, upp]);

  useEffect(() => {
    passwordGen();
  }, [passwordGen]);

//STRENGTH CHECK
  useEffect(() => {
    let score = 0;
    if (low) score++;
    if (number) score++;
    if (upp) score++;
    if (char) score++;
    if (length >= 8) score++;
    if (length >= 16) score++;

    if (score <= 2) {
      setStrength("WEAK");
    } else if (score <= 4) {
      setStrength("MEDIUM");
    } else {
      setStrength("STRONG");
    }
  }, [length, number, char, low, upp]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />

      <div>
        <h1 className={`${styles.heading} text-white text-center my-8`}>
          Password Generator
        </h1>
      </div>


      <div className={`${styles.container} w-full max-w-md mx-auto shadow-md rounded-lg px-4  my-8 `}>
        <div className="relative w-full mb-4">
          <input
            type="text"
            value={password}
            placeholder="Select at Least one option"
            readOnly
            ref={passwordref}
            className={`w-full py-2 pl-3 pr-10 h-12 bg-gray-500 rounded-lg outline-none text-white text-[20px] `}
          />

          <button
            onClick={copyPassword}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded"
          >
            <img
              src={icon}
              alt=""
              className="w-5 h-5 hover:invert transition"
            />
          </button>
        </div>


        <div className={`${styles.custom} text-sm gap-x-2  rounded-lg h-93 text-white `}>
          <div className=" grid items-center gap-x-1">
            <div className="flex mt-2.5 ml-4 justify-between mr-4">
              <h1 className="text-[24px]">Character Length </h1>
              <label htmlFor="length" className="text-[25px] text-green-500 ">
                {length}
              </label>
            </div>

            <input
              type="range"
              min={6}
              max={30}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              className={`${styles.rangeSlider} cursor-pointer w-[90%]   mt-3 ml-5 bg-gray-700 rounded-lg accent-[#00FF41]  `}
            />
          </div>

          <div className=" items-center gap-x-1 ml-7 text-[20px] tracking-[2px] ">
            <div className="flex gap-5 mt-3 ">
              <input
                type="checkbox"
                checked={char}
                id="CharInput"
                className="accent-[#00FF41] cursor-pointer"
                onChange={() => {
                  setChar((prev) => !prev);
                }}
              />
              <label htmlFor="charInput">Include Special Characters</label>
            </div>

            <div className="flex gap-5 ">
              <input
                type="checkbox"
                checked={low}
                className="accent-[#00FF41] cursor-pointer"
                onChange={() => {
                  setLow((prev) => !prev);
                }}
              />
              <label htmlFor="charInput">Include Lower Case</label>
            </div>

            <div className="flex gap-5 ">
              <input
                type="checkbox"
                checked={upp}
                className="accent-[#00FF41] cursor-pointer"
                onChange={() => {
                  setUPP((prev) => !prev);
                }}
              />
              <label htmlFor="charInput">Include Upper Case</label>
            </div>


            <div className="flex gap-5 ">
              <input
                type="checkbox"
                checked={number}
                className="accent-[#00FF41] cursor-pointer"
                id="numberInput"
                onChange={() => {
                  setNumber((prev) => !prev);
                }}
              />
              <label htmlFor="numberinput">Include Numbers</label>
            </div> 
          </div>

          <div className="flex  bg-[#161616] ml-7 mr-7 mt-3 h-16  justify-between ">
            <h1 className="text-center ml-4 mt-4 text-[22px] text-gray-300 ">
              Strength
            </h1>

            <div className="flex gap-1.5  mr-5 ">
              <h1 className="text-[24px] mr-2 mt-4 ">{strength}</h1>
              <div className="w-2 h-7 mt-4.5  border-2 border-red-500 bg-red-500"></div>

              <div
                className={
                  strength === "WEAK"
                    ? "w-2 h-7 mt-4.5 border-2 border-orange-400"
                    : "w-2 h-7 mt-4.5 border-2 border-orange-400 bg-orange-400"
                }
              ></div>
              <div
                className={
                  strength === "WEAK"
                    ? "w-2 h-7 mt-4.5 border-2 border-yellow-400"
                    : "w-2 h-7 mt-4.5 border-2 border-yellow-400 bg-yellow-400"
                }
              ></div>

              <div
                className={
                  strength === "WEAK" || strength === "MEDIUM"
                    ? "w-2 h-7 mt-4.5 border-2 border-green-500"
                    : "w-2 h-7 mt-4.5 border-2 border-green-500 bg-green-500"
                }
              ></div>
            </div>
          </div>
          <div className="flex  justify-center  ">
            <pre>
              <button
                className=" mt-5     text-black  py-2.5 px-3 rounded-lg bg-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 ease-in-out shadow-[0_0_10px_rgba(0,255,65,0.2)] hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] active:scale-95 uppercase text-[22px] ml-1  "
                onClick={() => passwordGen()}
              >
                ReGenerate  ➔
              </button>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
