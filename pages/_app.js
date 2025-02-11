import { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { wrapper } from '../redux/store';
import { setupResponseInterceptor } from 'services/httpService';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import { useDispatch } from 'react-redux';
import { login } from 'redux/slices/userSlice';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import Router from 'next/router';
import getTheme from '@/styles/theme';
import { prefixer } from 'stylis';
import stylisRTLPlugin from 'stylis-plugin-rtl';
import { cookiesList } from '@/utilize/cookiesList';
import { CustomAlertProvider } from '@/components/custom/customAlert/CustomAlert';

import '@/public/icons/icon-font/style.css';
import '@/styles/bootstrap.min.css';
import '@/styles/font.css';
import '@/styles/customStyle.css';
import '@/styles/global.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'nprogress/nprogress.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/bundle';

NProgress.configure({
  showSpinner: false
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, stylisRTLPlugin]
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps }) => {
  const theme = getTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    setIsLoaded(true);
    setupResponseInterceptor();
  }

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider {...{ theme }}>
        <CustomAlertProvider>
          <CssBaseline />
          <ErrorBoundary>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </ErrorBoundary>
        </CustomAlertProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default wrapper.withRedux(MyApp);
