# "Hand Over to John" form — GHL setup

The Charles A.I "Hand this to John" button now embeds your GHL form
(`4QpLNP0k5KOkCI9QSw2G`) inside a themed card on the site. The website side is
done. To make the **form itself** match the design system (and flip with the
site's dark/light toggle), do these steps in GHL — the form is a cross-origin
iframe, so this styling has to live inside GHL, it can't be applied from the
site.

## 1. Custom CSS (required)
GHL → Sites → Forms → **Hand Over to John** → Edit → **Styles / Advanced → Custom CSS**.
Paste the full block from `lib/ghl-form-css.js` → `GHL_HANDOVER_FORM_CSS`.

This styles the form to the Capital Unique design system. It defaults to **dark**
(matching the site's default), and switches to **light** when the site is in
light mode — *provided* you also add the JS in step 2.

## 2. Custom JS — the theme bridge (for light/dark to follow the toggle)
Same form → **Custom JS** (if your GHL plan exposes it). Paste
`GHL_HANDOVER_FORM_JS` from the same file.

The site's chat embeds the form with `?cu=dark` or `?cu=light` (the live theme).
This snippet reads that and sets `<html data-cu="…">`, which the CSS keys off.
The site also reloads the form when you flip the toggle, so it re-reads the value.

- **If your plan has no Custom JS field:** the form stays **dark**. That's fine —
  dark is the site's default, so it matches for the vast majority of visits. True
  toggle-following just won't happen without the JS. (Alternative if you want
  perfect sync without JS: duplicate the form, style one light + one dark, and I'll
  switch which one the site loads by theme — tell me and I'll wire it.)

## 3. Send the chat transcript to John (optional but recommended)
The site passes a short transcript as `?conversation=…`. To capture it, add a
field in the form builder that receives it:
- Add a **hidden** (or long-text) custom field, e.g. "Conversation".
- Set its **Query Key** to `conversation` (Field settings → Query Key).
Now John gets the chat alongside the contact. Without this field, the transcript
is simply ignored (form still works).

## 4. Fix the placeholder links
The form's **Privacy Policy** and **Terms of Service** links currently point to
`example.com`. Repoint them to:
- `https://www.capitalunique.com/privacy`
- `https://www.capitalunique.com/terms`
Also replace the `[BUSINESS NAME]` / `[U…]` placeholders in the consent text.

## 5. Automation (already wired)
You confirmed the "Hand Over to John" workflow triggers on **form submission**,
so no change is needed — submissions from the embed fire it exactly as before.
