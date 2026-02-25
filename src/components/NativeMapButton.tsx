"use client";

const NativeMapButton = () => {
    // Replace with your actual coordinates
    const lat = 35.6895;
    const lng = 139.6917;

    const handleNativeClick = () => {
        // We use a "geo" URI. It's the standard for 'find an app that does maps'
        const geoUrl = `geo:${lat},${lng}?q=${lat},${lng}`;

        // On Android, this triggers the "Open With" menu immediately.
        // On iOS, we have to handle it slightly differently because Apple is more restrictive.
        if (typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            // iOS doesn't support 'geo:', so we use the 'apple-neutral' format
            // that allows the 'Default Maps App' setting to take over.
            window.location.href = `maps://?q=${lat},${lng}`;
        } else {
            window.location.href = geoUrl;
        }
    };

    return (
        <button
            onClick={handleNativeClick}
            className="bg-pink-100 text-pink-600 px-8 py-4 rounded-3xl font-bold hover:bg-pink-200 transition-all"
        >
            📍 Choose Map App
        </button>
    );
};

export default NativeMapButton;
