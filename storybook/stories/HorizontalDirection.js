import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Grid, Section, Block } from '../../';

const styles = StyleSheet.create({
  element: {
    width: 160,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#02326b',
    fontSize: 40,
    marginTop: 10,
    fontWeight: '600',
  },
  icon: {
    textAlign: 'center',
    fontSize: 60,
  },
});

storiesOf('react-native-responsive-layout', module)
  .add('Horizontal Direction', () => (
    <Grid horizontal>
      <Section>
        <Block xsSize="1/1" smSize="1/2">
          <View style={[styles.element, { backgroundColor: '#c3defe' }]}>
            <Text style={styles.text}>2018.</Text>
          </View>
        </Block>
        <Block xsSize="1/1" smSize="1/2">
          <View style={[styles.element, { backgroundColor: '#a1cbfd' }]}>
            <Text style={styles.text}>2017.</Text>
          </View>
        </Block>
        <Block xsSize="1/1" smSize="1/2">
          <View style={[styles.element, { backgroundColor: '#80b9fd' }]}>
            <Text style={styles.text}>2016.</Text>
          </View>
        </Block>
        <Block xsSize="1/1" smSize="1/2">
          <View style={[styles.element, { backgroundColor: '#5fa6fc' }]}>
            <Text style={styles.text}>2015.</Text>
          </View>
        </Block>
        <Block xsSize="1/1" smSize="1/2">
          <View style={[styles.element, { backgroundColor: '#3d94fc' }]}>
            <Text style={styles.text}>2014.</Text>
          </View>
        </Block>
      </Section>
    </Grid>
  ));
