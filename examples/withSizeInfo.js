import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Grid, Section, Block } from 'react-native-responsive-layout';
import { SizeInfo, withSizeInfo } from 'react-native-responsive-layout/wrappers';

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 15,
    color: '#333',
    textAlign: 'center',
  },
  smallButton: {
    padding: 5,
    backgroundColor: '#eee',
    margin: 5,
    marginBottom: 0,
  },
  mediumButton: {
    padding: 15,
    backgroundColor: '#aaa',
    margin: 10,
    marginBottom: 0,
  },
  largeButton: {
    padding: 25,
    backgroundColor: '#666',
    margin: 15,
    marginBottom: 0,
  },
});

const ResponsiveButtonHOC = withSizeInfo(({ sizeSelector, ...props }) => {
  const style = sizeSelector({
    xs: styles.smallButton,
    sm: styles.mediumButton,
    md: styles.largeButton,
  });
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={style}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
});

const ResponsiveButtonFaCC = props => (
  <SizeInfo>
    {({ sizeSelector }) => {
      const style = sizeSelector({
        xs: styles.smallButton,
        sm: styles.mediumButton,
        md: styles.largeButton,
      });
      return (
        <TouchableOpacity onPress={props.onPress}>
          <View style={style}>
            <Text style={styles.text}>{props.title}</Text>
          </View>
        </TouchableOpacity>
      );
    }}
  </SizeInfo>
);


export default () => (
  <View>
    <Grid>
      <Section>
        <Block>
          <ResponsiveButtonHOC title="First button" onPress={() => { }} />
          <ResponsiveButtonFaCC title="Second button" onPress={() => { }} />
          <ResponsiveButtonHOC title="Third button" onPress={() => { }} />
          <ResponsiveButtonFaCC title="Fourth button" onPress={() => { }} />
        </Block>
      </Section>
    </Grid>
  </View>
);
