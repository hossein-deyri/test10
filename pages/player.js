import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { http } from 'services/httpService';
import { endpoint } from 'endpoint';
import { getSubInfo } from '@/services/subscriptionServices';
import { SniperStyle } from '@/components/mainPage/MainSlider/mainSliderStyle';
import { ClipLoader } from 'react-spinners';
import Player from '@/components/Player/Player';
import { NotFoundSection } from '@/components/custom';
import { getConnectionInfo } from '@/services/connectionInfoServices';
import ALERT_SEVERITY from '@/ts/enums/ALERT_SEVERITY';
import { showCustomAlert } from '@/components/custom/customAlert/CustomAlert';
import { CustomDialog } from '@/components/custom';
import ROUTES from '@/constants/ROUTES';
import SUBSCRIPTION_TYPE from '@/ts/enums/SUBSCRIPTION_TYPE';
import { Box } from '@mui/material';

const playerMock = {
  features: {
    controls: true,
    logo: true,
    backArrow: true,
    toast: false,
    duration: true,
    playedTime: true,
    pauseSection: true
  },
  controls: {
    play: true,
    jumpButton: true,
    volume: true,
    settings: true,
    playList: true,
    fullscreen: true,
    volume: true,
    playRateSpeed: true,
    serial: false,
    report: false
  }
};

const playerPage = () => {
  const router = useRouter();
  const { id, liveId } = router.query;
  const [nextId, setNextId] = useState('');
  const [prevId, setPrevId] = useState('');
  const [videoData, setVideoData] = useState();
  const [playerOptions, setPlayerOptions] = useState(playerMock);
  const [loading, setLoading] = useState(false);
  const [connectionInfo, setConnectionInfo] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [productType, setProductType] = useState(null);

  useEffect(() => {
    if (id) {
      gettingData();
    } else if (liveId) {
      setPlayerOptions({
        features: {
          controls: true,
          logo: true,
          backArrow: false,
          nextEpisode: false,
          toast: false,
          duration: false,
          playedTime: false,
          pauseSection: false
        },
        controls: {
          play: false,
          jumpButton: true,
          volume: true,
          settings: false,
          fullscreen: true,
          playRateSpeed: false,
          playList: false,
          serial: false,
          report: false
        }
      });
      gettingLiveData();
    }
  }, [id, liveId]);

  const gettingData = async () => {
    setLoading(true);
    try {
      const { data } = await http.get(endpoint.PRODUCTS.products(id));
      const _data = data.data;
      if (_data?.subscriptionType === SUBSCRIPTION_TYPE.SYSTEM)
        setProductType(SUBSCRIPTION_TYPE.SYSTEM);
      _data.pauseSection = {
        img:
          process.env.NEXT_PUBLIC_API_URL_FILE +
          _data?.images.find((img) => img.imageType === 'POSTER')?.src,
        name: _data.name,
        translatedName: _data.translatedName,
        description: _data.longDescription
      };
      setVideoData(_data);

      if (_data.prev) setPrevId(_data.prev.toString());
      if (_data.episodeNextId) setNextId(_data.episodeNextId.toString());
    } catch (err) {
      showCustomAlert('یک خطای ناشناخته ایجاد شده است', ALERT_SEVERITY.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const gettingLiveData = async () => {
    try {
      const { data } = await http.get(endpoint.LIVES['/'](liveId));
      const _data = data.data;
      _data.videoLink = _data.playLink;
      _data.isLive = true;
      setVideoData(_data);
    } catch (err) {
      showCustomAlert('یک خطای ناشناخته ایجاد شده است', ALERT_SEVERITY.ERROR);
    }
  };

  useEffect(async () => {
    getConnectionInfo()
      .then((res) => {
        const connectionInfoData = res.data;
        setConnectionInfo(connectionInfoData);
        if (connectionInfoData.usingVpn) setOpenDialog(true);
      })
      .catch((error) => {
        showCustomAlert(error, ALERT_SEVERITY.ERROR);
      });
  }, []);

  useEffect(() => {
    if (productType === SUBSCRIPTION_TYPE.SYSTEM) {
      getSubInfo().then((data) => {
        if (!data.data && !liveId) {
          router.replace(ROUTES.PAYMENT());
        }
      });
    }
  }, [productType]);

  return (
    <>
      {loading ? (
        <SniperStyle className="d-flex justify-content-center align-items-center">
          <ClipLoader
            color="rgba(226, 18, 33, 1)"
            loading={videoData}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </SniperStyle>
      ) : connectionInfo.usingVpn ? (
        <CustomDialog
          open={openDialog}
          title="کاربر گرامی"
          hasCloseIcon={false}
          closeOnBackdrop={false}
          link={ROUTES.VOD(id)}
          submitButton={{
            content: 'بستن'
          }}
        >
          <Box
            sx={{
              width: {
                xs: '100%',
                sm: '50rem'
              }
            }}
          >
            تماشای محتوا تنها برای کاربرانی که در ایران هستند، مجاز است. در
            صورتی که از vpn استفاده می‌کنید، ابتدا آن را خاموش کرده سپس مجدداً
            اقدام به پخش نمایید.
          </Box>
        </CustomDialog>
      ) : videoData?.videoLink ? (
        <Player
          id={id}
          videoData={videoData}
          title={videoData.name}
          tags={videoData.tags}
          address={videoData.videoLink}
          buttons={playerOptions.controls}
          features={playerOptions.features}
          pauseSection={videoData?.pauseSection}
          description={videoData.longDescription}
          image={videoData.images?.[1]?.src}
          connectionInfo={connectionInfo}
        />
      ) : (
        <NotFoundSection text="متأسفانه ویدیو یافت نشد." />
      )}
    </>
  );
};

export default playerPage;
