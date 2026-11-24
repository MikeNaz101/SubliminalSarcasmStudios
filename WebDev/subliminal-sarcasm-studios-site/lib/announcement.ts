// The announcement bar at the top of every page (components/AnnouncementBar.tsx).
//
// Visitors can close it; it stays closed for them until `id` changes. Give a new
// announcement a new id so people who closed the old one see it. Set `enabled` to
// false to take the bar down.

export const announcement = {
    enabled: true,
    id: 'void-runner-app-store-launch',
    label: 'Out now',
    headline: 'Void Runner is out now on the App Store.',
    shortHeadline: 'Void Runner is out on the App Store.',
    link: {
        label: 'Download on the App Store',
        shortLabel: 'Get it',
        href: 'https://apps.apple.com/app/void-runner-arbiter-exe/id6825461837',
    },
    // The second line, about Steam, shows until the day before `until` (New York time) and then
    // hides itself, so the bar never promises a date that has already passed.
    upcoming: {
        text: 'Coming to Steam on Christmas Day.',
        until: '2026-12-25',
    },
};

/** localStorage key that remembers which announcement a visitor closed. */
export const ANNOUNCEMENT_DISMISSED_KEY = 'sss-announcement-dismissed';
