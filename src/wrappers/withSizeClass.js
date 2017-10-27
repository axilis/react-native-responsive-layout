import React from 'react';
import PropTypes from 'prop-types';
import { BREAKPOINTS } from '../shared';
import { ContainerSizeProp } from '../shared/props';

/**
 * Determines orientation from width and height, it doesn't necessarily match
 * real device orientation if it is used in grid that is related to self.
 */
export const determineOrientation = (width, height) => (
  (width <= height) ? 'PORTRAIT' : 'LANDSCAPE'
);

/**
 * Selects value from props that closest matches sizeClass starting from
 * smallest to largest.
 */
export const getSize = (sizeClass, props, sizes = BREAKPOINTS) => {
  let relevantData = props[sizes[0]] || undefined;

  for (let i = 0; i < sizes.length; i += 1) {
    const size = sizes[i];

    // Ensure that key is updated on each size that is before.
    if (Object.prototype.hasOwnProperty.call(props, size)) {
      relevantData = props[size];
    }

    // If matched current size, early return to stop further iteration.
    if (sizeClass === size) {
      return relevantData;
    }
  }

  return relevantData;
};


/**
 * Wraps provided component and provides:
 * - `size` - which corresponds to currently active size of grid
 * - `orientation` - which corresponds to orientation of grid
 * - `sizeSelector` - function which takes object that contains sizes as keys
 *  and returns closest size that is relevant, this enables style selection to
 *  match grid size
 *
 * @param { React.Component|function } Component
 */
const withSizeClass = (Component) => {
  class WithSize extends React.Component {
    constructor() {
      super();

      this.state = {
        referenceHeight: 0,
        referenceWidth: 0,
      };

      this.handler = (width, height) => {
        // Only update component on change.
        if (this.referenceHeight === this.state.referenceHeight
          || this.referenceWidth === this.state.referenceWidth) {
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
      const { containerSizeClass } = this.context;
      const { referenceHeight, referenceWidth } = this.state;

      return (
        <Component
          size={containerSizeClass}
          sizeSelector={values => getSize(containerSizeClass, values)}
          orientation={determineOrientation(referenceWidth, referenceHeight)}
          {...this.props}
        />
      );
    }
  }

  WithSize.contextTypes = {
    containerSizeClass: ContainerSizeProp,
    referenceSizeProvider: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      unsubscribe: PropTypes.func.isRequired,
    }),
  };

  return WithSize;
};

export default withSizeClass;
