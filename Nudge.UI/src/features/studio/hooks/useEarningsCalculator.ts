"use client";

import { useState, useId } from "react";

export function useEarningsCalculator(initialEarnings: number = 75000) {
    const [monthlyEarnings, setMonthlyEarnings] = useState<number>(initialEarnings);
    const sliderId = useId();

    // Financial calculations: ~12% loss on Western dollar platforms
    const annualSavings = Math.round(monthlyEarnings * 0.12 * 12);
    const hoursSaved = Math.round(8 + (monthlyEarnings / 50000) * 4);

    return {
        monthlyEarnings,
        setMonthlyEarnings,
        annualSavings,
        hoursSaved,
        sliderId,
    };
}
