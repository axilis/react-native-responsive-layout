import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Block, Grid, Section } from 'react-native-responsive-layout';

const styles = StyleSheet.create({
  flexibleContainer: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    color: '#02326b',
    fontSize: 40,
  },
});

export default () => (
  <Grid stretch>
    {/* This ensures grid sections and blocks are configured to stretch. */}

    <Section stretch={false}>
      {/* By default Sections would be stretched so we need to override them to be fixed height. */}
      <Block>
        <View style={{ height: 80, backgroundColor: '#d4e7fe' }}>
          <Text style={styles.text}>Header</Text>
        </View>
      </Block>
    </Section>
    <Section>
      <Block size="1/4">
        <View style={[{ backgroundColor: '#b2d4fe' }, styles.flexibleContainer]}>
          {/* When nesting elements inside stretched section blocks, if you want
           them to fill space do not forget to add flex: 1 */}

          <Text style={styles.text}>L</Text>
        </View>
      </Block>
      <Block size="auto">
        <View style={[{ backgroundColor: '#91c2fd' }, styles.flexibleContainer]}>
          <Text style={styles.text}>Content</Text>
        </View>
      </Block>
    </Section>
    <Section stretch={false}>
      <Block>
        <View style={{ height: 80, backgroundColor: '#6faffd' }}>
          <Text style={styles.text}>Footer</Text>
        </View>
      </Block>
    </Section>
  </Grid>
);
