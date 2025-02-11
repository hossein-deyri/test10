import Image from 'next/image';
import { useRouter } from 'next/router';
import { ImageWrapper, Wrapper } from '@/components/Live/styles';
import { Delimiter, ProgramsOfTheDay } from '@/components/Live/components';
import { FooterShadow, SideShadow } from '@/components/Live/Slider/styles';

const LiveProgram = () => {
  const router = useRouter();
  const { program } = router.query;

  return (
    <>
      <ImageWrapper>
        <Image
          src="/img/archive-list.png"
          alt="program"
          layout="fill"
          objectFit="cover"
        />
        <SideShadow />
        <FooterShadow />
      </ImageWrapper>
      <Wrapper className="text-white archive-list">
        <h3 className="schedule-title">لیست بازپخش</h3>
        <Delimiter />
        <ProgramsOfTheDay program={program} isArchiveList />
      </Wrapper>
    </>
  );
};

export default LiveProgram;
