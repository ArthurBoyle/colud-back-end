import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 32px;
  height: 162px;
  right: 60px;
  bottom: 0;
  text-align: center;
  .content-img1 {
    position: relative;
    bottom: 30px;
    padding: 5px;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
  }
  .content-img2 {
    padding: 5px;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
  }
  .content-text1 {
    position: relative;
    bottom: 20px;
    color: white;
    font-size: 12px;
    line-height: 16px;
  }
  .content-text2 {
    position: relative;
    top: 10px;
    color: white;
    font-size: 12px;
    line-height: 16px;
  }
  .contactUs {
    > div:nth-last-of-type(1) {
      .ant-popover-placement-leftTop {
        top: -38px !important;
      }
    }
    .ant-popover-content {
      .ant-popover-arrow {
        right: 7px;
      }
      .ant-popover-inner {
        border-radius: 8px;
      }
      .ant-popover-inner-content {
        padding: 24px;
      }
    }
  }
  .weChat {
    .ant-popover-content {
      .ant-popover-arrow {
        right: 7px;
        bottom: 35px;
      }
      .ant-popover-inner {
        border-radius: 8px;
      }
      .ant-popover-title {
        width: 160px;
        margin-left: 16px;
        padding: 16px 0 8px 0;
      }
      .ant-popover-inner-content {
        padding: 16px;
      }
    }
  }
`;

export const ContactUs = styled.div`
  width: 134px;
  .img1 {
    position: relative;
    top: 2px;
    width: 16px;
    height: 16px;
  }
  .img2 {
    position: relative;
    left: 1px;
    width: 14px;
    height: 9px;
  }
  .text1 {
    height: 20px;
    margin-left: 5px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 20px;
    text-align: left;
  }
  .text2 {
    height: 20px;
    margin-left: 7px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 20px;
    text-align: left;
  }
`;

export const WeChat = styled.div`
  div {
    width: 160px;
    padding-bottom: 8px;
    font-weight: bold;
    font-size: 16px;
    line-height: 16px;
    border-bottom: 1px solid #eeeeee;
  }
  img {
    width: 160px;
    height: 160px;
    margin-top: 18px;
  }
`;
