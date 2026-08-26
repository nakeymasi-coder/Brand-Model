// All dropdown options, quick starts, prompt constants and builders for the GLAM Studio.

export const DATA = {
  createFor: [
    "UGC Content","Commercial","Social Advertisement","Product Advertisement","Sales Page Hero","Payhip Listing Visual","Website Hero","Workshop Flyer","Event Flyer","Invitation","Save the Date","Launch Graphic","Product Reveal","Brand Awareness Campaign","Story / Reel Cover","Thumbnail","Email Campaign Visual","Pinterest Graphic","Social Campaign Hero","Promotional Poster","Editorial Campaign","Seasonal Promotion","Holiday Campaign","Lifestyle Content","Travel Campaign","Brand Photoshoot","Product Placement","Testimonial Visual","Event Promotion","Grand Opening","Coming Soon","Sale Campaign","Giveaway","Webinar Promo","Course Promo"
  ],
  modelMode: ["Realistic Brand Model","Semi-Realistic Alter Ego","Hyper-Gloss Commercial Character","Luxury Caricature","Editorial Stylized Realism"],
  scene: [
    "Working at a laptop","Recording content","Filming UGC","Leading a workshop","Presenting a product","Speaking on stage","Teaching a class","Packaging orders","Signing books","Creating products","Planning a campaign","Luxury office workday","Networking event","Business conference","Brand photoshoot","Product launch","Chef plating food","Baker decorating cake","Beauty professional at work","Stylist session","Boutique owner working","Photographer on set","Author at book signing","Event planner setup","Travel creator filming","Interior designer walkthrough","Consulting session","Grocery shopping","Farmers market","Cooking at home","Luxury brunch","Coffee shop work session","Bookstore browsing","Shopping day","Spa day","Nail appointment","Beauty routine","Dinner out","Luxury picnic","Gardening","Home decorating","Journaling","Relaxing at home","Unpacking purchases","Airport departure","Airport arrival","Luxury hotel stay","Resort day","Sightseeing","Luxury shopping district","Historic neighborhood walk","Beach promenade","Marina stroll","Rooftop restaurant","Street market","Train station","Travel photography","Girls' trip","Brunch with friends","Shopping with friends","Dinner celebration","Birthday outing","Couple date","Romantic getaway","Partner supporting business","Event with friends","Workshop attendees","Community celebration"
  ],
  location: [
    "Modern kitchen","Luxury kitchen","Upscale office","Home office","Boutique","Open-air market","Farmers market","Café","Fine-dining restaurant","Bookstore","Beauty studio","Luxury hotel","Resort","Airport terminal","Premium movie theater","Conference center","Classroom","Workshop studio","Rooftop lounge","Marina","Luxury mall","Downtown street","Historic district","Beach","Museum district","Botanical garden","Upscale home","Dubai","Istanbul","Paris","London","New York City","Chicago","Miami","Atlanta","Los Angeles","San Francisco","Las Vegas","New Orleans","Washington DC","Rome","Venice","Barcelona","Tokyo","Seoul","Santorini","Monaco","Lincoln Memorial","Washington Monument","Brooklyn Bridge","Golden Gate Bridge","San Francisco waterfront","Burj Khalifa district","Eiffel Tower district","Arc de Triomphe","Times Square","Chicago Riverwalk","Hollywood district","Miami waterfront","Historic Istanbul","Luxury Dubai souk","European cathedral square","Mediterranean harbor","Fictional luxury destination"
  ],
  environmentMode: ["Exact realistic location","Landmark-inspired setting","Fictional luxury destination","Cinematic interpretation"],
  people: ["Solo","Significant other","Female friend","Best friend","Two friends","Girls' trip group","Small group","Workshop participants","Customers","Audience","Family-style lifestyle scene"],
  backgroundComplexity: ["Minimal clean","Polished realistic","Layered commercial scene","Cinematic depth","Busy but intentional","Hero-background focus"],
  continuity: ["Single image only","Match current campaign styling","Multi-scene campaign continuity","Full image-to-video continuity"],
  hair: ["Keep original hair","Deep wave","Body wave","Loose wave","Silk press","Blunt bob","Layered bob","Pixie","Curly pixie","Curly undercut","Sculpted curls","Side part","Middle part","High ponytail","Braided ponytail","Knotless braids","Goddess braids","Locs","Soft curls","Hollywood waves","Wet-look waves","Sleek bun","Braided bun"],
  hairColor: ["Keep original color","Natural black","Soft black","Espresso brown","Chocolate brown","Blue-black","Warm auburn","Burgundy","Honey highlights","Caramel highlights"],
  wardrobe: ["Keep original outfit","Urban business wear","Luxury business","Power suit","Tailored separates","Blazer dress","Luxury casual","Elevated streetwear","Resort wear","Chef uniform","Professional uniform","Cocktail look","Evening glam","Formal gown","Travel glam","Brunch look","Street style","Holiday outfit","Themed outfit","Runway-inspired","Luxury lounge","Monochrome statement look"],
  makeup: ["Keep original makeup","Natural glam","Soft glam","Editorial glam","Bronzed glam","Glass-skin glam","High-gloss beauty","Dramatic lashes","Wispy cat-eye lashes","Glossy nude lip","Red lip","Berry lip","Metallic accent","Seasonal makeup"],
  nails: ["Keep original nails","Medium stiletto ombré","Almond French","Coffin chrome","Square glossy","Oval pearl","Jelly nails","Metallic manicure","Seasonal nail art","Theme-matched nail art"],
  accessories: ["Keep original accessories","Minimal gold jewelry","Statement earrings","Diamond studs","Luxury watch","Layered bracelets","Structured handbag","Designer-inspired tote","Oversized sunglasses","Scarf styling","Statement necklace","Brooch detail","Mixed luxury accessories"],
  tryOnType: ["No try-on references","Try on outfit only","Try on hairstyle only","Try on jewelry / accessory only","Try on shoes / handbag only","Use product reference only","Use scene reference only","Use all uploaded references with identity lock"],
  themeSelect: ["None","Halloween","Christmas","Thanksgiving","New Year's Eve","Valentine's Day","Easter","Mother's Day","Juneteenth","Fourth of July","Fall","Winter","Spring","Summer","Back to School","Birthday","Anniversary","Girls' Night","Girls' Trip","Bridal Shower","Baby Shower","Wedding","Engagement","Graduation","Workshop","Conference","Grand Opening","Product Launch","VIP Event","Dinner Party","Brunch","Cocktail Party","Masquerade","Black-Tie Event","Old Hollywood","Y2K Glam","Retro 70s","Retro 80s","Retro 90s","Art Deco","Editorial Fashion","Luxury Noir","Tropical Glam","Winter Wonderland","Candy Glam","Futuristic Luxury","Parisian Chic","Mediterranean Luxury","New York Fashion","Dubai Luxury","Hollywood Premiere","Garden Party","Casino Night","Movie Night","Glam Sleepover","Luxury Picnic"],
  typography: ["Luxury Serif","Editorial Serif","Fashion Magazine","Modern Sans","Glam Script Accent","Retro","Gothic Halloween","Christmas Luxury","Art Deco","Y2K","Hollywood","Romantic","Bold Event Typography"],
  themeIntensity: ["Subtle","Balanced","Statement","Fully immersive"],
  palette: ["Use brand palette","Scene-driven luxury palette","Theme-driven palette","Monochrome","Metallic accents","Bright editorial","Moody luxe","Custom palette notes"],
  motifs: ["Minimal","Elegant seasonal details","Floral accents","Metallic décor","Candles / lanterns","Gift styling","Balloons / celebration","Architectural details","Editorial props","Luxury food styling","Travel details","Theme-matched motifs"],
  themeApplies: ["Everything: image + typography + props + video","Image scene only","Flyer / invitation design only","Video styling only"],
  framing: ["Extreme close-up","Beauty portrait","Bust","Waist-up","Three-quarter","Full body","Hero full body","Wide environmental","Establishing shot"],
  camera: ["Eye level","Low angle","Slight high angle","Over shoulder","Walking shot","Candid","Editorial pose","Profile","Three-quarter angle","Front view","Back view","Cinematic tracking composition","Product-focused composition"],
  textSafe: ["None","Left","Right","Top","Bottom","Center","Split layout"],
  aspectRatio: ["1:1 Square","4:5 Portrait","9:16 Vertical","16:9 Landscape","3:4 Portrait","2:3 Poster","1916×821 Payhip"],
  lighting: ["Bright beauty lighting","Golden hour","Soft daylight","Luxury studio","Cinematic ambient","Hard flash","Window light","Warm editorial","Night luxury lighting","High-contrast commercial"],
  animationReady: ["Standard still image","Animation-ready composition","Animation-ready with clear foreground/midground/background","Animation-ready with clean movement paths"],
  videoPlatform: ["Grok","Google Veo","Generic Video Model"],
  duration: ["5 seconds","8 seconds","10 seconds","15 seconds","30 seconds","60 seconds"],
  videoType: ["UGC","Commercial","Cinematic Advertisement","Product Promo","Sales Promo","Travel Reel","Lifestyle Reel","Talking-to-Camera","Silent B-Roll","Workshop Promo","Invitation Animation","Flyer Animation","Product Reveal","Social Ad"],
  movement: ["Natural subtle movement","Walking","Turning toward camera","Talking","Laughing","Cooking","Plating food","Presenting","Holding product","Opening product","Interacting with environment","Shopping","Greeting","Sitting","Standing hero pose","Subtle dancing","Hair movement","Fabric movement"],
  cameraMotion: ["Locked camera","Slow push in","Slow pull out","Dolly","Tracking","Orbit","Pan","Tilt","Handheld UGC","Cinematic steadicam","Crane","Reveal shot"],
  dialogueMode: ["No dialogue","Talking to camera","Voiceover only","Dialogue + voiceover","On-screen text only"]
};

export const QUICK = [
  ["UGC Campaign","UGC Content","Filming UGC","Upscale home"],
  ["Sales Page","Sales Page Hero","Presenting a product","Luxury office"],
  ["Workshop Flyer","Workshop Flyer","Leading a workshop","Workshop studio"],
  ["Product Promo","Product Advertisement","Product launch","Luxury shopping district"],
  ["Chef Scene","Lifestyle Content","Chef plating food","Luxury kitchen"],
  ["Travel Scene","Travel Campaign","Sightseeing","Dubai"],
  ["Girls' Trip","Social Campaign Hero","Girls' trip","Luxury hotel"],
  ["Couple Campaign","Commercial","Couple date","Rooftop lounge"],
  ["Invitation","Invitation","Dinner celebration","Fine-dining restaurant"],
  ["Market Scene","Lifestyle Content","Farmers market","Open-air market"],
  ["Landmark","Brand Awareness Campaign","Walking confidently","Lincoln Memorial"],
  ["Holiday","Holiday Campaign","Product reveal","Fictional luxury destination"]
];

export const REALISTIC_CORE = `Ultra-realistic premium commercial photography, realistic skin texture, visible pores, rich melanin luminosity, sculpted highlights, natural contact shadows, crisp hair strands, authentic materials, accurate reflections, environmental depth, cinematic commercial lighting and polished editorial realism.`;

export const SEMI_CORE = `A glamorous adult woman, deep skin tone, expressive eyes, glossy lips, sleek dark glass hair, precision makeup and dramatic lashes, luxury commercial illustration, bright beauty studio lighting, reflective highlights, crisp polished details, pop-out composition, full-body hero framing, exaggerated expressive features, merch-ready character, confident hero stance, hyper-realistic caricature, signature brand character, hyper-polished rendering, high-fidelity rendering, stylized photorealism, photoreal CGI, premium 3D illustration, high-contrast polish, collector-grade finish, hyper-gloss finish, airbrushed rendering, ultra-smooth gradients and crisp micro-detail.`;

export const IDENTITY_LOCK = `PRIMARY IDENTITY LOCK: Use the permanent uploaded brand model as the ONLY identity reference and main character. Preserve her exact face, facial structure, eyes, nose, lips, jawline, skin tone, age appearance, body shape, body proportions, curves, hips, thighs, bust, waist, height/proportional build and overall recognizable identity. Do not replace her, slim her, enlarge her, age her, de-age her, blend her with another person, or borrow another reference person's face or body. Hair, wardrobe, accessories, makeup, nails, pose, props, location, activity and companions may change only when requested.`;

export const TRYON_LOCK = `REFERENCE TRY-ON RULE: Completely ignore the person/model shown in any uploaded styling reference. Extract only the selected clothing, hairstyle, jewelry, accessory, shoes, handbag, product or scene styling. Apply that selected element to the permanent brand model as if she is simply trying it on or using it. Never borrow the reference person's face, body, skin tone, age, proportions, makeup, pose or identity. The permanent brand model always wins any conflict.`;

export const NEGATIVE = `No identity drift, no different woman, no face replacement, no body reshaping, no slimming, no exaggerated obesity, no malformed fingers, no extra limbs, no duplicated hands, no warped feet, no floating props, no warped architecture, no fake HUD overlays, no analytics panels, no dashboards, no scan lines, no random data displays, no crowns, no tiaras, no unrelated clutter, no muddy shadows, no waxy skin blur, no sterile empty environment.`;

export const DEFAULTS = {
  createFor: "Social Campaign Hero", modelMode: "Realistic Brand Model", environmentMode: "Exact realistic location",
  people: "Solo", backgroundComplexity: "Layered commercial scene", continuity: "Full image-to-video continuity",
  hair: "Keep original hair", hairColor: "Keep original color", wardrobe: "Luxury business", makeup: "Glass-skin glam",
  nails: "Medium stiletto ombré", accessories: "Mixed luxury accessories", tryOnType: "No try-on references",
  themeSelect: "None", typography: "Fashion Magazine", themeIntensity: "Balanced", palette: "Use brand palette", motifs: "Minimal",
  themeApplies: "Everything: image + typography + props + video", framing: "Hero full body", camera: "Eye level", textSafe: "Right",
  aspectRatio: "4:5 Portrait", lighting: "Bright beauty lighting", animationReady: "Animation-ready with clear foreground/midground/background",
  videoPlatform: "Grok", duration: "15 seconds", videoType: "Commercial", movement: "Natural subtle movement", cameraMotion: "Slow push in", dialogueMode: "Voiceover only"
};

function buildTryOn(v) {
  const type = v.tryOnType || "";
  if (!type || type === "No try-on references") return "";
  return `${TRYON_LOCK} Current try-on mode: ${type}.`;
}

function buildPeople(v) {
  const p = v.people || "";
  if (!p || p === "Solo") return "The permanent brand model is the only main human subject.";
  return `Supporting people: ${p}. The permanent brand model remains visually dominant and recognizable. Supporting characters complement the scene and never replace, overpower, or alter her identity.`;
}

function buildThemeLogic(v) {
  const t = v.themeSelect || "";
  if (!t || t === "None") return "No special seasonal or event theme. Keep the visual world cohesive with the campaign purpose.";
  return `THEME ENGINE: The entire campaign is "${t}" with ${v.themeIntensity || "balanced"} intensity. Apply the theme consistently to the model styling, environment, props, color story, lighting, flyer/invitation design language, typography direction and video atmosphere. Use ${v.typography || "theme-matched premium typography"} and ${v.palette || "a refined theme-driven palette"}. Decorative direction: ${v.motifs || "controlled elegant motifs"}. Do not make the theme look like disconnected clipart; everything must belong to one art-directed visual world.`;
}

export function buildImagePrompt(v) {
  const mode = v.modelMode || "";
  const styleCore = (mode === "Realistic Brand Model" || !mode) ? REALISTIC_CORE : SEMI_CORE;
  return [
    IDENTITY_LOCK,
    buildTryOn(v),
    `CAMPAIGN PURPOSE: Create a ${v.createFor || "premium branded campaign visual"}${v.campaignName ? ` for the campaign "${v.campaignName}"` : ""}.`,
    `SCENE: Place the same permanent brand model in ${v.location || "a polished realistic environment"} using ${v.environmentMode || "a realistic commercial interpretation"}. She is ${v.scene || "actively participating in a believable branded lifestyle or commercial moment"}. ${v.customScene || ""}`,
    buildPeople(v),
    `STYLING: Hair: ${v.hair || "preserve requested hair"}, ${v.hairColor || "natural polished color"}. Wardrobe: ${v.wardrobe || "luxury brand-appropriate styling"}. Makeup: ${v.makeup || "refined glam"}. Nails: ${v.nails || "freshly manicured"}. Accessories: ${v.accessories || "controlled luxury accessories"}. ${v.customStyle || ""}`,
    buildThemeLogic(v),
    `COMPOSITION: ${v.framing || "hero full-body"} framing, ${v.camera || "eye-level commercial camera"}, ${v.textSafe || "intentional"} text-safe area, ${v.aspectRatio || "4:5 portrait"}, ${v.lighting || "premium commercial lighting"}. Background complexity: ${v.backgroundComplexity || "polished realistic"}. ${v.animationReady || "animation-ready composition"} with believable movement paths and layered foreground, midground and background depth.`,
    `CONTINUITY: ${v.continuity || "preserve current campaign styling and identity across variations."}`,
    styleCore,
    `QUALITY: Keep the composition intentional, preserve requested subject details, maintain realistic object interaction, contact shadows, scale, reflections and environmental depth. Do not add unrelated clutter.`,
    `NEGATIVE INSTRUCTIONS: ${NEGATIVE}`
  ].filter(Boolean).join("\n\n");
}

export function buildVideoPrompt(v) {
  return [
    `IMAGE-TO-VIDEO CONTINUITY: Animate the exact scene described in the image prompt without redesigning the permanent brand model or environment. Preserve her exact identity, body proportions, wardrobe, hairstyle, accessories, makeup, props, setting, lighting and theme unless a change is explicitly requested.`,
    `PLATFORM: ${v.videoPlatform || "Generic Video Model"}. DURATION: ${v.duration || "15 seconds"}. VIDEO TYPE: ${v.videoType || "commercial lifestyle promo"}.`,
    `ACTION: The model performs ${v.movement || "natural subtle movement"} while staying consistent with the still image. ${v.videoGoal || ""}`,
    `CAMERA: ${v.cameraMotion || "cinematic steady camera"} with smooth believable motion and no sudden reframing that changes character identity.`,
    `ENVIRONMENTAL MOTION: Add only natural scene-appropriate motion—hair movement, fabric movement, passing people, steam, traffic, water, lighting reflections, product interaction or atmospheric movement as appropriate.`,
    `DIALOGUE MODE: ${v.dialogueMode || "No dialogue"}. Keep lip movement natural when dialogue is present.`,
    `ENDING: Finish on a clean branded hero moment suitable for a CTA or text overlay.`,
    `NEGATIVE: No face morphing, no outfit swapping, no body changes, no accessory changes, no location jump, no warped hands, no duplicated objects, no random camera glitches, no fake HUD graphics.`
  ].join("\n\n");
}

export function buildVideoScript(v) {
  const goal = v.videoGoal || `Promote the ${v.createFor || "campaign"} in a polished, natural way.`;
  return `VIDEO SCRIPT — ${v.campaignName || "GLAM Brand Campaign"}

PLATFORM: ${v.videoPlatform || "Generic Video Model"}
LENGTH: ${v.duration || "15 seconds"}
STYLE: ${v.videoType || "Commercial"}

SCENE
${v.location || "Premium realistic location"} — ${v.scene || "brand model interacting naturally in the scene"}. Theme: ${v.themeSelect || "none"}.

OPENING
Start from the established still-image composition. The permanent brand model is already in position, fully consistent with the image prompt.

ACTION
She performs: ${v.movement || "natural subtle movement"}.
${goal}

CAMERA
${v.cameraMotion || "Slow cinematic push-in"}.

ENVIRONMENT
Use believable scene motion only. Keep foreground, midground and background movement controlled and realistic.

DIALOGUE / VOICEOVER
Mode: ${v.dialogueMode || "No dialogue"}.
Suggested line: "${v.createFor === "Workshop Flyer" ? "If you've been waiting for the right time to start, this is it." : "This is your sign to make the brand move you've been thinking about."}"

ON-SCREEN TEXT
Keep text minimal and readable. Match the campaign theme and typography direction: ${v.typography || "premium editorial typography"}.

FINAL BEAT
End with the model in a clean confident hero pose with text-safe breathing room.

CTA
"Tap in. Let's make it happen."

CONTINUITY RULE
Do not change her face, body, hair, outfit, accessories, product, environment or lighting between shots unless specifically directed.`;
}

export function buildDesignDirection(v) {
  return `FLYER / INVITATION DESIGN DIRECTION

CAMPAIGN: ${v.campaignName || "Untitled Campaign"}
CREATE FOR: ${v.createFor || "Flyer / Invitation / Promotional Visual"}
THEME: ${v.themeSelect || "No special theme"}
TYPOGRAPHY: ${v.typography || "Luxury editorial typography"}
PALETTE: ${v.palette || "Use the brand palette with scene-aware accents"}
THEME INTENSITY: ${v.themeIntensity || "Balanced"}

ART DIRECTION
The model, background, typography, decorative details, props, lighting, palette and video styling must look like one coordinated campaign. The visual should not feel like a photo pasted onto a generic template.

MODEL PLACEMENT
Use ${v.framing || "hero framing"} and reserve the ${v.textSafe || "best"} area for copy.

DESIGN MOTIFS
${v.motifs || "Controlled premium decorative details only"}.

THEME RULE
${buildThemeLogic(v)}

COMMERCIAL FINISH
Clean hierarchy, polished spacing, strong readable type, premium materials, realistic depth and no clutter.`;
}