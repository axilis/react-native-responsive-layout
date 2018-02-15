import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import { Grid, Section, Block } from 'react-native-responsive-layout';
import { WithContainerDimensions } from 'react-native-responsive-layout/wrappers';

const styles = StyleSheet.create({
  text: {
    fontSize: 36,
    padding: 15,
    color: '#333',
    textAlign: 'center',
  },
  toolbar: {
    height: 100,
    width: '100%',
    backgroundColor: '#DDD',
    justifyContent: 'center',
  },
});

// Our original component is provided with original props and it will
// additionally receive width and height once rendered inside grid.
// Default values are fallback if rendered outside grid.
const Info = () => (
  <WithContainerDimensions>{(width, height) => (<Text>{width}pt x {height}pt</Text>)}</WithContainerDimensions>
);

Info.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default () => (
  <View>
    <View style={styles.toolbar}>
      <Text style={styles.text}>Header</Text>
    </View>
    <Grid relativeTo="self" >
      <Section>
        <Block>

          {/* When nesting grids, withContainerDimensions points to first
              parent's relative object */}
          <Grid relativeTo="self">
            <Section>
              <Block size="1/2">
                <View style={[{ backgroundColor: '#BBB' }]}>
                  <Info />
                </View>
              </Block>
              <Block size="1/2">
                <View style={[{ backgroundColor: '#999' }]}>
                  <Info />
                </View>
              </Block>
            </Section>
          </Grid>

        </Block>
      </Section>
      <Section>
        <Block>
          <View style={[{ backgroundColor: '#777' }, styles.container]}>
            <DimensionInfo />
          </View>
        </Block>
      </Section>
    </Grid>
  </View>
);
