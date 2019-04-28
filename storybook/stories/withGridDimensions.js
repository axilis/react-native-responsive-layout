import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Grid, Section, Block } from '../../';
import { GridDimensions, withGridDimensions } from '../../wrappers';

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
const InfoHOC = withGridDimensions(({ width, height }) => (
  <Text style={styles.text}>
    {width}pt x {height}pt
  </Text>
));

// Same component implemented using function as child component pattern.
const InfoFaCC = () => (
  <GridDimensions>
    {({ width, height }) => (
      <Text style={styles.text}>
        {width}pt x {height}pt
      </Text>
    )}
  </GridDimensions>
);


storiesOf('react-native-responsive-layout', module)
  .add('withGridDimensions', () => (
    <View>
      <View style={styles.toolbar}>
        <Text style={styles.text}>Header</Text>
      </View>
      <Grid relativeTo="self" >
        <Section>
          <Block>

            {/* When nesting grids, withGridDimensions and GridDimensions point to first
              parent's relative object */}
            <Grid relativeTo="self">
              <Section>
                <Block size="1/2">
                  <View style={[{ backgroundColor: '#BBB' }]}>
                    <InfoHOC />
                  </View>
                </Block>
                <Block size="1/2">
                  <View style={[{ backgroundColor: '#999' }]}>
                    <InfoFaCC />
                  </View>
                </Block>
              </Section>
            </Grid>

          </Block>
        </Section>
        <Section>
          <Block>
            <View style={[{ backgroundColor: '#777' }]}>
              <InfoHOC />
            </View>
          </Block>
        </Section>
      </Grid>
    </View>
  ));
