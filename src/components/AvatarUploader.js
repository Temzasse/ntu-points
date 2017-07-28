import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FileUploader from 'react-firebase-file-uploader';
import * as firebase from 'firebase';
import Avatar from './Avatar';

const propTypes = {
  itemKey: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
};

class AvatarUploader extends Component {
  state = {
    progress: 0,
    isUploading: false,
  }

  handleUploadStart = () => {
    this.setState({ isUploading: true, progress: 0 });
  }

  handleProgress = (progress) => {
    console.log('PROGRESS', progress);
    this.setState({ progress });
  }

  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  }

  handleUploadSuccess = (filename) => {
    const { itemKey } = this.props;

    this.setState({ progress: 100, isUploading: false });

    firebase.storage()
      .ref('avatars')
      .child(filename)
      .getDownloadURL()
      .then(url => {
        firebase.database().ref(`leaderboard/${itemKey}/avatar`).set(url);
      });
  }

  render() {
    const { itemKey, item } = this.props;
    const { progress, isUploading } = this.state; 

    return (
      <AvatarUploaderWrapper>
        <UploadButton>
          Upload avatar picture
          <FileUploader
            accept="image/*"
            name="avatar"
            filename={() => `${itemKey}_avatar`}
            storageRef={firebase.storage().ref('avatars')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </UploadButton>

        {(isUploading && progress > 0) &&
          <ProgressBar progress={progress} />
        }
        
        {(!isUploading && progress === 100) &&
          <AvatarSection>
            <AvatarTitle>Your new avatar</AvatarTitle>
            <Avatar url={item.avatar} size='180px' />
          </AvatarSection>
        }
      </AvatarUploaderWrapper>
    );
  }
}

const AvatarUploaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const UploadButton = styled.label`
  cursor: pointer;
  display: inline-block;
  border-radius: 6px;
  background-color: ${props => props.theme.pinkDarker};
  color: #fff;
  width: 100%;
  padding: 16px 24px;
  text-align: center;

  &:hover, &:active {
    background-color: ${props => props.theme.pinkDarkest};
  }

  & > input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
`;
const ProgressBar = styled.div`
  margin: 16px 0px;
  background-color: ${props => props.theme.pinkDark};
  height: 24px;
  width: 100%;
  border-radius: 4px;
  transition: transform 0.1s linear;
  transform-origin: left bottom;
  transform: scaleX(${props => props.progress / 100});
`;
const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 16px;
`;
const AvatarTitle = styled.div`
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 12px;
`;

AvatarUploader.propTypes = propTypes;

export default AvatarUploader;
