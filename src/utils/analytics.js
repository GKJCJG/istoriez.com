export const clickEvent = (category, label, value) => {
    typeof window !== "undefined" && process.env.NODE_ENV === 'production' && window.gtag(
        "event",
        "click",
        {
            'event_category': category,
            'event_label': label,
            'value': value
        }
    );
}
