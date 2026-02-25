"use client";

const NativeMapButton = () => {
    const openMapChooser = () => {
        const lat = 35.6895;
        const lng = 139.6917;

        // We try to open Google Maps first. 
        // If the user has it, iOS will pop up a window: "Open in Google Maps?"
        const googleMapsUrl = `comgooglemaps://?q=${lat},${lng}&zoom=14`;

        // Logic: We try to trigger the Google Maps deep link.
        window.location.href = googleMapsUrl;

        // If the user doesn't have Google Maps, we fallback to Apple Maps after a tiny delay
        setTimeout(() => {
            window.location.href = `maps://?q=${lat},${lng}`;
        }, 500);
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
