import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { Grid, Section, Block } from 'react-native-responsive-layout';
import { GridDimensions, withGridDimensions } from 'react-native-responsive-layout/wrappers';
import { renderComponent } from 'recompose';

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

class Blocker extends React.Component {
  shouldComponentUpdate(nextState, nextProps, nextContext) {
    return this.context.gridSizeClass === nextContext.gridSizeClass;
  }

  render() {
    return <View>{this.props.children}</View>;
  }
}

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


class Cmp extends React.Component {

  state = {};

  render() {

    return (
      <View>
        <View style={styles.toolbar}>
          <Text style={styles.text}>Header</Text>
        </View>
        <Grid relativeTo="self" name="S1">
          <Blocker>
          <Section>
            <Block smSize="1" mdSize="1/2" lgSize="1/3">
              <View style={[{ backgroundColor: '#F00' }]}>
                <InfoFaCC />
              </View>
            </Block>
            <Block>

              {/* When nesting grids, withGridDimensions and GridDimensions point to first
                  parent's relative object */}
              <Grid relativeTo="parent" name="P2">
                <Section>
                  <Block size="1/2">
                    <View style={[{ backgroundColor: '#BBB' }]}>
                      <InfoHOC />
                    </View>
                  </Block>
                  <Block size="1/2">
                    <View style={[{ backgroundColor: '#999' }]}>


                      { this.state.visible && (
                        <Grid relativeTo="window" name="W3">
                          <Section>
                            <Block smSize="1" mdSize="1/2" lgSize="1/3">
                              <View style={[{ backgroundColor: '#999' }]}>
                                <Text style={styles.text}>A</Text>
                              </View>
                            </Block>
                            <Block>

                              <Grid relativeTo="parent" name="P4">
                                <Section>
                                  <Block size="1/2">
                                    <View style={[{ backgroundColor: '#BBB' }]}>
                                      {/* <InfoHOC /> */}
                                    </View>
                                  </Block>
                                  <Block size="1/2">
                                    <View style={[{ backgroundColor: '#999' }]}>
                                      {/* <InfoFaCC /> */}
                                    </View>
                                  </Block>
                                </Section>
                              </Grid>

                            </Block>
                          </Section>
                          <Section>
                            <Block>
                              <View style={[{ backgroundColor: '#777' }]}>
                                <Text style={styles.text}>B</Text>
                              </View>
                            </Block>
                          </Section>
                        </Grid>
                      )}

                    </View>
                  </Block>
                </Section>
              </Grid>

            </Block>
          </Section>
          <Section>
            <Block>
              <Button onPress={() => this.setState(state => ({ visible: !state.visible }))} title="toggle" />
              <View style={[{ backgroundColor: '#777' }]}>
                <InfoHOC />
              </View>
            </Block>
          </Section>
          </Blocker>
        </Grid>
      </View>
    );
  }
}

export default Cmp;
