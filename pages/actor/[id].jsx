import { useRouter } from 'next/router';
import Actor from '@/components/actor/Actor';

const person = () => {
  const router = useRouter();

  return <Actor id={router.query.id} />;
};

export default person;
