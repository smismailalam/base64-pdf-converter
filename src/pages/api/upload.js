// pages/api/upload.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Check if the payload is too large
        const contentLength = req.headers['content-length'];
        if (contentLength && parseInt(contentLength) > 15 * 1024 * 1024) { // 5 MB limit
            return res.status(413).json({ error: 'Payload too large' });
        }

        try {
            const { base64 } = req.body;

            // Decode the Base64 string
            const base64Data = base64.split(',')[1]; // Handle data URL scheme
            const buffer = Buffer.from(base64Data, 'base64');

            // Create a unique filename
            const fileName = `document_${Date.now()}.pdf`;
            const filePath = path.join(process.cwd(), 'public/uploads', fileName);

            // Save the PDF file
            fs.writeFileSync(filePath, buffer);

            // Generate the file URL
            const fileUrl = `${req.headers.origin}/uploads/${fileName}`;
            res.status(200).json({ url: fileUrl });
        } catch (error) {
            console.error('Error saving file:', error);
            res.status(500).json({ error: 'Failed to upload file' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
