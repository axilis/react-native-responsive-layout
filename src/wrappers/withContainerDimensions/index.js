import React from 'react';
import PropTypes from 'prop-types';

import { checkInsideGrid } from '../../utils';


/**
 * Provides `width` and `height` which are used to determine
 * sizing class - depending on `Grid` configuration that will be
 * either be window sizes or `Grid` component's size.
 */
export class WithContainerDimensions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      referenceHeight: 0,
      referenceWidth: 0,
    };
  }
  componentDidMount() {
    this.context.referenceSizeProvider.subscribe(this.handler);
  }

  componentWillUnmount() {
    this.context.referenceSizeProvider.unsubscribe(this.handler);
  }

  handler = (width, height) => {
    // Only update component on change.
    if (height === this.state.referenceHeight
      && width === this.state.referenceWidth) {
      return;
    }

    this.setState({
      referenceWidth: width,
      referenceHeight: height,
    });
  }

  render() {
    return (
      this.props.children(this.state.referenceWidth, this.state.referenceHeight)
    );
  }
}

WithContainerDimensions.propTypes = {
  children: PropTypes.func.isRequired,
};

WithContainerDimensions.contextTypes = {
  referenceSizeProvider: checkInsideGrid(PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  })),
};


export const withContainerDimensions = (Component) => {
  const withContainerDimensionsWrapped = props => (
    <WithContainerDimensions>
      {(width, height) => (<Component width={width} height={height} {...props} />)}
    </WithContainerDimensions>);

  const componentName = Component.displayName || Component.name || 'UnnamedComponent';
  withContainerDimensionsWrapped.displayName = `withContainerDimensions(${componentName})`;

  return withContainerDimensionsWrapped;
};

