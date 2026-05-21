// Soft animated light rays — Magic UI-style background element,
// reworked for Capital Unique.
//
// The visual is pure CSS: two conic-gradient "fans" of beams fall
// from the top of the container, blurred and drifting on a slow
// keyframe. Colour is driven through var(--cu-brandy-punch), so
// it follows the theme flip (Brandy-orange in dark, Inkwell-blue
// in light) with no extra wiring.
//
// No state, no JS animation, no hooks — safe to drop into server
// or client components. All the visuals live in the .cu-light-rays*
// rules in app/globals.css.

export function LightRays({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`cu-light-rays pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <span className="cu-light-rays-beam cu-light-rays-beam-a" />
      <span className="cu-light-rays-beam cu-light-rays-beam-b" />
    </div>
  );
}
