import Image from "next/image";

// The New World Courtage logo used in the site headers.
export default function SiteLogo({ className = "h-8 w-auto" }) {
  return (
    <Image src="/logos/nwc-logo-navbar.svg" alt="New World Courtage" width={606} height={181} className={className} priority />
  );
}
