import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Grid, Section, Block } from 'react-native-responsive-layout';
import { SizeInfo, withSizeInfo } from 'react-native-responsive-layout/wrappers';


const styles = StyleSheet.create({
  element: {
    height: '100%',
    justifyContent: 'center',
  },
  lightBackground: {
    backgroundColor: '#b2d4fe',
  },
  darkBackground: {
    backgroundColor: '#1c81fb',
  },
});


const WrappedComponent = withSizeInfo(({ sizeSelector }) => {
  const style = sizeSelector({
    xs: styles.lightBackground,
    sm: styles.darkBackground,
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
        <SizeInfo>
          {({ sizeSelector }) => {
            const style = sizeSelector({
              xs: styles.lightBackground,
              sm: styles.darkBackground,
            });
            return (
              <View style={[styles.element, style]} />
            );
          }}
        </SizeInfo>
      </Block>
    </Section>
  </Grid>
);
