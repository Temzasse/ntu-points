import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AvatarUploader from './AvatarUploader';
import { capitalize } from '../utils';

const propTypes = {
  item: PropTypes.object,
  itemKey: PropTypes.string.isRequired,
};

const ItemEdit = ({ itemKey, item }) => (
  <ItemEditWrapper>
    <Title>Edit {capitalize(itemKey)}</Title>
    <AvatarUploader itemKey={itemKey} item={item} />
  </ItemEditWrapper>
);

const ItemEditWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  font-size: 32px;
  margin: 0px 0px 16px 0px;
`;

ItemEdit.propTypes = propTypes;

export default ItemEdit;
