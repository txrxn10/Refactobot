import { useRouter } from 'next/router';

const Navbar = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push('/login');
    };

    return (
        <nav>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
