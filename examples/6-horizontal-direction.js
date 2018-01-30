import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Grid, Section, Block } from 'react-native-responsive-layout';

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

export default () => (
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
    </Section>
  </Grid>
);
