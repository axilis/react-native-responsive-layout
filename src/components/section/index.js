import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import { DirectionProp } from '../../shared/props';
import { checkInsideGrid } from '../../utils';

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
    alignContent: 'stretch',
    alignItems: 'stretch',
  },
});


/**
 * Component used to contain group of Blocks.
 */
const Section = ({ children, style, stretch }, { contentDirection, containerStretch }) => {
  if (!containerStretch && !!stretch) {
    console.warn( // eslint-disable-line no-console
      'Using `stretch` on `Section` without using it on `Grid` has no effect because grid itself won\'t be stretched so section will just collapse and won\'t be visible.\nPlease enable stretch on `Grid` as well.',
    );
  }

  const stretched = (stretch === undefined ? containerStretch : stretch);
  return (
    <View
      style={[
        (contentDirection === 'vertical' ? styles.vertical : styles.horizontal),
        (stretched ? styles.stretch : null),
        style,
      ]}
    >
      { children }
    </View>
  );
};


Section.contextTypes = {
  contentDirection: checkInsideGrid(DirectionProp),
  containerStretch: checkInsideGrid(PropTypes.bool),
};

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.shape({}),
  stretch: PropTypes.bool,
};

Section.defaultProps = {
  style: {},
  stretch: undefined,
};

export default Section;
