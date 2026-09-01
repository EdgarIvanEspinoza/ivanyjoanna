import { VideoSection, VideoContainer } from "./Styles";

export const MainVideo = () => (
  <VideoSection>
    <VideoContainer>
      <iframe
        src="https://www.youtube.com/embed/9lkPgJpLrKw"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </VideoContainer>
  </VideoSection>
);
