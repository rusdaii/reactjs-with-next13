'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      router.push('/');
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className="btn" onClick={handleLogout}>
      Logout
    </button>
  );
}
