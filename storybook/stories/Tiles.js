import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScrollView, Text, View } from 'react-native';

import { Block, Grid, Section } from '../../';
import { GridDimensions, withGridDimensions } from '../../wrappers';
import { calculateStretchLength } from './../../utils';

/* eslint-disable-next-line */
const CardFaCC = ({ style }) => (
  <GridDimensions>
    {({ width }) => {
      const l = calculateStretchLength(width, 120);
      return (
        <View style={[style, { width: l, height: l }]} />
      );
    }}
  </GridDimensions>
);

const CardHOC = withGridDimensions(({ width, style }) => {
  const l = calculateStretchLength(width, 120);
  return (
    <View style={[style, { width: l, height: l }]} />
  );
});

storiesOf('react-native-responsive-layout', module)
  .add('Tiles', () => (
    <ScrollView>
      <Grid>
        {/* You can also use Sections to group multiple cards together.  */}
        <Section>
          <Block>
            <Text style={{ margin: 5, fontSize: 16 }}>First Heading</Text>
          </Block>
          <CardFaCC style={{ backgroundColor: '#eee' }} />
          <CardFaCC style={{ backgroundColor: '#ddd' }} />
          <CardFaCC style={{ backgroundColor: '#ccc' }} />
        </Section>
        <Section>
          <Block>
            <Text style={{ margin: 5, fontSize: 16 }}>Second Heading</Text>
          </Block>
          <CardHOC style={{ backgroundColor: '#bbb' }} />
          <CardHOC style={{ backgroundColor: '#aaa' }} />
          <CardHOC style={{ backgroundColor: '#999' }} />
          <CardHOC style={{ backgroundColor: '#888' }} />
          <CardHOC style={{ backgroundColor: '#777' }} />
          <CardHOC style={{ backgroundColor: '#666' }} />
          <CardHOC style={{ backgroundColor: '#555' }} />
          <CardHOC style={{ backgroundColor: '#444' }} />
          <CardHOC style={{ backgroundColor: '#333' }} />
          <CardHOC style={{ backgroundColor: '#222' }} />
        </Section>
      </Grid>
    </ScrollView>
  ));
