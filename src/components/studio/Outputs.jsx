import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
import {
  buildImagePrompt, buildVideoPrompt, buildVideoScript, buildDesignDirection, NEGATIVE,
} from "@/components/studio/studioData";
import { ToolButton } from "@/components/studio/StudioPanel";

const TABS = [
  { id: "imagePrompt", label: "Image Prompt" },
  { id: "videoPrompt", label: "Video Prompt" },
  { id: "videoScript", label: "Video Script" },
  { id: "negativePrompt", label: "Negative Prompt" },
  { id: "designDirection", label: "Flyer / Invitation Direction" },
];

export default function Outputs({ vals, outputs, setOutputs }) {
  const { toast } = useToast();
  const [tab, setTab] = useState("imagePrompt");

  function generate() {
    setOutputs({
      imagePrompt: buildImagePrompt(vals),
      videoPrompt: buildVideoPrompt(vals),
      videoScript: buildVideoScript(vals),
      negativePrompt: NEGATIVE,
      designDirection: buildDesignDirection(vals),
    });
    toast({ title: "Outputs generated" });
  }

  function copy(id) {
    navigator.clipboard.writeText(outputs[id] || "");
    toast({ title: "Copied" });
  }

  function copyAll() {
    const txt = [
      "IMAGE PROMPT", outputs.imagePrompt,
      "VIDEO PROMPT", outputs.videoPrompt,
      "VIDEO SCRIPT", outputs.videoScript,
      "NEGATIVE PROMPT", outputs.negativePrompt,
      "DESIGN DIRECTION", outputs.designDirection,
    ].join("\n\n");
    navigator.clipboard.writeText(txt);
    toast({ title: "All outputs copied" });
  }

  return (
    <section id="outputs" className="rounded-[18px] border border-[#26303d] bg-gradient-to-b from-[#10151d] to-[#0d1219] shadow-[0_8px_24px_rgba(0,0,0,0.16)] scroll-mt-20">
      <div className="flex justify-between items-center gap-2.5 px-[18px] py-4 border-b border-[#26303d]">
        <h4 className="m-0 text-sm font-bold text-white">Generated Outputs</h4>
        <div className="flex gap-1.5 flex-wrap items-center">
          <ToolButton variant="primary" onClick={generate}>Generate</ToolButton>
          <ToolButton onClick={copyAll}>Copy All</ToolButton>
        </div>
      </div>
      <div className="p-[18px]">
        <div className="flex gap-2 flex-wrap mb-3.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-2 rounded-full text-xs font-bold border transition-colors ${tab === t.id ? "text-white border-[#168fea] bg-[#10283b]" : "text-[#aebccc] border-[#2b3542] bg-[#0b1016] hover:text-white"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {TABS.map((t) => (
          <div key={t.id} className={tab === t.id ? "block" : "hidden"}>
            <textarea
              value={outputs[t.id] || ""}
              onChange={(e) => setOutputs({ ...outputs, [t.id]: e.target.value })}
              className="w-full min-h-[280px] leading-relaxed border border-[#2a3543] bg-[#0b1016] text-white rounded-[11px] px-2.5 py-2.5 outline-none focus:border-[#2f9ff2] focus:ring-2 focus:ring-[#168fea]/20 resize-y"
            />
            <div className="flex justify-end gap-2 mt-2.5">
              <ToolButton variant="primary" onClick={() => copy(t.id)}>
                <span className="inline-flex items-center gap-1"><Copy className="w-3.5 h-3.5" /> Copy</span>
              </ToolButton>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}