// pages/index.js
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Home = () => {
    const [base64Pdf, setBase64Pdf] = useState('');

    const handleUpload = async () => {
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ base64: base64Pdf }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('File uploaded successfully:', data.url);
                window.open(data.url, '_blank'); // Open the PDF in a new tab
            } else {
                console.error('File upload failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during upload:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Upload PDF</h1>
            <textarea
                rows="10"
                cols="50"
                placeholder="Paste your Base64 PDF here"
                value={base64Pdf}
                onChange={(e) => setBase64Pdf(e.target.value)}
                className={styles.textarea}
            />
            <br />
            <button onClick={handleUpload} className={styles.button}>Upload PDF</button>
        </div>
    );
};

export default Home;
