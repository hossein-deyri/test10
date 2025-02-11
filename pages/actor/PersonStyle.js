import styled from 'styled-components';
import COLORS from '@/constants/COLORS';

const PersonStyle = styled.section`
  .minHeight {
    height: 20vh;
  }
  .px-5p {
    padding: 8rem 5%;
  }
  .personInfo {
    background: ${COLORS.darkGray2};
    width: 100%;
  }
  .personHolder {
    display: flex;
    align-items: start;
    > div {
      color: white;
      display: flex;
      align-items: start;
      flex-direction: column;
      margin-right: 3rem;
      h1 {
        font-size: 2rem;
        margin-bottom: 0.7rem;
      }
      h2,
      p {
        font-size: 1.4rem;
        font-weight: 300;
      }
      h2 {
        opacity: 0.5;
        margin-bottom: 1.5rem;
      }
      p {
        line-height: 2.2;
      }
    }
    figure {
      position: relative;
      width: 180px;
      height: 180px;
      display: flex;
      align-items: start;
    }
  }
  img {
    border-radius: 1rem;
  }
  color: white;
  .relatedTitle {
    font-size: 2rem;
    font-weight: bold;
  }
  .relatedProducts {
    display: flex;
    justify-content: start;
    > div > div {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
      > div {
        width: 18rem;
      }
      &.isRow {
        > div {
          width: 100%;
        }
      }
    }
  }
`;

export default PersonStyle;
