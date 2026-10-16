import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import { COUNTRY_STORAGE_KEY, CountryProvider, countryFromTimeZone, useCountry } from "./country";

function Probe() {
  const { country, setCountry } = useCountry();
  return (
    <button type="button" onClick={() => setCountry("GH")}>
      {country.code}
    </button>
  );
}

const renderProbe = () =>
  render(
    <CountryProvider>
      <Probe />
    </CountryProvider>,
  );

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  window.localStorage.clear();
});

describe("countryFromTimeZone", () => {
  it("maps campus time zones and any American zone", () => {
    expect(countryFromTimeZone("Africa/Accra")).toBe("GH");
    expect(countryFromTimeZone("Africa/Kampala")).toBe("UG");
    expect(countryFromTimeZone("America/New_York")).toBe("US");
  });

  it("gives no guess for other zones, or for Kenya while it is hidden", () => {
    expect(countryFromTimeZone("Europe/London")).toBeUndefined();
    expect(countryFromTimeZone("Africa/Nairobi")).toBeUndefined();
    expect(countryFromTimeZone(undefined)).toBeUndefined();
  });
});

// Tests run in UTC (vitest.config.ts), which has no guess, so the default is Nigeria.
describe("CountryProvider", () => {
  it("defaults to Nigeria and remembers the chosen country", () => {
    renderProbe();
    const button = screen.getByRole("button");
    expect(button.textContent).toBe("NG");

    act(() => button.click());
    expect(button.textContent).toBe("GH");
    expect(window.localStorage.getItem(COUNTRY_STORAGE_KEY)).toBe("GH");
  });

  it("ignores Kenya while FEATURE_KENYA is off", () => {
    window.localStorage.setItem(COUNTRY_STORAGE_KEY, "KE");
    renderProbe();
    expect(screen.getByRole("button").textContent).toBe("NG");
  });

  it("ignores an invalid stored value", () => {
    window.localStorage.setItem(COUNTRY_STORAGE_KEY, "ZZ");
    renderProbe();
    expect(screen.getByRole("button").textContent).toBe("NG");
  });

  it("keeps working when storage throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    renderProbe();
    const button = screen.getByRole("button");
    expect(button.textContent).toBe("NG");
    expect(() => act(() => button.click())).not.toThrow();
  });
});
