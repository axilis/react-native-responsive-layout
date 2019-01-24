import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Block, Grid, Section } from '../../';

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#02326b',
    fontSize: 40,
    lineHeight: 80,
  },
});

storiesOf('react-native-responsive-layout', module)
  .add('Scrollable Grid', () => (
    <Grid scrollable>
      <Section>
        <Block xsSize="1/1" mdSize="1/2">
          <View style={{ backgroundColor: '#c3defe' }}>
            <Text style={styles.text}>1</Text>
          </View>
        </Block>
        <Block xsSize="1/1" mdSize="1/2">
          <View style={{ backgroundColor: '#b2d4fe' }}>
            <Text style={styles.text}>2</Text>
          </View>
        </Block>
        <Block xsSize="1/1" mdSize="1/2">
          <View style={{ backgroundColor: '#a1cbfd' }}>
            <Text style={styles.text}>3</Text>
          </View>
        </Block>
        <Block xsSize="1/1" mdSize="1/2">
          <View style={{ backgroundColor: '#91c2fd' }}>
            <Text style={styles.text}>4</Text>
          </View>
        </Block>
        <Block xsSize="1/1" mdSize="1/2">
          <View style={{ backgroundColor: '#80b9fd' }}>
            <Text style={styles.text}>5</Text>
          </View>
        </Block>
        <Block xsSize="1/1" mdSize="1/2">
          <View style={{ backgroundColor: '#6faffd' }}>
            <Text style={styles.text}>6</Text>
          </View>
        </Block>
        <Block xsSize="1/1" mdSize="1/2">
          <View style={{ backgroundColor: '#5fa6fc' }}>
            <Text style={styles.text}>7</Text>
          </View>
        </Block>
        <Block xsSize="1/1" mdSize="1/2">
          <View style={{ backgroundColor: '#4e9dfc' }}>
            <Text style={styles.text}>8</Text>
          </View>
        </Block>
        <Block xsSize="1/1" mdSize="1/2">
          <View style={{ backgroundColor: '#3d94fc' }}>
            <Text style={styles.text}>9</Text>
          </View>
        </Block>
        <Block xsSize="1/1" mdSize="1/2">
          <View style={{ backgroundColor: '#2d8bfb' }}>
            <Text style={styles.text}>10</Text>
          </View>
        </Block>
        <Block xsSize="1/1" mdSize="1/2">
          <View style={{ backgroundColor: '#1c81fb' }}>
            <Text style={styles.text}>11</Text>
          </View>
        </Block>
        <Block xsSize="1/1" mdSize="1/2">
          <View style={{ backgroundColor: '#0b78fb' }}>
            <Text style={styles.text}>12</Text>
          </View>
        </Block>
      </Section>
    </Grid>
  ));
