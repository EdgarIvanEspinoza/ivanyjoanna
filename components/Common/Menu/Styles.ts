export const StyledLiWedding = styled.li`
  background: linear-gradient(90deg, #f7e9b0 0%, #fffbe6 50%, #f7e9b0 100%);
  padding: 0.8rem;
  gap: 1rem;
  color: #7c5e1a;
  font-weight: bold;
  position: relative;
  box-shadow: 0 0 8px 2px #ffe06699;
  animation: wedding-glow 2.5s infinite alternate;
  border-radius: 8px;

  a {
    color: #7c5e1a;
    text-shadow: 0 0 8px #ffe066, 0 0 2px #fffbe6;
    font-family: "Montaga", serif;
    letter-spacing: 1px;
    font-size: 1.1em;
    transition: text-shadow 0.3s;
    display: block;
    width: 100%;
    height: 100%;
  }

  @keyframes wedding-glow {
    0% {
      box-shadow: 0 0 8px 2px #ffe06699;
      filter: brightness(1);
    }
    100% {
      box-shadow: 0 0 24px 8px #ffe066cc;
      filter: brightness(1.15);
    }
  }
`;
import styled from "styled-components";

export const StyledUlMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  list-style: none;
  margin-top: 2.4rem;
  font-size: 2rem;
  line-height: 2rem;
  width: 100%;

  @media (max-width: 980px) {
    gap: 0.8rem;
    flex-direction: column;
    & > li { width: 100%; }
  }
`;

export const StyledLi = styled.li`
  background-color: #515d38;
  padding: 0.8rem 1.2rem;
  gap: 1rem;
  color: #e5dcbf;
  border-radius: 6px;
  position: relative;
  a { display: block; width: 100%; height: 100%; color: inherit; text-decoration: none; }
  &:hover { filter: brightness(1.08); }
`;

export const StyledLiPlain = styled.li`
  padding: 0.4rem 0.6rem;
  color: #e5dcbf;
  a { display: block; width: 100%; height: 100%; color: inherit; text-decoration: none; }
  position: relative;
  &:hover a { text-decoration: underline; }
`;

export const StyledLiRSVP = styled.li`
  background-color: #e5dcbf;
  padding: 0.8rem 1.2rem;
  gap: 1rem;
  color: #515d38;
  border-radius: 6px;
  position: relative;
  a { display: block; width: 100%; height: 100%; color: inherit; text-decoration: none; }
  &:hover { filter: brightness(0.95); }
`;
