import React from "react";
import { Sparkles, Save, FolderOpen } from "lucide-react";

const NAV = [
  { id: "dashboard", label: "Dashboard" },
  { id: "campaign", label: "Create Campaign" },
  { id: "tryon", label: "Reference Try-On" },
  { id: "theme", label: "Theme Engine" },
  { id: "video", label: "Video Studio" },
  { id: "outputs", label: "Prompt Outputs" },
  { id: "history", label: "History" },
];

export default function Sidebar({ onJump, onSave, onLoad, open, setOpen }) {
  return (
    <aside
      className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-[250px] shrink-0 flex flex-col gap-[18px] p-[22px_16px] bg-gradient-to-b from-[#090c11] to-[#0d1219] border-r border-[#26303d] transition-transform duration-200 ${open ? "translate-x-0 shadow-[20px_0_60px_rgba(0,0,0,0.45)]" : "-translate-x-[270px]"} lg:translate-x-0`}
    >
      <div className="flex items-center gap-2.5 px-2.5 py-2">
        <div className="w-[42px] h-[42px] rounded-[14px] bg-[radial-gradient(circle_at_30%_30%,#71c9ff,#168fea_45%,#0f3c66_100%)] shadow-[0_0_26px_rgba(22,143,234,0.4)]" />
        <div>
          <h1 className="text-[15px] leading-[1.05] m-0 tracking-[0.06em] font-bold text-white">
            GLAM BRAND MODEL<br />CAMPAIGN STUDIO
          </h1>
          <small className="block text-[#9eabbc] font-semibold mt-1 text-[11px]">Keep her. Change the world.</small>
        </div>
      </div>

      <nav className="flex flex-col gap-1.5">
        {NAV.map((n, i) => (
          <button
            key={n.id}
            onClick={() => { onJump(n.id); setOpen(false); }}
            className={`text-left px-3 py-[11px] rounded-[12px] font-bold border border-transparent transition-colors ${i === 0 ? "bg-[#101821] border-[#203449] text-white" : "text-[#9eabbc] hover:bg-[#101821] hover:border-[#203449] hover:text-white"}`}
          >
            {n.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto grid gap-2">
        <div className="text-xs text-[#9eabbc] px-3 py-2.5 border border-[#26303d] rounded-[12px] bg-[#0b1016] leading-relaxed">
          <b className="text-[#82c8ff]">Permanent Model Lock</b><br />
          Face + body identity stay fixed. Hair, clothes, accessories, scene, props and companions may change.
        </div>
        <button
          onClick={onSave}
          className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs rounded-[10px] font-bold border border-[#26303d] bg-[#111720] text-white hover:border-[#36506c]"
        >
          <Save className="w-3.5 h-3.5" /> Save Campaign
        </button>
        <button
          onClick={onLoad}
          className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs rounded-[10px] font-bold border border-[#26303d] bg-transparent text-white hover:border-[#36506c]"
        >
          <FolderOpen className="w-3.5 h-3.5" /> Load Last Saved
        </button>
      </div>
    </aside>
  );
}