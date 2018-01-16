import React from 'react';
import PropTypes from 'prop-types';

import { checkInsideGrid } from '../../utils';


/**
 * Wraps provided component and provides `width` and `height` which are used
 * to determine sizing class - depending on `Grid` configuration that will be
 * either be window sizes or `Grid` component's size.
 *
 * @param { React.Component|function } Component
 */
const withContainerDimensions = (Component) => {
  class WithContainerDimensions extends React.Component {
    constructor() {
      super();

      this.state = {
        referenceHeight: 0,
        referenceWidth: 0,
      };

      this.handler = (width, height) => {
        // Only update component on change.
        if (this.referenceHeight === this.state.referenceHeight
          && this.referenceWidth === this.state.referenceWidth) {
          return;
        }

        this.setState({
          referenceWidth: width,
          referenceHeight: height,
        });
      };
    }

    componentWillMount() {
      this.context.referenceSizeProvider.subscribe(this.handler);
    }

    componentWillUnmount() {
      this.context.referenceSizeProvider.unsubscribe(this.handler);
    }


    render() {
      return (
        <Component
          width={this.state.referenceWidth}
          height={this.state.referenceHeight}
          {...this.props}
        />
      );
    }
  }

  const componentName = Component.displayName || Component.name || 'UnnamedComponent';
  WithContainerDimensions.displayName = `withContainerDimensions(${componentName})`;

  WithContainerDimensions.contextTypes = {
    referenceSizeProvider: checkInsideGrid(PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      unsubscribe: PropTypes.func.isRequired,
    })),
  };

  return WithContainerDimensions;
};

export default withContainerDimensions;
