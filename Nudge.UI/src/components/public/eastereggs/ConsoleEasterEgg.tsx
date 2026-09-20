"use client";

import { useEffect, useRef } from "react";

export function ConsoleEasterEgg() {
  const hasLogged = useRef(false);

  useEffect(() => {
    if (hasLogged.current) return;
    hasLogged.current = true;

    const banner = `
  _   _           _             
 | \\ | |         | |            
 |  \\| |_   _  __| | __ _  ___  
 | . \` | | | |/ _\` |/ _\` |/ _ \\ 
 | |\\  | |_| | (_| | (_| |  __/ 
 |_| \\_|\\__,_|\\__,_|\\__, |\\___| 
                     __/ |      
                    |___/       
`;

    console.log(
      `%c${banner}`,
      "color: #0284c7; font-weight: bold; font-family: monospace; line-height: 1.2;"
    );

    console.log(
      "%c🏔️ Nudge %c• Peek behind the curtains?",
      "background: #0284c7; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-family: sans-serif; font-size: 11px;",
      "color: #64748b; font-style: italic; font-size: 11px; margin-left: 4px;"
    );

    console.log(
      "%cBuilt with Next.js & ASP.NET Core in Kathmandu 🇳🇵\n" +
      "Thanks for using the application! If you find any bugs or cups of tea at places they definitely should not be, feel free to spill the tea via %c/report-to-dev%c or suggest new features from there.",
      "color: #94a3b8; font-size: 11px; font-family: sans-serif; line-height: 1.6;",
      "color: #38bdf8; text-decoration: underline; font-weight: 600;",
      "color: #94a3b8;"
    );
  }, []);

  return null;
}