import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Grid, Section, Block } from 'react-native-responsive-layout';
import { withSizeClass } from 'react-native-responsive-layout/wrappers';


const styles = StyleSheet.create({
  element: {
    height: '100%',
    justifyContent: 'center',
  },
  lightContent: {
    backgroundColor: '#b2d4fe',
  },
  darkContent: {
    backgroundColor: '#1c81fb',
  },
});


const WrappedComponent = withSizeClass(({ sizeSelector }) => {
  const style = sizeSelector({
    xs: styles.lightContent,
    sm: styles.darkContent,
  });

  return (
    <View style={[styles.element, style]} />
  );
});


export default () => (
  <Grid>
    <Section>
      <Block>
        <WrappedComponent />
      </Block>
    </Section>
  </Grid>
);
