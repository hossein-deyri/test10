import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { cookiesList } from '@/utilize/cookiesList';

const DashboardPage = () => {
  const router = useRouter();
  const token = cookiesList.userToken.get();

  useEffect(() => {
    if (!token) {
      router.replace('/');
    }
  });

  if (!token) {
    return null;
  }

  return null;
};

export default DashboardPage;
