import Link from "next/link";
import { TOOL_PAGES } from "@/lib/tool-pages";

const resourceLinks = [
  { href: "/how-to-use", label: "How to Use" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/copyright", label: "Copyright / DMCA" },
];

export function SiteFooter() {
  const mp4Group = TOOL_PAGES.filter((p) => p.group === "mp4-mp3");
  const videoGroup = TOOL_PAGES.filter((p) => p.group === "video-to-audio");
  const formatGroup = TOOL_PAGES.filter((p) => p.group === "format-converters");

  return (
    <footer className="mt-auto border-t border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-bold">
              <span className="text-lg">
                ReelAudio<span className="text-primary"> Studio</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Free online video-to-audio converter. Convert MP4 to MP3, extract
              audio from any video file — fast, private, no sign-up required.
            </p>
          </div>

          {/* MP4 & MP3 tools */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              MP4 & MP3 Tools
            </h3>
            <ul className="mt-3 space-y-2">
              {mp4Group.map((p) => (
                <li key={p.path}>
                  <Link
                    href={p.path}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Video to Audio tools */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Video to Audio
            </h3>
            <ul className="mt-3 space-y-2">
              {videoGroup.map((p) => (
                <li key={p.path}>
                  <Link
                    href={p.path}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Format converters */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Format Converters
            </h3>
            <ul className="mt-3 space-y-2">
              {formatGroup.map((p) => (
                <li key={p.path}>
                  <Link
                    href={p.path}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources + Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
            <ul className="mt-3 space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-3 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <strong>Disclaimer:</strong> ReelAudio Studio is an independent
            audio-extraction utility. We are not affiliated with Instagram,
            TikTok, YouTube, Facebook, or any other platform. Users must only
            upload videos they own or have explicit permission to process. We
            do not host, store, or distribute copyrighted media. By using this
            tool, you confirm you have the right to extract audio from the
            uploaded content.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ReelAudio Studio. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
