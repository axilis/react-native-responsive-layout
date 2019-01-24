import React from 'react';
import { StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { Grid, Section, Block } from '../../';
import { SizeInfo, withSizeInfo } from '../../wrappers';


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


storiesOf('react-native-responsive-layout', module)
  .add('Conditional Styling', () => (
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
  ));
