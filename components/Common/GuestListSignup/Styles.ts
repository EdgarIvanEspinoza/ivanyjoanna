import styled from 'styled-components';

export const StyledPlaceTransportDetailInput = styled.input<{
  disabled: boolean;
}>`
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #e5dcbf;
  width: auto;
  padding: 1.2rem;
  background: #343b26;
  ${(props) => props.disabled && `color: #454f30;`}
`;

export const StyledPlaceTransportDetailButton = styled.button<{
  disabled: boolean;
}>`
  background-color: #e5dcbf;
  width: 8.4rem;
  padding: 1.2rem 1rem;
  border: 0;
  font-family: Montserrat;
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  color: #454f30;
  cursor: pointer;
  ${(props) => props.disabled && `color: #454f30;`}
`;

export const StyledResponseMessage = styled.p`
  font-size: 1.4rem;
  margin: 1.2rem 0;
`;
