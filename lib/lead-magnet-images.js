// Lead-magnet imagery — the 48-image set from the Capital Unique design
// system (`capital-unique-design`, category `lead-magnets`, commit 72b3efc).
//
// Files live in /public/images/lead-magnets and are copied from
// src/imports/library/lead-magnets in the design-system repo. Alt text is
// carried across verbatim so the two libraries stay in sync — re-copy the
// files and regenerate this map if the design system's set changes.
//
// Keys are the design-system filenames (minus extension); the filename
// prefix is the source series, which is also how each image is tagged to a
// lead magnet. Native ratios: the swipe-deck series are 16:9 (matching the
// card's image well), the guide covers are 3:2 (matching the book cover),
// and the two shell heroes are 4:5 portrait.

const DIR = "/images/lead-magnets";

const img = (key, alt, ratio) => ({ src: `${DIR}/${key}.jpg`, alt, ratio });

export const LM_IMAGES = {

  // ── Deck 1 — the one-page deal summary (deal-summary series) ──────
  "deal-summary-blank-sheet-lightfall": img(
    "deal-summary-blank-sheet-lightfall",
    "A single blank cream sheet lies at an angle on a matte black surface, a narrow band of warm light falling across its middle — the left half of the frame is empty shadow.",
    "16:9"
  ),
  "deal-summary-commercial-building-night": img(
    "deal-summary-commercial-building-night",
    "A two-storey brick and timber-batten commercial building at night, ground-floor glazing glowing warm and uplit trees along the forecourt, the paved apron empty in the foreground.",
    "16:9"
  ),
  "deal-summary-written-page-pen": img(
    "deal-summary-written-page-pen",
    "A close-written cream page rests at an angle on black felt with a matte black fountain pen laid across it, raked side light picking out the texture of the paper.",
    "16:9"
  ),
  "deal-summary-door-ajar-light": img(
    "deal-summary-door-ajar-light",
    "A timber door stands ajar in a dark plastered room, a hard wedge of warm light spilling through the gap and stretching across the polished concrete floor.",
    "16:9"
  ),
  "deal-summary-adviser-two-points": img(
    "deal-summary-adviser-two-points",
    "A woman in a dark blazer sits at a timber desk holding up two fingers mid-explanation while a man in a navy suit takes notes opposite her, a desk lamp lighting the scene from the right.",
    "16:9"
  ),

  // ── Deck 2 — questions to ask a lender (lender-questions series) ──
  "lender-questions-paper-stack-edge": img(
    "lender-questions-paper-stack-edge",
    "The cut edge of a thick stack of cream paper, top sheets fanned slightly apart, lit from the right against a black ground.",
    "16:9"
  ),
  "lender-questions-stone-block-corner": img(
    "lender-questions-stone-block-corner",
    "The corner of a dark pitted stone block, its top edge catching a thin copper rim of light, the right half of the frame falling away into black.",
    "16:9"
  ),
  "lender-questions-adviser-desk-folio": img(
    "lender-questions-adviser-desk-folio",
    "A woman in a dark blazer sits at a timber desk looking off to the left, both hands resting on a tan leather folio, an angled desk lamp and shelved books behind her in shadow.",
    "3:2"
  ),
  "lender-questions-brass-valve-wheel": img(
    "lender-questions-brass-valve-wheel",
    "Close-up of a brass valve handwheel with a knurled rim, side-lit so the spokes and machined hub glow copper against a black background.",
    "16:9"
  ),
  "lender-questions-padlock-key-open": img(
    "lender-questions-padlock-key-open",
    "A brass padlock with its shackle sprung open sits on dark slate beside the key that released it, a single warm light raking across from the left.",
    "16:9"
  ),
  "lender-questions-notebook-page-turn": img(
    "lender-questions-notebook-page-turn",
    "A dark hardcover notebook lies open on black, a single page caught mid-turn with warm light glowing along its underside and curled edge.",
    "16:9"
  ),
  "lender-questions-construction-crane-dusk": img(
    "lender-questions-construction-crane-dusk",
    "A multi-storey concrete frame under construction at dusk, its floors lit amber from within, a tower crane rising against a bruised blue sky with the last orange of sunset on the horizon.",
    "16:9"
  ),
  "lender-questions-hand-pen-blank-page": img(
    "lender-questions-hand-pen-blank-page",
    "A hand poised with a black pen just above the corner of a blank cream sheet, about to make the first mark, lit hard from the left against black.",
    "16:9"
  ),

  // ── Deck 3 — the deal-ready document list (document-list series) ──
  "document-list-file-stack-blank-sheet": img(
    "document-list-file-stack-blank-sheet",
    "A tall untidy stack of files and loose papers sits in soft focus behind a single clean blank sheet laid flat in the foreground, all on a black ground.",
    "16:9"
  ),
  "document-list-site-plan-scale-ruler": img(
    "document-list-site-plan-scale-ruler",
    "A site survey drawing curls up at one corner on dark textured stone, a brass triangular scale ruler weighting it down, warm light falling across the contour lines and lot boundaries.",
    "16:9"
  ),
  "document-list-paper-stacks-tall-short": img(
    "document-list-paper-stacks-tall-short",
    "Two stacks of paper side by side — one roughly twice the height of the other — side-lit so the cut page edges glow warm against a black background.",
    "16:9"
  ),
  "document-list-development-aerial-night": img(
    "document-list-development-aerial-night",
    "Elevated night view over a low-rise townhouse development, warm interiors and landscape uplighting picking out terraces and garden paths, suburban rooftops receding to the horizon.",
    "16:9"
  ),
  "document-list-property-photo-prints": img(
    "document-list-property-photo-prints",
    "Five bordered photographic prints of contemporary timber and glass houses at dusk lie scattered and overlapping on a dark textured surface, lit from above.",
    "16:9"
  ),
  "document-list-brass-hierarchy-nodes": img(
    "document-list-brass-hierarchy-nodes",
    "A brass rod-and-node sculpture arranged as a branching tree — one node at the top splitting down through two tiers to four feet — standing against black with the right of frame empty.",
    "16:9"
  ),
  "document-list-leather-ledgers-stacked": img(
    "document-list-leather-ledgers-stacked",
    "Two tan leather-bound ledgers stacked on a timber surface, their gilded page edges catching warm light, the left of the frame dropping into shadow.",
    "16:9"
  ),
  "document-list-broker-briefcase-portrait": img(
    "document-list-broker-briefcase-portrait",
    "A man in a navy blazer and open-collar shirt stands resting a hand on a tan leather briefcase, looking off to the left, warm pendant lights and a dark bar interior behind him.",
    "16:9"
  ),
  "document-list-townhouse-row-night": img(
    "document-list-townhouse-row-night",
    "A stepped row of concrete and timber townhouses at night, warm light glowing from recessed balconies and box windows, the upper half of the frame pure black sky.",
    "16:9"
  ),
  "document-list-site-plans-review-dusk": img(
    "document-list-site-plans-review-dusk",
    "A woman in a dark coat and a bearded builder in a white hard hat and plaid shirt lean over a large plan together on a residential build site at dusk, the timber frame of a house behind them.",
    "16:9"
  ),
  "document-list-pen-on-page-corner": img(
    "document-list-pen-on-page-corner",
    "A black pen rests on the corner of a warm cream sheet at the lower left, the rest of the frame falling away into deep shadow.",
    "16:9"
  ),
  "document-list-signing-at-home-lamp": img(
    "document-list-signing-at-home-lamp",
    "A woman in a cream cable-knit sweater sits writing on a single sheet at a dark timber table, lit by a shaded lamp with a dried arrangement and tray beside her.",
    "16:9"
  ),

  // ── The lender conversation deck (lender-conversation series) ─────
  "lender-conversation-adviser-explaining": img(
    "lender-conversation-adviser-explaining",
    "A woman in a dark blazer sits forward in a leather armchair mid-sentence, one hand raised in explanation, warm wall lights and a brick pier softly out of focus behind her.",
    "16:9"
  ),
  "lender-conversation-key-on-envelope": img(
    "lender-conversation-key-on-envelope",
    "A worn brass key lies on a kraft envelope at the left of frame on a dark surface, warm light raking across the paper, the right side empty black.",
    "16:9"
  ),
  "lender-conversation-plumb-bob": img(
    "lender-conversation-plumb-bob",
    "A bronze plumb bob hangs motionless on a braided cord, centred against a pure black background and lit so the facets of the cone catch the light.",
    "16:9"
  ),
  "lender-conversation-weight-on-pages": img(
    "lender-conversation-weight-on-pages",
    "A dark blackened steel block rests squarely on a stack of cream pages, compressing them slightly, warm light glowing along the exposed page edges beneath.",
    "16:9"
  ),
  "lender-conversation-booth-meeting": img(
    "lender-conversation-booth-meeting",
    "A man in a navy suit sits in a leather booth looking levelly across the table at another man seen from behind in the foreground, a pendant lamp lighting the table between them.",
    "16:9"
  ),
  "lender-conversation-balance-scale": img(
    "lender-conversation-balance-scale",
    "An antique bronze balance scale with both pans empty and the beam perfectly level, centred against a black background with copper highlights along the arm.",
    "16:9"
  ),
  "lender-conversation-empty-boardroom": img(
    "lender-conversation-empty-boardroom",
    "A long timber boardroom table recedes toward a single empty leather chair under a pendant light, the rest of the room lost in darkness.",
    "16:9"
  ),
  "lender-conversation-corridor-handoff": img(
    "lender-conversation-corridor-handoff",
    "A woman in a rust suede jacket holding a tan folio stands talking with a man in a charcoal overcoat in a dark brick corridor, a receding line of warm wall lights behind them.",
    "16:9"
  ),

  // ── The 10 objections deck (objection series) ─────────────────────
  "objection-living-room-through-glass": img(
    "objection-living-room-through-glass",
    "A warmly lit living room seen at night from outside through sliding glazing — pale sofa, timber coffee table and plants — the left two-thirds of the frame in darkness.",
    "16:9"
  ),
  "objection-panels-light-gap": img(
    "objection-panels-light-gap",
    "Two upright walnut panels stand almost touching on a dark surface, a single blade of warm light escaping the narrow gap between them.",
    "16:9"
  ),
  "objection-balcony-night-reflection": img(
    "objection-balcony-night-reflection",
    "A woman in a rust suede jacket stands at a balcony rail at night looking down and away, a warmly lit living room visible through glazing to her right and dark garden beyond.",
    "16:9"
  ),
  "objection-pavilion-house-dusk": img(
    "objection-pavilion-house-dusk",
    "A single-storey timber pavilion house glows warm through full-height glazing at dusk, sitting above a dry-stone retaining wall with coastal scrub in the foreground.",
    "16:9"
  ),
  "objection-leather-folio-open": img(
    "objection-leather-folio-open",
    "A tan leather presentation folio lies open on black felt with a blank cream sheet held in its corner mounts, a second closed folio behind it.",
    "16:9"
  ),
  "objection-rebar-bundle": img(
    "objection-rebar-bundle",
    "A tight bundle of cut reinforcing bar stands upright on a gritty concrete surface, the sheared ends catching warm light against a black background.",
    "16:9"
  ),
  "objection-entry-door-boots": img(
    "objection-entry-door-boots",
    "The entry of a modern home at night: a tall timber pivot door stands open onto a warm hallway, a pair of work boots left on the threshold beside a planter.",
    "16:9"
  ),
  "objection-leather-strap-steel-blocks": img(
    "objection-leather-strap-steel-blocks",
    "A stitched tan leather strap spans two blackened steel blocks on a timber surface, bridging the gap between them under warm directional light.",
    "16:9"
  ),
  "objection-dovetail-joint": img(
    "objection-dovetail-joint",
    "Extreme close-up of the corner of a walnut box showing precisely cut dovetail joinery, the pins and tails interlocking, the left of frame pure black.",
    "16:9"
  ),
  "objection-booth-conversation": img(
    "objection-booth-conversation",
    "A man gestures mid-explanation across a restaurant table while a woman in a cream sweater listens with her chin resting on her hand, a copper pendant lamp above them.",
    "16:9"
  ),

  // ── Guide covers — rendered as the BookReader front cover ─────────
  "cover-the-borrowers-guide": img(
    "cover-the-borrowers-guide",
    "A couple stand talking at a stone kitchen island in a dark timber kitchen at night, the man holding a white cup under a single warm pendant light.",
    "3:2"
  ),
  "cover-when-the-banks-say-no": img(
    "cover-when-the-banks-say-no",
    "A row of brick and timber townhouses at night seen from across the street, warm light in the upper windows and landscape uplighting along the front gardens.",
    "3:2"
  ),
  "cover-private-lending": img(
    "cover-private-lending",
    "A woman in a dark blazer stands at a full-height apartment window at dusk holding a cup, looking out over a city skyline of scattered lights, a lit shelf and desk lamp behind her.",
    "3:2"
  ),

  // ── Shell heroes — one per lead-magnet group ──────────────────────
  "hero-lounge-consultation": img(
    "hero-lounge-consultation",
    "A woman in a charcoal blazer and a man in a navy suit sit facing each other in low bouclé armchairs in a dark lounge, a tan leather folio and coffee cups on the round table between them.",
    "4:5"
  ),
  "hero-walking-conversation-verandah": img(
    "hero-walking-conversation-verandah",
    "A man carrying a tan leather folio and a woman in a black blazer walk and talk along a brick verandah at golden hour, low sun flaring down the colonnade behind them.",
    "4:5"
  ),
};

// Look an image up by design-system filename. Throws in development if the
// key is wrong — a silently missing image is worse than a loud failure.
export function lmImage(key) {
  const found = LM_IMAGES[key];
  if (!found && process.env.NODE_ENV !== "production") {
    throw new Error(`lmImage: unknown lead-magnet image "${key}"`);
  }
  return found;
}

// The shell hero, by lead-magnet group. Guides get the seated consultation;
// free tools get the walking conversation — considered vs. in-motion.
export const GROUP_HERO = {
  guides: LM_IMAGES["hero-lounge-consultation"],
  "free-tools": LM_IMAGES["hero-walking-conversation-verandah"],
};
