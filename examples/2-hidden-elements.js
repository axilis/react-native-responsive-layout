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
  textLight: {
    color: 'white',
  },
});

export default () => (
  <Grid>
    <Section>
      <Block>
        <View style={[styles.element, { backgroundColor: '#c3defe' }]}>
          <Text style={styles.text}>always visible</Text>
        </View>
      </Block>
      <Block smHidden>
        <View style={[styles.element, { backgroundColor: '#4e9dfc' }]}>
          <Text style={styles.text}>small phone</Text>
        </View>
      </Block>
      <Block xsHidden smVisible>
        <View style={[styles.element, { backgroundColor: '#02326b' }]}>
          <Text style={[styles.text, styles.textLight]}>large phone</Text>
        </View>
      </Block>
    </Section>
  </Grid>
);

