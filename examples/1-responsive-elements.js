import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Grid, Section, Block } from 'react-native-responsive-layout';

const styles = StyleSheet.create({
  element: {
    height: 100,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#02326b',
    fontSize: 40,
  },
});

export default () => (
  <Grid>
    <Section style={{ borderColor: 'red', borderWidth: 1, borderBottomWidth: 0 }}>
      <Block xsSize="1/1" smSize="1/2">
        <View style={[styles.element, { backgroundColor: '#b2d4fe' }]}>
          <Text style={styles.text}>1.1</Text>
        </View>
      </Block>
      <Block xsSize="1/1" smSize="1/2">
        <View style={[styles.element, { backgroundColor: '#a1cbfd' }]}>
          <Text style={styles.text}>1.2</Text>
        </View>
      </Block>
      <Block xsSize="1/1" smSize="1/2">
        <View style={[styles.element, { backgroundColor: '#91c2fd' }]}>
          <Text style={styles.text}>1.3</Text>
        </View>
      </Block>
    </Section>
    <Section style={{ borderColor: 'red', borderWidth: 1 }}>
      <Block xsSize="1/1" smSize="1/2">
        <View style={[styles.element, { backgroundColor: '#4e9dfc' }]}>
          <Text style={styles.text}>2.1</Text>
        </View>
      </Block>
    </Section>
  </Grid>
);

