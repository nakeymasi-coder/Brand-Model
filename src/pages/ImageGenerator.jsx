import React, { useState } from "react";
import { Wand2, Loader2, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image as ImageComponent } from "@/components/ui/image";
import { generateImage } from "@/functions/generateImage";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const suggestions = [
    "A serene mountain lake at golden hour, cinematic",
    "Minimalist product shot of a ceramic vase on a linen backdrop",
    "Abstract liquid gold swirls on a deep navy background",
    "Cozy reading nook with warm lamplight, soft focus",
  ];

  async function handleGenerate(e) {
    e?.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed) {
      setError("Please describe the image you want to create.");
      return;
    }
    setLoading(true);
    setError("");
    setImageUrl("");
    try {
      const res = await generateImage({ prompt: trimmed });
      const data = res?.data ?? res;
      if (data?.url) {
        setImageUrl(data.url);
      } else {
        setError(data?.error || "Could not generate the image. Try again.");
      }
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || "Something went wrong.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function applySuggestion(s) {
    setPrompt(s);
    setError("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-5 py-12 sm:py-20">
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-medium tracking-wide mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            AI IMAGE STUDIO
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
            Create images with AI
          </h1>
          <p className="mt-3 text-slate-500 text-base sm:text-lg max-w-xl mx-auto">
            Describe anything you can imagine and watch it come to life in seconds.
          </p>
        </header>

        <form onSubmit={handleGenerate} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A dreamy forest with fireflies at dusk…"
              className="h-12 text-base border-slate-200 focus-visible:ring-slate-900"
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-6 bg-slate-900 hover:bg-slate-800 text-white shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => applySuggestion(s)}
                disabled={loading}
                className="text-xs px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-colors disabled:opacity-50"
              >
                {s.length > 40 ? s.slice(0, 40) + "…" : s}
              </button>
            ))}
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="mt-8">
          {loading && (
            <div className="aspect-square w-full rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
            </div>
          )}

          {!loading && imageUrl && (
            <div className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <ImageComponent
                src={imageUrl}
                alt={prompt}
                className="w-full aspect-square"
                fittingType="fit"
              />
              <a
                href={imageUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/90 backdrop-blur text-slate-900 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          )}

          {!loading && !imageUrl && !error && (
            <div className="aspect-square w-full rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
              <Sparkles className="w-10 h-10 mb-3" />
              <p className="text-sm">Your generated image will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}