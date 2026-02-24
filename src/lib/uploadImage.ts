import { supabase } from './supabaseClient';

export async function uploadImageToSupabase(filePayload: string | File, fileName: string): Promise<string | null> {
    try {
        let fileBody: File | Blob | Buffer;
        let contentType = 'image/png';

        if (typeof filePayload === 'string') {
            // Check if it's a base64 string
            if (filePayload.startsWith('data:image')) {
                const arr = filePayload.split(',');
                const mimeMatch = arr[0].match(/:(.*?);/);
                if (mimeMatch) {
                    contentType = mimeMatch[1];
                }
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                fileBody = new Blob([u8arr], { type: contentType });
            } else {
                // If it's a regular string (e.g. an emoji or an already existing URL), just return it.
                return filePayload;
            }
        } else {
            fileBody = filePayload;
            contentType = filePayload.type;
        }

        const filePath = `gallery/${Date.now()}_${fileName}`;

        const { data, error } = await supabase.storage
            .from('art-gallery') // Creating bucket named 'art-gallery'
            .upload(filePath, fileBody, {
                contentType: contentType,
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error("Supabase Upload Error:", error);
            return null;
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
            .from('art-gallery')
            .getPublicUrl(filePath);

        return publicUrlData.publicUrl;

    } catch (err) {
        console.error("Unexpected error during upload:", err);
        return null;
    }
}
