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
    fontSize: 30,
  },
});

export default () => (
  <Grid>
    <Section>
      <Block style={{ width: 100 }}>
        <View style={[styles.element, { backgroundColor: '#b2d4fe' }]}>
          <Text style={styles.text}>Fixed</Text>
        </View>
      </Block>
      <Block size="auto" />
      <Block xsSize="1/2" smSize="2/3">
        <View style={[styles.element, { backgroundColor: '#80b9fd' }]}>
          <Text style={styles.text}>Responsive</Text>
        </View>
      </Block>
    </Section>
  </Grid>
);

