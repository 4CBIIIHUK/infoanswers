import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const baseProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function BookIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      <path d="M8 7h8M8 11h6" />
    </svg>
  );
}

export function SearchIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

export function AlgorithmIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <rect x="3" y="3" width="6" height="5" rx="1.5" />
      <rect x="15" y="16" width="6" height="5" rx="1.5" />
      <rect x="3" y="16" width="6" height="5" rx="1.5" />
      <path d="M6 8v4h12v4M6 12v4" />
    </svg>
  );
}

export function CodeIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" />
      <rect x="2.5" y="2.5" width="19" height="19" rx="4" />
    </svg>
  );
}

export function ArrayIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M7 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2M17 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2" />
      <rect x="8" y="7" width="3" height="3" rx=".5" />
      <rect x="13" y="7" width="3" height="3" rx=".5" />
      <rect x="8" y="14" width="3" height="3" rx=".5" />
      <rect x="13" y="14" width="3" height="3" rx=".5" />
    </svg>
  );
}

export function CheckIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="m5 12.5 4.2 4L19 7" />
    </svg>
  );
}

export function InfoIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  );
}

export function AlertIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M10.3 3.7 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}

export function ChevronIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="m8 10 4 4 4-4" />
    </svg>
  );
}

export function ArrowIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

export function CloseIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function ListIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" />
    </svg>
  );
}

export function SectionIcon({ name, ...props }: IconProps & { name: string }) {
  if (name === "algorithm") return <AlgorithmIcon {...props} />;
  if (name === "code") return <CodeIcon {...props} />;
  return <ArrayIcon {...props} />;
}

export function HeroDiagram() {
  return (
    <svg viewBox="0 0 520 360" className="h-full w-full" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="sheet" x1="140" y1="40" x2="370" y2="315" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity=".98" />
          <stop offset="1" stopColor="#DDE5FF" stopOpacity=".92" />
        </linearGradient>
        <linearGradient id="line" x1="180" y1="80" x2="392" y2="292" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A9B8FF" />
          <stop offset="1" stopColor="#5BE4C0" />
        </linearGradient>
        <filter id="shadow" x="50" y="0" width="430" height="360" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#070B1A" floodOpacity=".28" />
        </filter>
      </defs>
      <circle cx="390" cy="65" r="88" fill="#596FE8" fillOpacity=".2" />
      <circle cx="92" cy="285" r="62" fill="#38D9B0" fillOpacity=".12" />
      <g filter="url(#shadow)" transform="rotate(-5 260 180)">
        <rect x="112" y="30" width="300" height="292" rx="12" fill="url(#sheet)" />
        <rect x="138" y="56" width="64" height="24" rx="5" fill="#18203C" />
        <text x="151" y="73" fill="white" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="700">A1</text>
        <rect x="138" y="102" width="218" height="8" rx="4" fill="#A9B4CE" />
        <rect x="138" y="119" width="174" height="8" rx="4" fill="#C4CCE0" />
        <rect x="138" y="149" width="244" height="62" rx="8" fill="#E1F8F1" />
        <circle cx="160" cy="180" r="11" fill="#26A984" />
        <path d="m154 180 4 4 8-9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="180" y="169" width="86" height="7" rx="3.5" fill="#278A71" />
        <rect x="180" y="184" width="164" height="7" rx="3.5" fill="#63BDA7" />
        <rect x="138" y="232" width="218" height="7" rx="3.5" fill="url(#line)" opacity=".7" />
        <rect x="138" y="249" width="191" height="7" rx="3.5" fill="#C4CCE0" />
        <rect x="138" y="266" width="224" height="7" rx="3.5" fill="#C4CCE0" />
        <text x="350" y="73" fill="#63708D" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="700">01 / 03</text>
      </g>
      <path d="M62 88h64M94 56v64" stroke="#7186F1" strokeWidth="2" strokeLinecap="round" opacity=".65" />
      <path d="m425 265 16 16 30-36" stroke="#53E0BA" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}