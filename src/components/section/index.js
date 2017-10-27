import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { DirectionProp } from '../../shared/props';

const sharedStyle = {
  alignItems: 'flex-start',
  flex: 0,
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  position: 'relative',
};

const styles = StyleSheet.create({
  horizontal: {
    ...sharedStyle,
    flexDirection: 'column',
  },
  vertical: {
    ...sharedStyle,
    flexDirection: 'row',
  },
  stretch: {
    flex: 1,
  },
});


/**
 * Component used to contain group of Boxes.
 */
const Section = ({ children, style }, { contentDirection, containerStretch }) => (
  <View
    style={[
      (contentDirection === 'vertical' ? styles.vertical : styles.horizontal),
      (containerStretch ? styles.stretch : null),
      style,
    ]}
  >
    { children }
  </View>
);


Section.contextTypes = {
  contentDirection: DirectionProp,
  containerStretch: PropTypes.bool,
};

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.shape({}),
};

Section.defaultProps = {
  style: {},
};

export default Section;
