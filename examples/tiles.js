import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View } from 'react-native';

import { Block, Grid, Section } from 'react-native-responsive-layout';
import { GridDimensions, withGridDimensions } from 'react-native-responsive-layout/wrappers';
import { calculateStretchLength } from 'react-native-responsive-layout/utils';

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

export default () => (
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
);
