import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, ScrollViewProps } from 'react-native';

const styles = StyleSheet.create({
  stretch: {
    flexGrow: 1,
  },
});


/* eslint-disable */
/**
 * Component for wrapping scrollable content.
 *
 * @type {React.StatelessComponent<{stretch: boolean, horizontal: boolean, children: any, props: ScrollViewProps}>}
 */
/* eslint-enable */
const Scrollable = ({ children, stretch, horizontal, ...props }) => (
  <ScrollView
    {...props}
    horizontal={horizontal}
    contentContainerStyle={stretch ? styles.stretch : null}
  >
    {children}
  </ScrollView>
);


Scrollable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  stretch: PropTypes.bool,
  horizontal: PropTypes.bool,
  props: ScrollViewProps
};

Scrollable.defaultProps = {
  stretch: false,
  horizontal: false,
};

export default Scrollable;
