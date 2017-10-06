import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { DirectionProp } from '../../shared/props';

const sharedStyle = {
  alignItems: 'flex-start',
  flex: 1,
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  position: 'relative',
};

const style = StyleSheet.create({
  horizontal: {
    ...sharedStyle,
    flexDirection: 'column',
  },
  vertical: {
    ...sharedStyle,
    flexDirection: 'row',
  },
});

const Section = ({ children }, { contentDirection }) => (
  <View style={(contentDirection === 'vertical' ? style.vertical : style.horizontal)}>
    { children }
  </View>
);


Section.contextTypes = {
  contentDirection: DirectionProp,
};

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Section;
