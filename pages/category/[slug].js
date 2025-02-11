import { useRouter } from 'next/router';
import MainPage from '@/components/mainPage';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const CustomPage = () => {
  const [pageId, setPageId] = useState('');

  const menus = useSelector((store) => store.menus);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (menus.length) {
      setPageId(menus.find(({ englishTitle }) => englishTitle === slug)?.id);
    }
  }, [slug, menus]);

  return <>{pageId && <MainPage menuId={pageId} isLanding={false} />}</>;
};

export default CustomPage;
