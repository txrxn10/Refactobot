import { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Get JWT Token from Local Storage
        const token = localStorage.getItem('token'); 
        if (!token) {
            alert("Please log in first.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/api/code/analyze', formData, {
                headers: { 
                    'Authorization': `Bearer ${token}`,  // ✅ Send JWT Token
                    'Content-Type': 'multipart/form-data'
                }
            });

            setResult(response.data.suggestions);
        } catch (error) {
            console.error("Error analyzing file:", error);
            alert("Error: " + (error.response?.data?.error || "Failed to analyze the code"));
        }
    };

    return (
        <div>
            <h2>Upload Code for AI Review</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleSubmit}>Analyze</button>
            {result && <pre>{result}</pre>}
        </div>
    );
};

export default FileUpload;


