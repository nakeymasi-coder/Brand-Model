import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Menu, Sparkles, Shuffle, Trash2, Wand2 } from "lucide-react";
import Sidebar from "@/components/studio/Sidebar";
import StudioPanel, { ToolButton } from "@/components/studio/StudioPanel";
import UploadCard from "@/components/studio/UploadCard";
import Outputs from "@/components/studio/Outputs";
import { DATA, QUICK, DEFAULTS, buildImagePrompt, buildVideoPrompt, buildVideoScript, buildDesignDirection, NEGATIVE } from "@/components/studio/studioData";

const VAL_KEYS = [
  ...Object.keys(DATA),
  "campaignName", "customScene", "customStyle", "customTheme", "videoGoal",
];

function SelectField({ label, value, onChange, options, span }) {
  return (
    <div className={`grid gap-[7px] min-w-0 ${span === "full" ? "col-span-1 sm:col-span-2 lg:col-span-3" : span === "two" ? "col-span-1 sm:col-span-2" : ""}`}>
      <label className="text-xs text-[#c7d2df] font-extrabold">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#2a3543] bg-[#0b1016] text-white rounded-[11px] px-2.5 py-2.5 outline-none focus:border-[#2f9ff2] focus:ring-2 focus:ring-[#168fea]/20"
      >
        <option value="">Choose...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, span }) {
  return (
    <div className={`grid gap-[7px] min-w-0 ${span === "full" ? "col-span-1 sm:col-span-2 lg:col-span-3" : ""}`}>
      <label className="text-xs text-[#c7d2df] font-extrabold">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[#2a3543] bg-[#0b1016] text-white rounded-[11px] px-2.5 py-2.5 outline-none focus:border-[#2f9ff2] focus:ring-2 focus:ring-[#168fea]/20"
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder, span }) {
  return (
    <div className={`grid gap-[7px] min-w-0 ${span === "full" ? "col-span-1 sm:col-span-2 lg:col-span-3" : span === "two" ? "col-span-1 sm:col-span-2" : ""}`}>
      <label className="text-xs text-[#c7d2df] font-extrabold">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[92px] resize-y border border-[#2a3543] bg-[#0b1016] text-white rounded-[11px] px-2.5 py-2.5 outline-none focus:border-[#2f9ff2] focus:ring-2 focus:ring-[#168fea]/20"
      />
    </div>
  );
}

const GROUPS = {
  campaign: ["createFor", "modelMode", "scene", "location", "environmentMode", "people", "backgroundComplexity", "continuity"],
  styling: ["hair", "hairColor", "wardrobe", "makeup", "nails", "accessories"],
  theme: ["themeSelect", "typography", "themeIntensity", "palette", "motifs", "themeApplies"],
  composition: ["framing", "camera", "textSafe", "aspectRatio", "lighting", "animationReady"],
  video: ["videoPlatform", "duration", "videoType", "movement", "cameraMotion", "dialogueMode"],
};

const FIELDS = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5";

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export default function GlamStudio() {
  const { toast } = useToast();
  const [vals, setVals] = useState({ ...DEFAULTS });
  const [uploads, setUploads] = useState({ brand: "", outfit: "", hair: "", accessory: "", product: "", scene: "" });
  const [heroVideo, setHeroVideo] = useState("");
  const [outputs, setOutputs] = useState({ imagePrompt: "", videoPrompt: "", videoScript: "", negativePrompt: "", designDirection: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try { setHistory(JSON.parse(localStorage.getItem("glam_history") || "[]")); } catch { setHistory([]); }
  }, []);

  const set = (id, value) => setVals((prev) => ({ ...prev, [id]: value }));

  function jump(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function randomizeIds(list) {
    setVals((prev) => {
      const next = { ...prev };
      list.forEach((id) => {
        const opts = DATA[id];
        if (opts && opts.length) next[id] = pick(opts);
      });
      return next;
    });
  }

  function clearIds(list) {
    setVals((prev) => {
      const next = { ...prev };
      list.forEach((id) => { if (DATA[id]) next[id] = ""; else next[id] = ""; });
      return next;
    });
  }

  function randomizeAll() {
    randomizeIds(Object.values(GROUPS).flat());
    toast({ title: "Surprise Me loaded" });
  }

  function quickStart(name, createFor, scene, location) {
    setVals((prev) => ({ ...prev, createFor, scene, location }));
    jump("campaign");
  }

  function generateAll() {
    setOutputs({
      imagePrompt: buildImagePrompt(vals),
      videoPrompt: buildVideoPrompt(vals),
      videoScript: buildVideoScript(vals),
      negativePrompt: NEGATIVE,
      designDirection: buildDesignDirection(vals),
    });
    saveHistory();
    toast({ title: "Generated" });
    jump("outputs");
  }

  function saveHistory() {
    const entry = {
      date: new Date().toLocaleString(),
      name: vals.campaignName || vals.createFor || "Campaign",
      scene: vals.scene,
      location: vals.location,
      prompt: buildImagePrompt(vals),
    };
    const arr = [entry, ...history].slice(0, 12);
    setHistory(arr);
    localStorage.setItem("glam_history", JSON.stringify(arr));
  }

  function loadHistory(i) {
    const item = history[i];
    if (!item) return;
    setOutputs((prev) => ({ ...prev, imagePrompt: item.prompt }));
    jump("outputs");
  }

  function clearHistory() {
    setHistory([]);
    localStorage.removeItem("glam_history");
    toast({ title: "History cleared" });
  }

  function clearAll() {
    if (!window.confirm("Clear all selections and generated outputs? Uploaded previews will stay visible.")) return;
    const cleared = {};
    VAL_KEYS.forEach((k) => { cleared[k] = ""; });
    setVals(cleared);
    setOutputs({ imagePrompt: "", videoPrompt: "", videoScript: "", negativePrompt: "", designDirection: "" });
    toast({ title: "Cleared" });
  }

  function saveCampaign() {
    localStorage.setItem("glam_saved_campaign", JSON.stringify(vals));
    toast({ title: "Campaign saved" });
  }

  function loadCampaign() {
    try {
      const data = JSON.parse(localStorage.getItem("glam_saved_campaign") || "null");
      if (!data) { toast({ title: "No saved campaign" }); return; }
      setVals((prev) => ({ ...prev, ...data }));
      toast({ title: "Campaign loaded" });
    } catch { toast({ title: "Could not load campaign" }); }
  }

  return (
    <div className="min-h-screen bg-[#07090d] text-[#f7fbff] font-body">
      <div className="lg:grid lg:grid-cols-[250px_1fr]">
        <Sidebar onJump={jump} onSave={saveCampaign} onLoad={loadCampaign} open={sidebarOpen} setOpen={setSidebarOpen} />

        <main className="min-w-0">
          {/* Topbar */}
          <div className="sticky top-0 z-20 flex justify-between items-center gap-3 px-6 py-[15px] bg-[#07090d]/90 backdrop-blur-md border-b border-[#26303d]">
            <div className="flex items-center gap-2.5">
              <button onClick={() => setSidebarOpen((o) => !o)} className="lg:hidden p-2 rounded-lg border border-[#26303d] text-white">
                <Menu className="w-4 h-4" />
              </button>
              <h2 className="text-base m-0 font-bold">Campaign Builder</h2>
              <span className="text-[11px] text-[#82c8ff] font-bold">IDENTITY LOCK: ON</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={clearAll} className="hidden sm:inline-flex px-3.5 py-2.5 rounded-xl font-bold border border-[#26303d] bg-transparent text-[#9eabbc] hover:text-white hover:border-[#36506c]">
                <Trash2 className="w-4 h-4 inline mr-1.5" />Clear All
              </button>
              <button onClick={randomizeAll} className="inline-flex items-center px-3.5 py-2.5 rounded-xl font-bold border border-[#26303d] bg-[#111720] text-white hover:border-[#36506c]">
                <Shuffle className="w-4 h-4 inline mr-1.5" />Surprise Me
              </button>
              <button onClick={generateAll} className="inline-flex items-center px-3.5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-br from-[#168fea] to-[#0c68b3] border border-[#2a9ef0]">
                <Wand2 className="w-4 h-4 inline mr-1.5" />Generate All
              </button>
            </div>
          </div>

          <div className="p-6 grid gap-[22px]">
            {/* Hero */}
            <section id="dashboard" className="relative overflow-hidden rounded-[24px] border border-[#203448] p-7 min-h-[230px] grid lg:grid-cols-[1.2fr_0.8fr] gap-6 scroll-mt-20" style={{ background: "radial-gradient(circle at 85% 10%, rgba(22,143,234,0.22), transparent 25%), linear-gradient(135deg,#0b1118 0%,#101925 60%,#0b1016 100%)" }}>
              <div>
                <h3 className="text-3xl lg:text-4xl leading-[1.03] mb-2.5 font-bold max-w-[760px]">Put your brand face everywhere.</h3>
                <p className="text-[#c1cddd] max-w-[720px] leading-relaxed mb-4">
                  Create realistic lifestyle scenes, luxury campaign visuals, themed flyers, invitations, reference try-ons and animation-ready video scripts while keeping the same permanent brand model.
                </p>
                <div className="flex gap-2.5 flex-wrap">
                  <button onClick={() => jump("campaign")} className="inline-flex items-center px-4 py-2.5 rounded-xl font-bold text-white bg-gradient-to-br from-[#168fea] to-[#0c68b3] border border-[#2a9ef0]">
                    <Sparkles className="w-4 h-4 inline mr-1.5" />Create Campaign
                  </button>
                  <button onClick={() => { randomizeAll(); jump("campaign"); }} className="px-4 py-2.5 rounded-xl font-bold border border-[#26303d] bg-[#111720] text-white hover:border-[#36506c]">
                    Surprise Me
                  </button>
                </div>
              </div>
              <div className="min-h-[170px] rounded-[18px] border border-[#2b3f53] bg-[#0a0f15] grid place-items-center overflow-hidden">
                {heroVideo ? (
                  <video src={heroVideo} className="w-full h-full max-h-[200px] object-cover" muted loop controls autoPlay />
                ) : (
                  <div className="text-center text-[#aec0d4] p-5">
                    <b>Hero Video Preview</b><br />
                    <span className="text-xs text-[#8fa2b8]">Upload a short MP4/WebM for the dashboard preview.</span><br />
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) setHeroVideo(URL.createObjectURL(f));
                      }}
                      className="mt-2.5 max-w-[220px] text-xs text-[#9eabbc]"
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Marquee */}
            <div className="overflow-hidden border-y border-[#213246] bg-[#0c1219] py-2.5 text-[#d9e9f7] text-xs font-bold tracking-[0.12em]">
              <div className="whitespace-nowrap inline-block animate-glam-scroll">
                UGC • FLYERS • INVITATIONS • SALES PAGES • TRAVEL • LIFESTYLE • WORKSHOPS • COMMERCIALS • PRODUCT PROMOS • VIDEO • SOCIAL CONTENT • SEASONAL CAMPAIGNS • LANDMARKS • EVENTS • &nbsp;&nbsp;
                UGC • FLYERS • INVITATIONS • SALES PAGES • TRAVEL • LIFESTYLE • WORKSHOPS • COMMERCIALS • PRODUCT PROMOS • VIDEO • SOCIAL CONTENT • SEASONAL CAMPAIGNS • LANDMARKS • EVENTS •
              </div>
            </div>

            {/* Quick Starts */}
            <StudioPanel title="Quick Starts" help="Tap one and the builder fills in the basics.">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {QUICK.map(([name, cf, sc, loc]) => (
                  <button
                    key={name}
                    onClick={() => quickStart(name, cf, sc, loc)}
                    className="p-3.5 border border-[#26303d] rounded-[14px] bg-[#0e141c] text-white text-left font-bold min-h-[78px] hover:border-[#2f8ccb] hover:bg-[#101b26] transition-colors"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </StudioPanel>

            {/* Campaign Setup */}
            <StudioPanel
              id="campaign"
              title="Campaign Setup"
              tools={<>
                <ToolButton onClick={() => randomizeIds(GROUPS.campaign)}>Randomize</ToolButton>
                <ToolButton variant="ghost" onClick={() => clearIds(GROUPS.campaign)}>Clear</ToolButton>
              </>}
            >
              <div className={FIELDS}>
                <SelectField label="Create For" value={vals.createFor} onChange={(v) => set("createFor", v)} options={DATA.createFor} />
                <SelectField label="Brand Model Mode" value={vals.modelMode} onChange={(v) => set("modelMode", v)} options={DATA.modelMode} />
                <InputField label="Campaign Name" value={vals.campaignName} onChange={(v) => set("campaignName", v)} placeholder="Example: Dubai Workshop Launch" />
                <SelectField label="Scene / Activity" value={vals.scene} onChange={(v) => set("scene", v)} options={DATA.scene} />
                <SelectField label="Location / World" value={vals.location} onChange={(v) => set("location", v)} options={DATA.location} />
                <SelectField label="Environment Mode" value={vals.environmentMode} onChange={(v) => set("environmentMode", v)} options={DATA.environmentMode} />
                <SelectField label="People in Scene" value={vals.people} onChange={(v) => set("people", v)} options={DATA.people} />
                <SelectField label="Background Complexity" value={vals.backgroundComplexity} onChange={(v) => set("backgroundComplexity", v)} options={DATA.backgroundComplexity} />
                <SelectField label="Campaign Continuity" value={vals.continuity} onChange={(v) => set("continuity", v)} options={DATA.continuity} />
                <TextAreaField span="full" label="Add Your Own Scene / Direction" value={vals.customScene} onChange={(v) => set("customScene", v)} placeholder="Example: She is teaching a live workshop while attendees use laptops, then she walks to a branded product table..." />
              </div>
            </StudioPanel>

            {/* Style Her */}
            <StudioPanel
              id="styling"
              title="Style Her"
              tools={<>
                <ToolButton onClick={() => randomizeIds(GROUPS.styling)}>Randomize</ToolButton>
                <ToolButton variant="ghost" onClick={() => clearIds(GROUPS.styling)}>Clear</ToolButton>
              </>}
            >
              <div className={FIELDS}>
                <SelectField label="Hairstyle" value={vals.hair} onChange={(v) => set("hair", v)} options={DATA.hair} />
                <SelectField label="Hair Color" value={vals.hairColor} onChange={(v) => set("hairColor", v)} options={DATA.hairColor} />
                <SelectField label="Wardrobe" value={vals.wardrobe} onChange={(v) => set("wardrobe", v)} options={DATA.wardrobe} />
                <SelectField label="Makeup" value={vals.makeup} onChange={(v) => set("makeup", v)} options={DATA.makeup} />
                <SelectField label="Nails" value={vals.nails} onChange={(v) => set("nails", v)} options={DATA.nails} />
                <SelectField label="Accessories" value={vals.accessories} onChange={(v) => set("accessories", v)} options={DATA.accessories} />
                <TextAreaField span="full" label="Custom Styling Notes" value={vals.customStyle} onChange={(v) => set("customStyle", v)} placeholder="Example: medium stiletto ombré nails in Caribbean sapphire blue, metallic silver and white; diamond studs; structured tote..." />
              </div>
            </StudioPanel>

            {/* Reference Try-On */}
            <StudioPanel
              id="tryon"
              title="Reference Try-On Studio"
              help="Uploaded people are ignored. Only the selected item/design is transferred to the locked brand model."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <UploadCard title="Main Brand Model" accept="image/*" type="image" value={uploads.brand} onChange={(v) => setUploads((p) => ({ ...p, brand: v }))} />
                <UploadCard title="Outfit Reference" accept="image/*" type="image" value={uploads.outfit} onChange={(v) => setUploads((p) => ({ ...p, outfit: v }))} />
                <UploadCard title="Hairstyle Reference" accept="image/*" type="image" value={uploads.hair} onChange={(v) => setUploads((p) => ({ ...p, hair: v }))} />
                <UploadCard title="Accessory / Jewelry" accept="image/*" type="image" value={uploads.accessory} onChange={(v) => setUploads((p) => ({ ...p, accessory: v }))} />
                <UploadCard title="Product Reference" accept="image/*" type="image" value={uploads.product} onChange={(v) => setUploads((p) => ({ ...p, product: v }))} />
                <UploadCard title="Scene Reference" accept="image/*" type="image" value={uploads.scene} onChange={(v) => setUploads((p) => ({ ...p, scene: v }))} />
              </div>
              <div className={`${FIELDS} mt-3.5`}>
                <SelectField span="two" label="Try-On Instruction" value={vals.tryOnType} onChange={(v) => set("tryOnType", v)} options={DATA.tryOnType} />
                <div className="grid gap-[7px] min-w-0">
                  <label className="text-xs text-[#c7d2df] font-extrabold">Reference Priority</label>
                  <select className="w-full border border-[#2a3543] bg-[#0b1016] text-white rounded-[11px] px-2.5 py-2.5 outline-none" disabled>
                    <option>Brand model identity always wins</option>
                  </select>
                </div>
              </div>
            </StudioPanel>

            {/* Theme Engine */}
            <StudioPanel
              id="theme"
              title="Theme Engine"
              tools={<>
                <ToolButton onClick={() => randomizeIds(GROUPS.theme)}>Randomize</ToolButton>
                <ToolButton variant="ghost" onClick={() => clearIds(GROUPS.theme)}>Clear</ToolButton>
              </>}
            >
              <div className={FIELDS}>
                <SelectField label="Theme" value={vals.themeSelect} onChange={(v) => set("themeSelect", v)} options={DATA.themeSelect} />
                <SelectField label="Typography Direction" value={vals.typography} onChange={(v) => set("typography", v)} options={DATA.typography} />
                <SelectField label="Theme Intensity" value={vals.themeIntensity} onChange={(v) => set("themeIntensity", v)} options={DATA.themeIntensity} />
                <SelectField label="Palette Direction" value={vals.palette} onChange={(v) => set("palette", v)} options={DATA.palette} />
                <SelectField label="Decor / Motifs" value={vals.motifs} onChange={(v) => set("motifs", v)} options={DATA.motifs} />
                <SelectField label="Theme Applies To" value={vals.themeApplies} onChange={(v) => set("themeApplies", v)} options={DATA.themeApplies} />
                <TextAreaField span="full" label="Custom Theme Notes" value={vals.customTheme} onChange={(v) => set("customTheme", v)} placeholder="Example: Halloween, but luxury editorial — polished black glass pumpkins, sapphire-blue glow, silver foil typography, no childish clipart..." />
              </div>
            </StudioPanel>

            {/* Composition */}
            <StudioPanel
              id="composition"
              title="Composition & Commercial Layout"
              tools={<>
                <ToolButton onClick={() => randomizeIds(GROUPS.composition)}>Randomize</ToolButton>
                <ToolButton variant="ghost" onClick={() => clearIds(GROUPS.composition)}>Clear</ToolButton>
              </>}
            >
              <div className={FIELDS}>
                <SelectField label="Framing" value={vals.framing} onChange={(v) => set("framing", v)} options={DATA.framing} />
                <SelectField label="Camera" value={vals.camera} onChange={(v) => set("camera", v)} options={DATA.camera} />
                <SelectField label="Text-Safe Area" value={vals.textSafe} onChange={(v) => set("textSafe", v)} options={DATA.textSafe} />
                <SelectField label="Aspect Ratio" value={vals.aspectRatio} onChange={(v) => set("aspectRatio", v)} options={DATA.aspectRatio} />
                <SelectField label="Lighting" value={vals.lighting} onChange={(v) => set("lighting", v)} options={DATA.lighting} />
                <SelectField label="Animation Readiness" value={vals.animationReady} onChange={(v) => set("animationReady", v)} options={DATA.animationReady} />
              </div>
            </StudioPanel>

            {/* Video Studio */}
            <StudioPanel
              id="video"
              title="Video Studio"
              tools={<>
                <ToolButton onClick={() => randomizeIds(GROUPS.video)}>Randomize</ToolButton>
                <ToolButton variant="ghost" onClick={() => clearIds(GROUPS.video)}>Clear</ToolButton>
              </>}
            >
              <div className={FIELDS}>
                <SelectField label="Video Platform" value={vals.videoPlatform} onChange={(v) => set("videoPlatform", v)} options={DATA.videoPlatform} />
                <SelectField label="Duration" value={vals.duration} onChange={(v) => set("duration", v)} options={DATA.duration} />
                <SelectField label="Video Type" value={vals.videoType} onChange={(v) => set("videoType", v)} options={DATA.videoType} />
                <SelectField label="Character Movement" value={vals.movement} onChange={(v) => set("movement", v)} options={DATA.movement} />
                <SelectField label="Camera Motion" value={vals.cameraMotion} onChange={(v) => set("cameraMotion", v)} options={DATA.cameraMotion} />
                <SelectField label="Dialogue Mode" value={vals.dialogueMode} onChange={(v) => set("dialogueMode", v)} options={DATA.dialogueMode} />
                <TextAreaField span="full" label="Video Goal / Hook" value={vals.videoGoal} onChange={(v) => set("videoGoal", v)} placeholder="Example: 15-second workshop promo. She walks through the market, looks to camera, says the hook, then reveals the workshop offer." />
              </div>
            </StudioPanel>

            {/* Outputs + Gallery */}
            <Outputs
              vals={vals}
              outputs={outputs}
              setOutputs={setOutputs}
            />

            {/* History */}
            <StudioPanel
              id="history"
              title="Prompt History"
              tools={<ToolButton variant="ghost" onClick={clearHistory}>Clear History</ToolButton>}
            >
              {history.length === 0 ? (
                <div className="text-[11px] text-[#9eabbc]">No generated campaigns yet.</div>
              ) : (
                <div className="grid gap-2.5">
                  {history.map((x, i) => (
                    <div key={i} className="border border-[#26303d] rounded-[12px] p-3 bg-[#0b1016]">
                      <b className="text-xs text-white">{x.name}</b>
                      <p className="my-1 text-[#9eabbc] text-[11px]">{x.date} • {x.scene || "Scene"} • {x.location || "Location"}</p>
                      <ToolButton onClick={() => loadHistory(i)}>Load Prompt</ToolButton>
                    </div>
                  ))}
                </div>
              )}
            </StudioPanel>
          </div>
        </main>
      </div>
    </div>
  );
}