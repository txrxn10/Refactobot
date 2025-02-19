import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FileUpload from '../components/FileUpload';

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <div>
            <h1>Refactobot: AI-powered Code Improvement</h1>
            {isAuthenticated ? <FileUpload /> : <p>Redirecting to login...</p>}
        </div>
    );
}
