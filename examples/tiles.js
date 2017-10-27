import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Block, Grid, Section } from 'react-native-responsive-layout/';
import { withContainerDimensions } from 'react-native-responsive-layout/wrappers';
import { calculateStretchLength } from 'react-native-responsive-layout/utils';

const Card = withContainerDimensions(({ width, style }) => {
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
        <Card style={{ backgroundColor: '#eee' }} />
        <Card style={{ backgroundColor: '#ddd' }} />
        <Card style={{ backgroundColor: '#ccc' }} />
      </Section>
      <Section>
        <Block>
          <Text style={{ margin: 5, fontSize: 16 }}>Second Heading</Text>
        </Block>
        <Card style={{ backgroundColor: '#bbb' }} />
        <Card style={{ backgroundColor: '#aaa' }} />
        <Card style={{ backgroundColor: '#999' }} />
        <Card style={{ backgroundColor: '#888' }} />
        <Card style={{ backgroundColor: '#777' }} />
        <Card style={{ backgroundColor: '#666' }} />
        <Card style={{ backgroundColor: '#555' }} />
        <Card style={{ backgroundColor: '#444' }} />
        <Card style={{ backgroundColor: '#333' }} />
        <Card style={{ backgroundColor: '#222' }} />
      </Section>
    </Grid>
  </ScrollView>
);
