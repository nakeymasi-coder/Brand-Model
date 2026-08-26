import React, { useState } from "react";
import { Sparkles, Wand2, Loader2, Download, RefreshCw, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Image as ImageComponent } from "@/components/ui/image";
import UploadZone from "@/components/studio/UploadZone";
import { analyzeCampaign } from "@/functions/analyzeCampaign";
import { generateImage } from "@/functions/generateImage";

export default function GlamStudio() {
  const [videoUrl, setVideoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [brandName, setBrandName] = useState("");
  const [productType, setProductType] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!videoUrl && !imageUrl) {
      setError("Upload a short video or a reference image first.");
      return;
    }
    setAnalyzing(true);
    setError("");
    try {
      const res = await analyzeCampaign({
        video_url: videoUrl,
        image_url: imageUrl,
        brand_name: brandName,
        product_type: productType,
      });
      const data = res?.data ?? res;
      if (data?.prompt) {
        setPrompt(data.prompt);
      } else {
        setError(data?.error || "Could not generate a campaign prompt.");
      }
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || "Something went wrong.");
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleGenerate() {
    const trimmed = prompt.trim();
    if (!trimmed) {
      setError("Write or generate a prompt first.");
      return;
    }
    setGenerating(true);
    setError("");
    try {
      const res = await generateImage({ prompt: trimmed });
      const data = res?.data ?? res;
      if (data?.url) {
        setGallery((prev) => [{ url: data.url, prompt: trimmed, id: Date.now() }, ...prev]);
      } else {
        setError(data?.error || "Could not generate the image.");
      }
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || "Something went wrong.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-5 py-10 sm:py-16">
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-medium tracking-wide mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            GLAM BRAND MODEL CAMPAIGN STUDIO
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Create a campaign from your assets
          </h1>
          <p className="mt-2 text-slate-500 max-w-2xl">
            Upload a short video and a reference image, let the studio write a campaign prompt, then generate campaign photos.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: uploads + brief */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <UploadZone
                label="Short video"
                hint="MP4 / MOV, under 25MB"
                accept="video/*"
                type="video"
                value={videoUrl}
                onChange={setVideoUrl}
              />
              <UploadZone
                label="Reference image"
                hint="PNG / JPG"
                accept="image/*"
                type="image"
                value={imageUrl}
                onChange={setImageUrl}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Brand name</label>
                <Input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. LUMIÈRE"
                  className="border-slate-200 focus-visible:ring-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Product category</label>
                <Input
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  placeholder="e.g. Luxury lipstick"
                  className="border-slate-200 focus-visible:ring-slate-900"
                />
              </div>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing assets…
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate campaign prompt
                </>
              )}
            </Button>
          </div>

          {/* Right: prompt + generate */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Campaign prompt
              </label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Your campaign prompt will appear here — edit it or write your own."
                className="min-h-[160px] border-slate-200 focus-visible:ring-slate-900"
              />
            </div>
            <Button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full h-12 bg-white border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating campaign image…
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate campaign image
                </>
              )}
            </Button>
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Gallery */}
        <div className="mt-12">
          <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Campaign images
          </h2>
          {gallery.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center text-slate-400">
              Generated campaign images will appear here.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <ImageComponent src={item.url} alt={item.prompt} className="w-full aspect-square" fittingType="fit" />
                  <a
                    href={item.url}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-2 right-2 p-2 rounded-lg bg-white/90 backdrop-blur text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}