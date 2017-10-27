import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Grid, Section, Block } from 'react-native-responsive-layout';
import { withContainerDimensions } from 'react-native-responsive-layout/wrappers';

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
const Info = ({ width = 0, height = 0, ...props }) => (
  <Text style={styles.text}>{width}pt x {height}pt</Text>
);

// This wrapper will inject width and height to our component.
const DimensionInfo = withContainerDimensions(Info);

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

                  {/* Note that we render wrapped component. */}
                  <DimensionInfo />
                </View>
              </Block>
              <Block size="1/2">
                <View style={[{ backgroundColor: '#999' }]}>
                  <DimensionInfo />
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
