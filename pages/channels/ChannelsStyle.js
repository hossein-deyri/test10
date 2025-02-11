import styled from 'styled-components';
import COLORS from '@/constants/COLORS';

const ChannelStyle = styled.div`
  min-height: 110vh;
  padding: 70px 0;
  .channelTitle {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }
  .rightSection {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    .viewMore {
      color: ${COLORS.clearBlue};
      width: 100%;
      margin: 15px auto;
      background: ${COLORS.darkGray2};
      text-align: center;
      padding: 10px;
      font-size: 16px;
      border: none;
      outline: none;
      svg {
        width: 15px;
        vertical-align: middle;
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
  .fullscreen {
    height: 500px;
  }
  .leftSection {
    .playerContainer {
      height: 100%;
      border-radius: 10px;
      position: relative;
    }
    .epgContainer {
      margin: 3rem 0;
      font-size: 1.6rem;
      .epgHeader {
        color: ${COLORS.lightGray};
        display: flex;
        align-items: center;
        color: #fff;
        padding: 10px;
        justify-content: space-between;
      }
      .programsHolder {
        display: flex;
        flex-direction: column;
        color: #fff;
        .programHolder {
          display: flex;
          align-items: center;
          padding: 10px;
          justify-content: space-between;
          border-bottom: 1px solid ${COLORS.darkGray3};
        }
      }
    }
    .controls {
      direction: ltr;
      width: 100%;
      padding: 1rem 1%;
      position: absolute;
      bottom: 0px;
      left: 0;
      z-index: 999;
      background: linear-gradient(to top, black, transparent 80%);
      transition: 0.6s;
      display: flex;

      .mainControl {
        width: 2.5rem;
        height: 2.5rem;
        transition: 0.4s;
        transform: scale(1);
        :hover {
          transform: scale(1.2);
        }
      }

      button {
        width: 2.5rem;
        height: 2.5rem;
        border: none;
        outline: none;
        background: transparent;
        img {
          width: 2.5rem;
          height: 2.5rem;
        }
      }
      .volumeBar {
        width: 100%;
        background: ${COLORS.lightGray};
        outline: none;
        appearance: none;
        height: 4px;
        border-radius: 1rem;
        position: relative;
        cursor: pointer;
        ::-moz-range-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          background: ${COLORS.red2};
          border-radius: 50%;
          cursor: pointer;
          border: none;
          transition: 0.3;
        }

        ::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          background: ${COLORS.red2};
          border-radius: 50%;
          cursor: pointer;
          transition: 0.3;
        }
      }
      .volumeHolder {
        position: absolute;
        left: -23px;
        top: -72px;
        padding: 1rem;
        background: ${COLORS.darkGray5};
        width: 100px;
        transform: rotate(-90deg);
        border-radius: 0.5rem;
        transition: 0.4s linear;
        opacity: 0;
        visibility: hidden;
      }
      .volumeIcon {
        position: relative;
        :hover .volumeHolder {
          opacity: 1;
          visibility: visible;
        }
      }
      .volumeBar {
        ::-moz-range-thumb {
          width: 14px;
          height: 14px;
        }
        ::-webkit-slider-thumb {
          width: 14px;
          height: 14px;
        }
      }
    }
    img {
      width: 100%;
      height: 500px;
      object-fit: cover;
    }
  }
`;

export const ChannelHolder = styled.div`
  cursor: pointer;
  width: 110px;
  height: 110px;
  background: ${COLORS.darkGray2};
  margin: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};
  font-size: 14px;
  transition: 0.2s linear;
  &.active {
    background-color: ${COLORS.red2};
  }
  :hover {
    background-color: ${COLORS.red2};
  }
  :hover img {
    filter: drop-shadow(0 0 5px black);
  }
  span {
    display: block;
    margin-top: 10px;
  }
  img {
    width: auto;
    object-fit: contain;
    height: 60px;
    transition: 0.2s linear;
  }
`;

export default ChannelStyle;
