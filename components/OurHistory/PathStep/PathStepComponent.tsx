import {
  StyledPathStepDescription,
  StyledPathStepImage,
  StyledPathStepConnectorImage,
  StyledPathStepLeyendWrapper,
  StyledPathStepTitle,
  StyledPathStepWrapper,
} from './Styles';

type Props = {
  title?: string;
  description?: string;
  imageUrl?: string;
  reverse?: boolean;
  top: string;
  left?: string;
  right?: string;
};

export const PathStepComponent = ({
  title = 'Nosotros',
  description = 'Two liner of a story I don’t know how long is going to be ',
  imageUrl = '/assets/images/path-placeholder.png',
  reverse = false,
  top,
  left,
  right,
}: Props): React.ReactElement => {
  return (
    <StyledPathStepWrapper {...{ reverse, top, left, right }}>
      <StyledPathStepImage
        src={imageUrl}
        alt="Image"
        width={212}
        height={212}
      />
      <StyledPathStepConnectorImage
        src={'/assets/images/connector.svg'}
        alt="Image"
        width={24}
        height={1}
      />
      <StyledPathStepLeyendWrapper>
        <StyledPathStepTitle>{title}</StyledPathStepTitle>
        <StyledPathStepDescription>{description}</StyledPathStepDescription>
      </StyledPathStepLeyendWrapper>
    </StyledPathStepWrapper>
  );
};
