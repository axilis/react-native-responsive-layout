import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Grid, Section, Block } from '../../';

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
  whiteText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
  },
});

storiesOf('react-native-responsive-layout', module)
  .add('Fixed Size Elements', () => (
    <Grid>
      <Section>
        <Block size={100}>
          <View style={[styles.element, { backgroundColor: '#a1cbfd' }]}>
            <Text style={styles.text}>100pt</Text>
          </View>
        </Block>
        <Block size="stretch">
          <View style={[styles.element, { backgroundColor: '#80b9fd' }]}>
            <Text style={styles.text}>stretch</Text>
          </View>
        </Block>
        <Block size="1/4">
          <View style={[styles.element, { backgroundColor: '#5fa6fc' }]}>
            <Text style={styles.text}>1/4</Text>
          </View>
        </Block>
        <Block size="25%">
          <View style={[styles.element, { backgroundColor: '#3d94fc' }]}>
            <Text style={styles.text}>25%</Text>
          </View>
        </Block>
      </Section>
      <Section>
        <Block size={150}>
          <View style={[styles.element, { backgroundColor: '#02418d' }]}>
            <Text style={styles.whiteText}>150pt{'\n'}fixed</Text>
          </View>
        </Block>
        <Block size="stretch">
          <View style={[styles.element, { backgroundColor: '#02326b' }]}>
            <Text style={styles.whiteText}>stretch{'\n'}remaining width</Text>
          </View>
        </Block>
      </Section>
    </Grid>
  ));

