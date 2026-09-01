import styled from "styled-components";

export const VideoSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 48px 0 40px 0;
`;

export const VideoContainer = styled.div`
  background: #f8f7f3;
  border-radius: 24px;
  box-shadow: 0 4px 24px 0 rgba(81, 93, 56, 0.10);
  padding: 24px 16px 16px 16px;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;

  iframe {
    border-radius: 16px;
    width: 100%;
    max-width: 640px;
    min-height: 315px;
    aspect-ratio: 16/9;
    background: #000;
  }
`;
