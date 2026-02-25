const NativeMapButton = () => {
    // Use your coordinates here
    const lat = 35.6895;
    const lng = 139.6917;
    const destination = encodeURIComponent("Your Art Gallery Name");

    // This specific URL format is intercepted by both iOS and Android systems
    const mapUrl = `https://maps.google.com/maps?daddr=${lat},${lng}&ll=${lat},${lng}`;

    return (
        <a
            href={mapUrl}
            // On mobile, this will trigger the "Open in..." system prompt
            className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-8 py-4 rounded-3xl font-bold hover:scale-105 transition-transform"
        >
            <span>📍 Open in Navigation</span>
        </a>
    );
};

export default NativeMapButton;
