import styled from 'styled-components';

const Avatar = styled.div`
  height: ${props => props.size || '48px'};
  width: ${props => props.size || '48px'};
  border-radius: 50%;
  background: ${props => props.theme.pinkGradient};
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  ${props => props.url && `background-image: url(${props.url});`}
`;

export default Avatar;
