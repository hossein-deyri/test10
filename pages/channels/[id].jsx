import { useRouter } from 'next/router';
import ChannelsPage from '@/components/channels';

const SingleChannel = () => {
  const router = useRouter();
  const { id } = router.query;

  return <ChannelsPage channelId={id} />;
};

export default SingleChannel;
