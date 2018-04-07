import React from 'react';
import PropTypes from 'prop-types';

import { checkInsideGrid } from '../../utils';


/**
 * Provides `width` and `height` of parent `Grid` container
 */
export class WithContainerDimensions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      containerWidth: 0,
      containerHeight: 0,
    };
  }
  componentDidMount() {
    this.context.containerSizeProvider.subscribe(this.handler);
  }

  componentWillUnmount() {
    this.context.containerSizeProvider.unsubscribe(this.handler);
  }

  handler = (width, height) => {
    // Only update component on change.
    if (height === this.state.containerHeight
      && width === this.state.containerWidth) {
      return;
    }

    this.setState({
      containerWidth: width,
      containerHeight: height,
    });
  }

  render() {
    return (
      this.props.children(this.state.containerWidth, this.state.containerHeight)
    );
  }
}

WithContainerDimensions.propTypes = {
  children: PropTypes.func.isRequired,
};

WithContainerDimensions.contextTypes = {
  containerSizeProvider: checkInsideGrid(PropTypes.shape({
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

