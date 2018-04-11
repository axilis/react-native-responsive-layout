import React from 'react';
import PropTypes from 'prop-types';

import { checkInsideGrid, warn } from '../../utils';


/**
 * Provides `width` and `height` of parent `Grid` container
 */
export class GridDimensions extends React.Component {
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
    return this.props.children({
      width: this.state.containerWidth,
      height: this.state.containerHeight
    });
  }
}

GridDimensions.propTypes = {
  children: PropTypes.func.isRequired,
};

GridDimensions.contextTypes = {
  containerSizeProvider: checkInsideGrid(PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  })),
};


export const withGridDimensions = (Component) => {
  const wrappedComponent = props => (
    <GridDimensions>
      {({ width, height }) => (
        <Component
          width={width}
          height={height}
          {...props}
        />
      )}
    </GridDimensions>
  );

  const componentName = Component.displayName || Component.name || 'UnnamedComponent';
  wrappedComponent.displayName = `withGridDimensions(${componentName})`;

  return wrappedComponent;
};

export const withContainerDimensions = (Component) => {
  if (process.env.NODE_ENV === 'development') {
    warn(
      true,
      'We deprecated `withContainerDimensions` HOC and replaced it with `withGridDimensions`. You should either use the new HOC or equivalent `GridDimensions` FaCC.',
    );
  }
  return withGridDimensions(Component);
}
