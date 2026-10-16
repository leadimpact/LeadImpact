"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import { COUNTRIES, DEFAULT_COUNTRY, isCountryCode, type Country, type CountryCode } from "@/content/countries";
import { readStorage, writeStorage } from "./storage";

export const COUNTRY_STORAGE_KEY = "liu.country";
const CHANGE_EVENT = "liu:country-change";

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Best guess from the device's time zone (Africa/Lagos → NG, any America/* zone → US). */
export function countryFromTimeZone(timeZone: string | undefined): CountryCode | undefined {
  if (!timeZone) return undefined;
  if (timeZone.startsWith("America/")) return "US";
  const match = Object.values(COUNTRIES).find((c) => c.timeZone === timeZone);
  return match && isCountryCode(match.code) ? match.code : undefined;
}

let guessed: CountryCode | undefined | null = null;
function guessCountry() {
  if (guessed === null) {
    try {
      guessed = countryFromTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch {
      guessed = undefined;
    }
  }
  return guessed;
}

/** The visitor's saved choice, else a time-zone guess, else Nigeria. */
function getSnapshot(): CountryCode {
  const stored = readStorage(COUNTRY_STORAGE_KEY);
  return isCountryCode(stored) ? stored : (guessCountry() ?? DEFAULT_COUNTRY);
}

const getServerSnapshot = (): CountryCode => DEFAULT_COUNTRY;

interface CountryContextValue {
  country: Country;
  setCountry: (code: CountryCode) => void;
}

const CountryContext = createContext<CountryContextValue | null>(null);

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const code = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setCountry = useCallback((next: CountryCode) => {
    writeStorage(COUNTRY_STORAGE_KEY, next);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return (
    <CountryContext.Provider value={{ country: COUNTRIES[code], setCountry }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry(): CountryContextValue {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be used inside <CountryProvider>");
  return ctx;
}
