import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun, Monitor, Check, ChevronDown } from "lucide-react";

type ThemeSetting = "light" | "dark" | "system";
type EffectiveTheme = "light" | "dark";

const getStoredThemeSetting = (): ThemeSetting => {
  if (typeof window === "undefined") return "system";
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light" || stored === "system")
    return stored as ThemeSetting;
  return "system";
};

const resolveTheme = (setting: ThemeSetting): EffectiveTheme => {
  if (setting === "system") {
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }
  return setting;
};

const applyTheme = (setting: ThemeSetting) => {
  const theme = resolveTheme(setting);
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
};

const ThemeToggle: React.FC = () => {
  const [setting, setSetting] = useState<ThemeSetting>(getStoredThemeSetting());
  const [open, setOpen] = useState(false);
  const effectiveTheme = useMemo(() => resolveTheme(setting), [setting]);
  const ref = useRef<HTMLDivElement | null>(null);
  const hoverTimeout = useRef<number | null>(null);

  useEffect(() => {
    applyTheme(setting);
    localStorage.setItem("theme", setting);
  }, [setting]);

  useEffect(() => {
    if (setting !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, [setting]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(e.target as Node)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const icon =
    setting === "system" ? (
      <Monitor className="size-5" />
    ) : effectiveTheme === "dark" ? (
      <Sun className="size-5" />
    ) : (
      <Moon className="size-5" />
    );

  const setAndClose = (s: ThemeSetting) => {
    setSetting(s);
    setOpen(false);
  };

  const label =
    setting === "system" ? "System" : setting === "dark" ? "Dark" : "Light";

  const openNow = () => {
    if (hoverTimeout.current) window.clearTimeout(hoverTimeout.current);
    setOpen(true);
  };
  const closeSoon = () => {
    if (hoverTimeout.current) window.clearTimeout(hoverTimeout.current);
    hoverTimeout.current = window.setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      ref={ref}
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <Button
        variant="ghost"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onFocus={openNow}
        className="text-gray-800 hover:text-gray-900 hover:bg-pink-200/50 inline-flex items-center gap-2"
        title={`Theme: ${label}`}
      >
        {icon}
        <span className="hidden sm:inline">Theme</span>
        <ChevronDown
          className={`size-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
        />
      </Button>
      {open && (
        <div
          role="menu"
          aria-label="Theme"
          className="absolute right-0 mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-lg p-1 z-50 dark:bg-[#0f172a] dark:border-[#1f2937]"
        >
          <MenuItem
            active={setting === "system"}
            onClick={() => setAndClose("system")}
            icon={<Monitor className="size-4" />}
            label="System"
          />
          <MenuItem
            active={setting === "dark"}
            onClick={() => setAndClose("dark")}
            icon={<Sun className="size-4" />}
            label="Dark"
          />
          <MenuItem
            active={setting === "light"}
            onClick={() => setAndClose("light")}
            icon={<Moon className="size-4" />}
            label="Light"
          />
        </div>
      )}
    </div>
  );
};

const MenuItem = ({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) => (
  <button
    role="menuitemradio"
    aria-checked={active}
    onClick={onClick}
    className={`w-full flex items-center gap-2 rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-pink-50 focus:bg-pink-50 focus:outline-none dark:text-gray-100 dark:hover:bg-[#111827] dark:focus:bg-[#111827] ${active ? "bg-pink-50 dark:bg-[#111827]" : ""}`}
  >
    {icon}
    <span className="flex-1 text-left">{label}</span>
    {active && <Check className="size-4 text-pink-primary" />}
  </button>
);

export default ThemeToggle;
