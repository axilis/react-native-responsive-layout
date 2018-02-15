import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Grid, Section, Block } from 'react-native-responsive-layout';
import { withSizeClass } from 'react-native-responsive-layout/wrappers';

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

const ResponsiveButton = withSizeClass((props) => {
  const style = props.sizeSelector({
    xs: styles.smallButton,
    sm: styles.mediumButton,
    md: styles.largeButton,
  });
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[style, props.containerStyle]}>
        <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default () => (
  <View>
    <Grid>
      <Section>
        <Block>
          <ResponsiveButton title="First button" />
          <ResponsiveButton title="Second button" />
          <ResponsiveButton title="Third button" />
          <WithSizeClass>{
          (size, sizeSelector) => {
            const style = props.sizeSelector({
              xs: styles.smallButton,
              sm: styles.mediumButton,
              md: styles.largeButton,
            });
            return (
              <TouchableOpacity onPress={props.onPress}>
                <View style={[style, props.containerStyle]}>
                  <Text style={[styles.text, props.textStyle]}>{"Fourth button"}</Text>
                </View>
              </TouchableOpacity>
            );
          }
        }</WithSizeClass>
        </Block>
      </Section>
    </Grid>
  </View>
);
