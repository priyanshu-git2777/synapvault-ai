export function AnimatedGradientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#f8f9ff]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(238,242,255,0.9),transparent_46%)]" />

      <div className="gradient-orb gradient-orb-one" />
      <div className="gradient-orb gradient-orb-two" />
      <div className="gradient-orb gradient-orb-three" />
      <div className="gradient-orb gradient-orb-four" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.28)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <div className="noise-overlay absolute inset-0 opacity-[0.035]" />
    </div>
  );
}
