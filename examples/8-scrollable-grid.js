import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Block, Grid, Section } from 'react-native-responsive-layout';

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#02326b',
    fontSize: 40,
    lineHeight: 80,
  },
});

export default () => (
  <Grid scrollable>
    <Section>
      <Block xsSize="1/1" mdSize="1/2">
        <View style={{ backgroundColor: '#b2d4fe' }}>
          <Text style={styles.text}>Input 1</Text>
        </View>
      </Block>
      <Block xsSize="1/1" mdSize="1/2">
        <View style={{ backgroundColor: '#b2d4fe' }}>
          <Text style={styles.text}>Input 2</Text>
        </View>
      </Block>
      <Block xsSize="1/1" mdSize="1/2">
        <View style={{ backgroundColor: '#b2d4fe' }}>
          <Text style={styles.text}>Input 3</Text>
        </View>
      </Block>
      <Block xsSize="1/1" mdSize="1/2">
        <View style={{ backgroundColor: '#91c2fd' }}>
          <Text style={styles.text}>Input 4</Text>
        </View>
      </Block>
      <Block xsSize="1/1" mdSize="1/2">
        <View style={{ backgroundColor: '#91c2fd' }}>
          <Text style={styles.text}>Input 5</Text>
        </View>
      </Block>
      <Block xsSize="1/1" mdSize="1/2">
        <View style={{ backgroundColor: '#91c2fd' }}>
          <Text style={styles.text}>Input 6</Text>
        </View>
      </Block>
      <Block xsSize="1/1" mdSize="1/2">
        <View style={{ backgroundColor: '#91c2fd' }}>
          <Text style={styles.text}>Input 7</Text>
        </View>
      </Block>
      <Block xsSize="1/1" mdSize="1/2">
        <View style={{ backgroundColor: '#91c2fd' }}>
          <Text style={styles.text}>Input 8</Text>
        </View>
      </Block>
      <Block xsSize="1/1" mdSize="1/2">
        <View style={{ backgroundColor: '#91c2fd' }}>
          <Text style={styles.text}>Input 9</Text>
        </View>
      </Block>
      <Block xsSize="1/1" mdSize="1/2">
        <View style={{ backgroundColor: '#91c2fd' }}>
          <Text style={styles.text}>Input 10</Text>
        </View>
      </Block>
      <Block xsSize="1/1" mdSize="1/2">
        <View style={{ backgroundColor: '#91c2fd' }}>
          <Text style={styles.text}>Input 11</Text>
        </View>
      </Block>
      <Block xsSize="1/1" mdSize="1/2">
        <View style={{ backgroundColor: '#91c2fd' }}>
          <Text style={styles.text}>Input 12</Text>
        </View>
      </Block>
    </Section>
  </Grid>
);
