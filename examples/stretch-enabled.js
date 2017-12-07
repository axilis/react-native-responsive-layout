import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { Block, Grid, Section } from 'react-native-responsive-layout';

const styles = StyleSheet.create({
  text: {
    fontSize: 36,
    padding: 10,
    color: '#555',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default () => (
  <ScrollView contentContainerStyle={{ flex: 1 }}>
    {/* Ensure ScrollView content container is expanded as well. */}

    <Grid stretch >
      {/* This ensures grid sections and blocks are configured to stretch. */}

      <Section style={{ height: 80, flex: 0 }}>
        {/* Since by default Sections would stretch we need to override style
        them to stay fixed height. */}

        <Block>
          <View style={[{ backgroundColor: 'lightblue' }, styles.container]}>
            <Text style={styles.text}>Header</Text>
          </View>
        </Block>
      </Section>
      <Section>
        <Block size="1/4" mdSize="1" style={{ backgroundColor: '#fff5cc' }}>
          <View style={[{ backgroundColor: '#fff5cc' }, styles.container]}>
            <Text style={styles.text}>L</Text>
          </View>
        </Block>
        <Block size="auto" mdSize="1" style={{ backgroundColor: '#ffd633' }}>
          <View style={[{ backgroundColor: '#ffd633' }, styles.container]}>
            <Text style={styles.text}>Content</Text>
          </View>
        </Block>
      </Section>
      <Section style={{ height: 80, flex: 0 }}>
        <Block>
          <View style={[{ backgroundColor: 'yellowgreen' }, styles.container]}>
            <Text style={styles.text}>Footer</Text>
          </View>
        </Block>
      </Section>
    </Grid>
  </ScrollView>
);
