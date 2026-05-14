# Image Prompts

Every Nano Banana 2 prompt used to generate imagery for Capital Unique. Saved here so the user can re-run any prompt in Google AI Studio for finer iteration.

## Workflow

1. Per page, determine which images are REUSE (existing asset), GENERATE (Nano Banana 2), or SOURCE (stock — currently unused).
2. For each GENERATE: prompt is logged below with date, page, image slot, and the actual prompt text.
3. Generate batches of 10 at minimum 2K resolution.
4. User approves before committing to `public/images/`.

## Style anchor

All prompts inherit a shared style anchor paragraph that establishes brand consistency. The anchor is appended after each specific image brief.

```
STYLE ANCHOR:
Cinematic dark-luxury aesthetic. Deep blacks (#080808–#1A1A1A range) with restrained warm
copper-orange accents (Brandy Punch family, OKLCH). Photographic, not illustrated. Subtle
grain. Editorial, considered, premium — feels like the visual identity of an Australian
non-bank capital advisor for sophisticated borrowers. Avoid clichéd finance imagery
(handshakes, generic city skylines, stock-photo people in suits laughing). Avoid bright
saturated colors. Composition prioritizes negative space and quiet authority.
```

## How to use these prompts

Until the Nano Banana MCP is connected, each prompt below is run manually:

1. Open Google AI Studio (https://aistudio.google.com)
2. Select the **Nano Banana 2** image model
3. Paste the full prompt (specific brief + style anchor)
4. Set aspect ratio per the spec on each prompt
5. Generate at minimum 2K resolution
6. Save the approved output to `public/images/<page>/<slot>.webp` (Next.js `<Image>` will optimize)
7. Tick the "✅ saved" checkbox below

When the Nano Banana MCP is connected, these same prompts can be run via the `generate_image` tool with the same aspect ratio.

---

## Home page (3 prompts)

### 1. Hero — `public/images/home/hero.webp`
**Slot:** Right side of the hero, single large image (replacing Relume's 12-image carousel)
**Aspect ratio:** `4:5` (portrait, ~1640×2048)
**Status:** ☐ generated · ☐ saved

```
A cinematic dark-luxury wide shot of contemporary Australian architecture at dusk —
either a quiet, considered modernist building exterior with deep shadow play, or
an aerial view of a sophisticated property development at golden hour.
Composition emphasizes strong vertical or geometric lines, deep negative space,
and a single warm copper-orange light source (matching Brandy Punch
#CD722D-equivalent OKLCH values) that draws the eye. The mood is "considered
authority" — a place where serious capital decisions get made. No people. No text.
No corporate stock-photo feel. Photographic, not illustrated. Subtle film grain.

STYLE ANCHOR:
Cinematic dark-luxury aesthetic. Deep blacks (#080808–#1A1A1A range) with restrained
warm copper-orange accents (Brandy Punch family, OKLCH). Photographic, not illustrated.
Subtle grain. Editorial, considered, premium — feels like the visual identity of an
Australian non-bank capital advisor for sophisticated borrowers. Avoid clichéd finance
imagery (handshakes, generic city skylines, stock-photo people in suits laughing).
Avoid bright saturated colors. Composition prioritizes negative space and quiet authority.
```

### 2. Bento "For borrowers seeking finance" — `public/images/home/bento-borrowers.webp`
**Slot:** Large left tile in the "Built for those who think differently" bento grid
**Aspect ratio:** `16:9` (landscape, ~2048×1152)
**Status:** ☐ generated · ☐ saved

```
A close-up, abstract architectural still life suggesting "building something complex,
capital flowing through structure." Examples that work: a beam of warm copper light
cutting across a dark concrete or steel surface; an extreme close-up of an architectural
model's interior; the geometry of a half-built construction site at dusk; or the precise
intersection of structural elements with a single point of warm illumination. The visual
metaphor is unconventional finance enabling complex projects. Composition is tight,
intentional, with deep blacks dominating and one focal warm-light moment.
No people. No text. No literal money imagery (no coins, no cash, no bank logos).

STYLE ANCHOR:
Cinematic dark-luxury aesthetic. Deep blacks (#080808–#1A1A1A range) with restrained
warm copper-orange accents (Brandy Punch family, OKLCH). Photographic, not illustrated.
Subtle grain. Editorial, considered, premium — feels like the visual identity of an
Australian non-bank capital advisor for sophisticated borrowers. Avoid clichéd finance
imagery (handshakes, generic city skylines, stock-photo people in suits laughing).
Avoid bright saturated colors. Composition prioritizes negative space and quiet authority.
```

### 3. Bento "Deploy capital with clarity" — `public/images/home/bento-partners.webp`
**Slot:** Large bottom-right tile in the bento grid
**Aspect ratio:** `16:9` (landscape, ~2048×1152)
**Status:** ☐ generated · ☐ saved

```
An aerial or elevated wide shot of an Australian rural-or-coastal landscape at first
light — quiet, vast, structured. Suggests "structured deals built to endure." Could be:
neat agricultural lines from above with a single warm dawn light source; a coastal
property estate with considered geometry; or a wide architectural plaza captured from
elevation with strong shadow play. The mood is patient, governed, long-horizon —
capital deployed with intent over years, not quarters. No people. No text. No literal
finance symbology.

STYLE ANCHOR:
Cinematic dark-luxury aesthetic. Deep blacks (#080808–#1A1A1A range) with restrained
warm copper-orange accents (Brandy Punch family, OKLCH). Photographic, not illustrated.
Subtle grain. Editorial, considered, premium — feels like the visual identity of an
Australian non-bank capital advisor for sophisticated borrowers. Avoid clichéd finance
imagery (handshakes, generic city skylines, stock-photo people in suits laughing).
Avoid bright saturated colors. Composition prioritizes negative space and quiet authority.
```
