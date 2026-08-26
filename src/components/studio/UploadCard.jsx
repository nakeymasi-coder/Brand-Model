import React, { useRef, useState } from "react";
import { X, Loader2, Film, ImagePlus } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image as ImageComponent } from "@/components/ui/image";

export default function UploadCard({ title, accept, type, value, onChange }) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isVideo = type === "video";

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      onChange(file_url);
    } catch (err) {
      setError("Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  function clear() {
    onChange("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="border border-dashed border-[#34445a] rounded-[14px] p-3 bg-[#0b1016]">
      <div className="text-xs font-bold text-white mb-2">{title}</div>
      {!value ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="w-full h-24 rounded-[10px] border border-dashed border-[#34445a] hover:border-[#168fea] flex flex-col items-center justify-center text-[#9eabbc] hover:text-white transition-colors disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isVideo ? (
            <Film className="w-5 h-5" />
          ) : (
            <ImagePlus className="w-5 h-5" />
          )}
          <span className="text-[11px] mt-1">{loading ? "Uploading…" : "Upload"}</span>
        </button>
      ) : (
        <div className="relative rounded-[10px] overflow-hidden h-24 bg-[#0a0f15]">
          {isVideo ? (
            <video src={value} className="w-full h-full object-cover" controls />
          ) : (
            <ImageComponent src={value} alt={title} className="w-full h-full" fittingType="fit" />
          )}
          <button
            type="button"
            onClick={clear}
            className="absolute top-1.5 right-1.5 p-1 rounded-md bg-white/90 text-slate-700 hover:bg-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      <input ref={inputRef} type="file" accept={accept} onChange={handleFile} className="hidden" />
      {error && <p className="mt-1.5 text-[11px] text-red-400">{error}</p>}
    </div>
  );
}