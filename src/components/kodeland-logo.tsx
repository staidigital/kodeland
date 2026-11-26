import Link from "next/link";

/** Kodeland-logoen: et lite terminalvindu med >_, og navnet. Lenker til forsiden. */
export function KodelandLogo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`kodeland-logo ${className}`} aria-label="Kodeland – til forsiden">
      <svg className="kodeland-logo__merke" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <rect x="1" y="2.5" width="22" height="19" rx="5" fill="currentColor" />
        <path
          d="M6.5 9 L10 12 L6.5 15"
          fill="none"
          stroke="var(--kodeland-logo-tegn, #fff)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12.5 15.5 H17.5" stroke="var(--html, #e2622b)" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span className="kodeland-logo__navn">Kodeland</span>
    </Link>
  );
}
