import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Block, Grid, Section } from 'react-native-responsive-layout';

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#02326b',
    fontSize: 40,
  },
});

export default () => (
  <Grid>
    <Section style={{ height: 80, backgroundColor: '#d4e7fe' }}>
      <Block>
        <Text style={styles.text}>Header</Text>
      </Block>
    </Section>
    <Section>
      <Block size="1/4">
        <View>
          <View style={{ backgroundColor: '#b2d4fe' }}>
            <Text style={styles.text}>L</Text>
          </View>
        </View>
      </Block>
      <Block size="stretch">
        <View>
          <View style={{ backgroundColor: '#91c2fd' }}>
            <Text style={styles.text}>Content</Text>
          </View>
        </View>
      </Block>
    </Section>
    <Section style={{ height: 80, backgroundColor: '#6faffd' }}>
      <Block>
        <Text style={styles.text}>Footer</Text>
      </Block>
    </Section>
  </Grid>
);
