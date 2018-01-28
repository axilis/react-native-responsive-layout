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
    lineHeight: 80,
  },
});

export default () => (
  <Grid stretch>
    {/* This ensures grid sections and blocks are configured to stretch. */}

    <Section style={{ height: 80, backgroundColor: '#d4e7fe', flex: 0 }}>
      {/* Since by default Sections would stretch we need to override their flex
      style in order for them to stay fixed height. */}

      <Block>
        <Text style={styles.text}>Header</Text>
      </Block>
    </Section>
    <Section>
      <Block size="1/4">
        <View style={[{ backgroundColor: '#b2d4fe' }, styles.flexibleContainer]}>
          {/* When nesting elements inside blocks, if you want them to be
          stretched do not forget to add flex: 1 */}

          <Text style={styles.text}>L</Text>
        </View>
      </Block>
      <Block size="stretch">
        <View style={[{ backgroundColor: '#91c2fd' }, styles.flexibleContainer]}>
          <Text style={styles.text}>Content</Text>
        </View>
      </Block>
    </Section>
    <Section style={{ height: 80, backgroundColor: '#6faffd', flex: 0 }}>
      <Block>
        <Text style={styles.text}>Footer</Text>
      </Block>
    </Section>
  </Grid>
);
