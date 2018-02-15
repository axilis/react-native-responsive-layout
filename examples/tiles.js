import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Block, Grid, Section } from 'react-native-responsive-layout';
import { WithContainerDimensions, withContainerDimensions } from 'react-native-responsive-layout/wrappers';
import { calculateStretchLength } from 'react-native-responsive-layout/utils';

const Card = ({style}) => (
  <WithContainerDimensions>{(width)=>{
    const l = calculateStretchLength(width, 120);
    return (
      <View style={[style,{ width: l, height: l }]} />
    )
  }}
  </WithContainerDimensions>
);

const WrappedCard = withContainerDimensions(({ width, style }) => {
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
        <WrappedCard style={{ backgroundColor: '#bbb' }} />
        <WrappedCard style={{ backgroundColor: '#aaa' }} />
        <WrappedCard style={{ backgroundColor: '#999' }} />
        <WrappedCard style={{ backgroundColor: '#888' }} />
        <WrappedCard style={{ backgroundColor: '#777' }} />
        <WrappedCard style={{ backgroundColor: '#666' }} />
        <WrappedCard style={{ backgroundColor: '#555' }} />
        <WrappedCard style={{ backgroundColor: '#444' }} />
        <WrappedCard style={{ backgroundColor: '#333' }} />
        <WrappedCard style={{ backgroundColor: '#222' }} />
      </Section>
    </Grid>
  </ScrollView>
);
