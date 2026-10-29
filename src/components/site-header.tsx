import Link from "next/link";
import { AudioWaveform, ChevronDown } from "lucide-react";
import { TOOL_PAGES } from "@/lib/tool-pages";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// Pages that appear directly in the top nav (no dropdown)
const directNavLinks = [
  { href: "/", label: "MP4 to MP3" },
  { href: "/video-to-audio-converter", label: "Video to Audio" },
  { href: "/mp3-extractor", label: "MP3 Extractor" },
  { href: "/video-to-mp3-converter", label: "Video to MP3" },
  { href: "/how-to-use", label: "How to Use" },
  { href: "/faq", label: "FAQ" },
];

// All format / action pages for the dropdown mega-menu
const mp4Group = TOOL_PAGES.filter((p) => p.group === "mp4-mp3");
const videoGroup = TOOL_PAGES.filter((p) => p.group === "video-to-audio");
const formatGroup = TOOL_PAGES.filter((p) => p.group === "format-converters");

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <AudioWaveform className="h-5 w-5" />
          </span>
          <span className="text-lg tracking-tight">
            ReelAudio<span className="text-primary"> Studio</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {directNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              All Tools <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>MP4 & MP3 Tools</DropdownMenuLabel>
              {mp4Group.map((p) => (
                <DropdownMenuItem key={p.path} asChild>
                  <Link href={p.path}>{p.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Video to Audio</DropdownMenuLabel>
              {videoGroup.map((p) => (
                <DropdownMenuItem key={p.path} asChild>
                  <Link href={p.path}>{p.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Format Converters</DropdownMenuLabel>
              {formatGroup.map((p) => (
                <DropdownMenuItem key={p.path} asChild>
                  <Link href={p.path}>{p.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#extractor"
            className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 sm:inline-flex"
          >
            Convert MP4 to MP3
          </Link>
        </div>
      </div>

      {/* Mobile nav — horizontal scroll, all pages */}
      <nav className="flex gap-1 overflow-x-auto border-t border-border/40 px-4 py-2 lg:hidden">
        {TOOL_PAGES.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/how-to-use"
          className="whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          How to Use
        </Link>
        <Link
          href="/faq"
          className="whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          FAQ
        </Link>
      </nav>
    </header>
  );
}
