import { describe, expect, it } from "vitest";

import { usageStreaks } from "./streaks";

describe("usageStreaks", () => {
  it("returns zero streaks for an empty profile", () => {
    expect(usageStreaks([], "2026-06-06")).toEqual({
      currentStreakDays: 0,
      longestStreakDays: 0,
    });
  });

  it("counts the current streak when the latest active day is today", () => {
    expect(
      usageStreaks(
        ["2026-06-01", "2026-06-01", "2026-06-02", "2026-06-04", "2026-06-05", "2026-06-06"],
        "2026-06-06",
      ),
    ).toEqual({ currentStreakDays: 3, longestStreakDays: 3 });
  });

  it("resets the current streak to zero when the latest active day is in the past", () => {
    expect(
      usageStreaks(["2026-06-01", "2026-06-02", "2026-06-03", "2026-06-05", "2026-06-06"], "2026-06-10"),
    ).toEqual({ currentStreakDays: 0, longestStreakDays: 3 });
  });

  it("keeps the longest streak even when the current streak is active but shorter", () => {
    expect(
      usageStreaks(["2026-06-01", "2026-06-02", "2026-06-03", "2026-06-05", "2026-06-06"], "2026-06-06"),
    ).toEqual({ currentStreakDays: 2, longestStreakDays: 3 });
  });
});
