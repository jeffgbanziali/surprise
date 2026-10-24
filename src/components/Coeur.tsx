export default function Coeur({ battement = true, className = "" }: { battement?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${battement ? "beat" : ""} ${className}`} aria-hidden="true">
      <defs><radialGradient id="hg" cx="35%" cy="30%"><stop offset="0" stopColor="#ff8aa6" /><stop offset="1" stopColor="#b3103a" /></radialGradient></defs>
      <path fill="url(#hg)" d="M12 21s-8-5.6-8-11.2C4 6.6 6.4 5 8.5 5c1.5 0 2.7.8 3.5 2 .8-1.2 2-2 3.5-2C17.6 5 20 6.6 20 9.8 20 15.4 12 21 12 21z" />
    </svg>
  );
}
