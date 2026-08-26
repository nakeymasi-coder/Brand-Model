import React from "react";

export default function StudioPanel({ id, title, help, tools, children }) {
  return (
    <section
      id={id}
      className="rounded-[18px] border border-[#26303d] bg-gradient-to-b from-[#10151d] to-[#0d1219] shadow-[0_8px_24px_rgba(0,0,0,0.16)] scroll-mt-20"
    >
      <div className="flex justify-between items-center gap-2.5 px-[18px] py-4 border-b border-[#26303d]">
        <h4 className="m-0 text-sm font-bold text-white">{title}</h4>
        <div className="flex gap-1.5 flex-wrap items-center">
          {help && <span className="text-[11px] text-[#9eabbc]">{help}</span>}
          {tools}
        </div>
      </div>
      <div className="p-[18px]">{children}</div>
    </section>
  );
}

export function ToolButton({ children, onClick, variant }) {
  const base = "px-2.5 py-1.5 text-xs rounded-[10px] font-bold border transition-colors";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-br from-[#168fea] to-[#0c68b3] border-[#2a9ef0] text-white"
      : variant === "ghost"
      ? "bg-transparent border-[#26303d] text-[#9eabbc] hover:text-white hover:border-[#36506c]"
      : "bg-[#111720] border-[#26303d] text-white hover:border-[#36506c]";
  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}