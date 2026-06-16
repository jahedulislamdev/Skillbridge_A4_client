// Helper for slot-related utilities

// Map of day abbreviations to full names
export const dayMap: Record<string, string> = {
    MON: "Monday",
    TUE: "Tuesday",
    WED: "Wednesday",
    THU: "Thursday",
    FRI: "Friday",
    SAT: "Saturday",
    SUN: "Sunday",
};

// Helper to format time from ISO string
export const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC", // Use UTC if your backend sends 1970-01-01 base dates
    });

// Helper to calculate hours and total price
export const calculateSlotMetrics = (
    start: string,
    end: string,
    rate: string,
) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const durationHours = (endTime - startTime) / (1000 * 60 * 60);
    const totalPrice = durationHours * parseFloat(rate);
    return {
        duration: durationHours.toFixed(1),
        totalPrice: Math.round(totalPrice),
    };
};
