 
import React, { useState, useEffect, useRef } from "react";

export default function DropDownSearch({
  label,
  options = [],
  selected,
  onSelect,
  placeholder = "Search...",
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  // Normalize options safely
  const normalize = (opt) => {
    if (typeof opt === "string") {
      return { label: opt, labelText: opt, value: opt };
    }

    if (opt && typeof opt === "object") {
      return {
        label: opt.label,
        labelText: opt.labelText ?? "",
        value: opt.value ?? "",
      };
    }

    return { label: "", labelText: "", value: "" };
  };

  const normalizedOptions = options.map(normalize);

  const filteredOptions = normalizedOptions.filter((opt) =>
    opt.labelText.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col  gap-[1rem] w-full" ref={containerRef}>
      {label && <label className="textFormColor1">{label}</label>}

      <div
        className="flex items-center cursor-pointer inputMod"
        onClick={() => setOpen(!open)}
      >
        {selected || placeholder}
      </div>

      {open && (
        <div className="mt-1 w-full  border rounded-md absolute top-[6.3125rem] z-10 bg-inputBack scrollBar p-2 max-h-64 overflow-y-auto">
          <input
            type="text"
            className="w-full text-limeLight border rounded-md p-2  not-odd: mb-2"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filteredOptions.length === 0 ? (
            <p className="text-limegray text-sm text-center py-2">
              No results found
            </p>
          ) : (
            filteredOptions.map((opt, idx) => (
              <div
                key={idx}
                className="p-2 hover:text-lemongreen text-formColor cursor-pointer rounded-md"
                onClick={() => {
                  onSelect(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
