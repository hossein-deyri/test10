import { Container } from 'react-bootstrap';

import {
  Slider,
  ProgramsArchive,
  ProgramsSchedule,
  CurrentlyPlayingPrograms
} from '@/components/Live';
import { BodyWrapper } from '@/components/Live/styles';

const live = () => {
  return (
    <Container fluid>
      <Slider />
      <BodyWrapper>
        <CurrentlyPlayingPrograms />
        <ProgramsSchedule />
        <ProgramsArchive />
      </BodyWrapper>
    </Container>
  );
};

export default live;
