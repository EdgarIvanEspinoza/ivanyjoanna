import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: 'grid';
  min-height: '100vh';
  grid-template-rows: 'auto 1fr auto';
`;

export const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 100rem;
  height: 100%;
  position: relative;
  margin: 5rem auto 0;

  @media (max-width: 980px) {
    padding: 2.2rem;
    margin: 0;
  }
`;

export const StyledTopDecoratorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const StyledFormLabel = styled.h1`
  font-size: 2.8rem;
  font-weight: 400;
  margin-top: 1.6rem;
`;

export const StyledFormLabelDescription = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
`;

export const StyledFormInput = styled.input`
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #e5dcbf;
  width: auto;
  padding: 1.2rem;
  background: #343b26;

  &:not(:placeholder-shown) {
    background: #343b26;
  }
`;

export const StyledFormSelect = styled.select`
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
`;

export const StyledFormButton = styled.button`
  background-color: #e5dcbf;
  width: 100%;
  padding: 1.2rem 1rem;
  border: 0;
  font-family: Montserrat;
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  color: #454f30;
  margin: 2.4rem 0 0 auto;
`;

export const StyledFormLabelAllergies = styled.label`
  font-family: Montserrat;
  font-size: 1.8rem;
  font-weight: 400;
  text-align: left;
  color: #e5dcbf;
  display: flex;
`;

export const StyledFormCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #e5dcbf;
  border-radius: 5px;
  background-color: #e5dcbf;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  position: relative;

  &:checked {
    background-color: #343b26;
    border-color: #343b26;
  }

  &:checked::after {
    content: '✓';
    color: #e5dcbf;
    font-size: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const StyledFormAllergiesWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
  margin-top: 1.2rem;
`;

export const StyledFormInputAllergies = styled.input`
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #e5dcbf;
  width: 50%;
  padding: 0.8rem;
  background: #343b26;
  margin-bottom: 0.8rem;
`;

export const StyledFormInputAllergiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledFormMessageResponse = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 1.2rem auto;
  padding: 1.2rem;
  font-size: 18px;
  font-weight: 400;
`;
