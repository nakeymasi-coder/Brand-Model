import React, { useRef, useState } from "react";
import { Upload, X, Loader2, Film, ImageIcon } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image as ImageComponent } from "@/components/ui/image";

export default function UploadZone({ label, hint, accept, type, value, onChange }) {
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
      setError("Upload failed. Please try again.");
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
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      {!value ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="w-full h-40 rounded-xl border-2 border-dashed border-slate-200 hover:border-slate-900 transition-colors flex flex-col items-center justify-center text-slate-400 hover:text-slate-900 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin mb-2" />
          ) : isVideo ? (
            <Film className="w-6 h-6 mb-2" />
          ) : (
            <ImageIcon className="w-6 h-6 mb-2" />
          )}
          <span className="text-sm font-medium">
            {loading ? "Uploading…" : `Click to upload ${isVideo ? "a short video" : "an image"}`}
          </span>
          <span className="text-xs mt-1 text-slate-400">{hint}</span>
        </button>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 h-40">
          {isVideo ? (
            <video src={value} className="w-full h-full object-cover" controls />
          ) : (
            <ImageComponent src={value} alt={label} className="w-full h-full" fittingType="fit" />
          )}
          <button
            type="button"
            onClick={clear}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 backdrop-blur text-slate-700 hover:bg-white hover:text-slate-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFile}
        className="hidden"
      />
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}