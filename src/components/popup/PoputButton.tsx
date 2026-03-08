"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./popup.module.css";
import { createPortal } from "react-dom";
// import Image from "next/image"; // якщо будеш використовувати next/image — розкоментуй і налаштуй next.config.js для зовнішніх доменів

type Props = {
  buttonLabel?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

const Social = [
  {
    id: "1",
    label: "TikTok",
    // Logo має бути прямим URL на зображення; зараз це сторінка — треба замінити на URL картинки
    Logo: "https://play-lh.googleusercontent.com/BmUViDVOKNJe0GYJe22hsr7juFndRVbvr1fGmHGXqHfJjNAXjd26bfuGRQpVrpJ6YbA",
    href: "https://www.tiktok.com/@k4rpenkoo?_r=1&_t=ZN-919im78UbzC",
  },
  {
    id: "2",
    label: "X",
    Logo: "https://play-lh.googleusercontent.com/A-Rnrh0J7iKmABskTonqFAANRLGTGUg_nuE4PEMYwJavL3nPt5uWsU2WO_DSgV_mOOM=w240-h480-rw",
    href: "https://x.com/k4rpenko",
  },
  {
    id: "3",
    label: "Instagram",
    Logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
    href: "https://www.instagram.com/k4rpenko",
  },
  {
    id: "4",
    label: "Outlook",
    Logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Microsoft_Office_Outlook_%282018%E2%80%932024%29.svg",
    href: "mailto:k4rpenko@outlook.com",
  },
  {
    id: "5",
    label: "Github",
    Logo: "/svg/github-svgrepo-com.svg",
    href: "https://github.com/k4rpenko",
  },
];

export default function PopupButton({ buttonLabel = "Contact me", children, className }: Props) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    function updatePos() {
      const btn = btnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const top = rect.bottom + 8;
      const left = rect.left;
      const width = rect.width;
      setPos({ top, left, width });
    }

    if (open) updatePos();

    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos, true);
    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos, true);
    };
  }, [open]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (btnRef.current?.contains(target)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        className={`${styles.trigger} ${className ?? ""}`}
        aria-expanded={open}
        aria-controls="popup-panel"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        {buttonLabel}
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={panelRef}
              id="popup-panel"
              role="dialog"
              aria-modal="false"
              className={styles.panel}
              style={{
                position: "fixed",
                top: pos.top,
                left: Math.max(8, pos.left),
                minWidth: Math.max(200, pos.width),
                zIndex: 9999,
              }}
            >   
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flexDirection:"column" }}>
                {Social.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.buttons}
                  >
                    <img
                      src={item.Logo}
                      alt={item.label}
                      width={30}
                      height={30}
                      style={{ borderRadius: 8, display: "block" }}
                    />
                    <span style={{ fontSize: 12, marginTop: 6 }}>{item.label}</span>
                  </a>
                ))}
              </div>

              {children ? <div style={{ marginTop: 12 }}>{children}</div> : null}
            </div>,
            document.body
          )
        : null}
    </>
  );
}