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
        className={` ${ClassForborder || "inputModNav"}  relative flex items-center justify-between pr-[0.5625rem]`}
      >
        <span className={`${selected ? "text-formcolor text-[14px] text-wrap " : "text-limegray text-[14px] select-none"}  flex gap-[1rem]`}>
          {src && <img src={src} alt=""/>}
          {selected || placeholder}
        </span>
        <img className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} src="/image/Icon/ArrowDown.png" alt="" />
      </button>

      {open && (
        <ul className={`${color || 'bg-[rgba(13,15,17,1)]'} absolute  rounded-[10px] flex  max-h-[12.5rem] overflow-y-auto scrollBarDash space-y-1 py-5 w-full top-[-10.8125rem]   z-10 text-formColor flex-col text-center border border-limeLight`}>
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer  text-[14px]  ${selected === opt ? "text-lemongreen font-bold " : "text-limegray"}`}
            >
              {opt}     
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
