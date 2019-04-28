import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, Text } from 'react-native';

import { Block, Grid, Section } from '../../';

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#02326b',
    fontSize: 40,
    lineHeight: 80,
  },
  textSmall: {
    fontSize: 30,
    lineHeight: 40,
  },
});

storiesOf('react-native-responsive-layout', module)
  .add('Nested Grid', () => (
    <Grid>
      <Section>
        <Block size="1/2" style={{ backgroundColor: '#b2d4fe' }}>
          <Text style={styles.text}>
            1/2
          </Text>
          <Grid>
            <Section>
              <Block size="1/2" style={{ backgroundColor: '#80b9fd' }}>

                <Text style={[styles.text, styles.textSmall]}>
                1/2 of 1/2 {'\n'} is 1/4
                </Text>

              </Block>
            </Section>
          </Grid>

        </Block>
      </Section>
    </Grid>
  ));
