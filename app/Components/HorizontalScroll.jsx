'use client'
import React, { useRef, useEffect } from "react";

const HorizontalScroll = ({ children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;

    const onWheel = (e) => {
      if (el) {
        e.preventDefault(); // prevent vertical scroll
        el.scrollLeft += e.deltaY; // translate vertical wheel to horizontal scroll
      }
    };

    el.addEventListener("wheel", onWheel);
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto scrollbar-hide flex gap-4"
      style={{ whiteSpace: "nowrap" }}
    >
      {children}
    </div>
  );
};

export default HorizontalScroll;
