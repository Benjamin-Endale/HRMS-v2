'use client'
import React, { useState, useRef, useEffect } from "react"; 


export function Dropdown({ label, options, selected, onSelect, placeholder, className , color , ClassForborder,src }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative flex flex-col gap-[1rem] ${className || "w-full"}`}>
      {label && <label className="textFormColor1">{label}</label>}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={` ${ClassForborder || "inputMod"}  flex items-center justify-between pr-[1.5625rem]`}
      >
        <span className={`${selected ? "textFormColor1" : "text-limegray select-none"} flex gap-[1rem]`}>
          {src && <img src={src} alt=""/>}
          {selected || placeholder}
        </span>
        <img className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} src="/image/Icon/ArrowDown.png" alt="" />
      </button>

      {open && (
        <ul className={`${color || 'bg-inputBack'}  rounded-[10px] flex  max-h-[12.5rem] overflow-y-auto scrollBarDash space-y-5 py-5 w-full top-[6.3125rem] absolute z-10 text-formColor flex-col text-center border border-limeLight`}>
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer ${selected === opt ? "text-lemongreen font-bold" : "textFormColor1"}`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
