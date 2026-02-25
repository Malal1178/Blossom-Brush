"use client";

const NativeMapButton = () => {
    const openMapChooser = () => {
        const lat = 35.6895;
        const lng = 139.6917;

        // We try to open Google Maps first. 
        // If the user has it, iOS will pop up a window: "Open in Google Maps?"
        const googleMapsUrl = `comgooglemaps://?q=${lat},${lng}&zoom=14`;

        // Check if the user is on a mobile device (where deep links work)
        const isMobile = typeof navigator !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            // Logic: We try to trigger the Google Maps deep link on mobile.
            window.location.href = googleMapsUrl;

            // If the user doesn't have Google Maps, we fallback to Apple Maps after a tiny delay
            setTimeout(() => {
                window.location.href = `maps://?q=${lat},${lng}`;
            }, 500);
        } else {
            // Fallback for Desktop where URL schemes like comgooglemaps:// might fail silently or error out
            window.open(`https://maps.google.com/?q=${lat},${lng}`, "_blank");
        }
    };

    return (
        <button
            onClick={openMapChooser}
            className="bg-pink-100 text-pink-600 px-8 py-4 rounded-3xl font-bold hover:bg-pink-200 transition-all"
        >
            📍 Choose Map App
        </button>
    );
};

export default NativeMapButton;
