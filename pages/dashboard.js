import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check for a "token", simulate authentication (this would be a JWT or session check in real apps)
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl">Welcome to the Dashboard!</h1>
    </div>
  );
}
