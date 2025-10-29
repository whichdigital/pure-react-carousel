import React from 'react';
import equal from 'equals';
import { CarouselPropTypes } from '../helpers';
import { CarouselContext } from '../CarouselProvider';

export default function WithStore(
  WrappedComponent,
  /* istanbul ignore next */ mapStateToProps = () => ({}),
) {
  class Wrapper extends React.Component {
    static contextType = CarouselContext

    constructor(props, context) {
      super(props, context);
      if (!context) {
        throw new Error(
          'WithStore component must be used within a CarouselProvider. ' +
          'Make sure your component is wrapped in a <CarouselProvider>.'
        );
      }
      this.state = mapStateToProps({ ...context.state });
      this.updateStateProps = this.updateStateProps.bind(this);
    }

    componentDidMount() {
      if (this.context) {
        this.context.subscribe(this.updateStateProps);
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      const test = !equal(nextState, this.state) || !equal(nextProps, this.props);
      return test;
    }

    componentWillUnmount() {
      if (this.context) {
        this.context.unsubscribe(this.updateStateProps);
      }
    }

    updateStateProps() {
      if (this.context) {
        this.setState(mapStateToProps({ ...this.context.state }));
      }
    }

    render() {
      // Use shallow merge for React props to avoid circular references
      const props = { ...this.state, ...this.props };

      if (!this.context) {
        throw new Error(
          'WithStore component must be used within a CarouselProvider. ' +
          'Make sure your component is wrapped in a <CarouselProvider>.'
        );
      }

      return (
        <WrappedComponent
          ref={(el) => {
            this.instance = el;
          }} // allows access to refs in wrapped components.
          {...props}
          carouselStore={{
            getStoreState: this.context.getStoreState,
            masterSpinnerError: this.context.masterSpinnerError,
            masterSpinnerSuccess: this.context.masterSpinnerSuccess,
            setStoreState: this.context.setStoreState,
            subscribeMasterSpinner: this.context.subscribeMasterSpinner,
            unsubscribeAllMasterSpinner: this.context.unsubscribeAllMasterSpinner,
            unsubscribeMasterSpinner: this.context.unsubscribeMasterSpinner,
          }}
        >
          {this.props.children}
        </WrappedComponent>
      );
    }
  }

  Wrapper.propTypes = {
    children: CarouselPropTypes.children,
  };

  Wrapper.defaultProps = {
    children: null,
  };

  return Wrapper;
}
