import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';

import { Grid, Section, Block } from '../../';

const styles = StyleSheet.create({
  element: {
    height: 100,
    justifyContent: 'center',
  },
});

storiesOf('react-native-responsive-layout', module)
  .add('ResponsiveElements', () => (
    <Grid>
      <Section>
        <Block xsSize="1/1" smSize="1/2">
          <View style={[styles.element, { backgroundColor: '#c3defe' }]} />
        </Block>
        <Block xsSize="1/1" smSize="1/2">
          <View style={[styles.element, { backgroundColor: '#b2d4fe' }]} />
        </Block>
        <Block xsSize="1/1" smSize="1/2">
          <View style={[styles.element, { backgroundColor: '#a1cbfd' }]} />
        </Block>
      </Section>
      <Section>
        <Block xsSize="1/1" smSize="1/2">
          <View style={[styles.element, { backgroundColor: '#2d8bfb' }]} />
        </Block>
        <Block xsSize="1/1" smSize="1/2">
          <View style={[styles.element, { backgroundColor: '#1c81fb' }]} />
        </Block>
        <Block xsSize="1/1" smSize="1/2">
          <View style={[styles.element, { backgroundColor: '#0b78fb' }]} />
        </Block>
        <Block xsSize="1/1" smSize="1/2">
          <View style={[styles.element, { backgroundColor: '#0470f1' }]} />
        </Block>
        <Block xsSize="1/1" smSize="1/2">
          <View style={[styles.element, { backgroundColor: '#0468e0' }]} />
        </Block>
      </Section>
    </Grid>
  ));

