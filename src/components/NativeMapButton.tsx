"use client";

const NativeMapButton = () => {
    const openNativeMenu = async () => {
        const lat = 35.6895;
        const lng = 139.6917;
        const title = "My Art Studio";

        // We create a Google Maps link because the iPhone OS recognizes 
        // this specifically as a "Location" when shared.
        const mapUrl = `http://maps.google.com/?q=${lat},${lng}`;

        if (typeof navigator !== 'undefined' && navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: 'Open this location in:',
                    url: mapUrl,
                });
            } catch (err) {
                // If they cancel the menu, do nothing
                console.log("Menu closed");
            }
        } else {
            // Fallback for desktop browsers
            window.open(mapUrl, '_blank');
        }
    };

    return (
        <button
            onClick={openNativeMenu}
            className="bg-pink-100 text-pink-600 px-8 py-4 rounded-3xl font-bold hover:bg-pink-200 transition-all"
        >
            📍 Choose Map App
        </button>
    );
};

export default NativeMapButton;
