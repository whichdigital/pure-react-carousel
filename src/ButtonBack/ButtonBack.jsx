import React from 'react';
import PropTypes from 'prop-types';
import { CarouselPropTypes, cn } from '../helpers';
import s from './ButtonBack.scss';

class ButtonBack extends React.Component {

  static setDisabled(disabled, currentSlide, infinite) {
    if (disabled !== null) return disabled;
    if (currentSlide === 0 && !infinite) return true;
    return false;
  }

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(ev) {
    const {
      carouselStore, currentSlide, onClick, step, infinite, visibleSlides, totalSlides,
    } = this.props;

    const maxSlide = totalSlides - visibleSlides;

    let newCurrentSlide = Math.max(
      currentSlide - step,
      0,
    );

    if (infinite) {
      const isOnFirstSlide = currentSlide === 0;
      newCurrentSlide = isOnFirstSlide ? maxSlide : newCurrentSlide;
    }

    carouselStore.setStoreState(
      {
        currentSlide: newCurrentSlide,
        isPlaying: false,
      },
      onClick !== null && onClick.call(this, ev),
    );
  }

  render() {
    const {
      carouselStore: _carouselStore,
      className,
      currentSlide: _currentSlide,
      disabled: _disabled,
      onClick: _onClick,
      step: _step,
      totalSlides: _totalSlides,
      visibleSlides: _visibleSlides,
      infinite,
      ...props
    } = this.props;

    const newClassName = cn([s.buttonBack, 'carousel__back-button', className]);
    const isDisabled = ButtonBack.setDisabled(
      this.props.disabled,
      this.props.currentSlide,
      infinite,
    );

    return (
      <button
        type="button"
        aria-label="previous"
        className={newClassName}
        onClick={this.handleOnClick}
        disabled={isDisabled}
        {...props}
      >
        {this.props.children}
      </button>
    );
  }
}

ButtonBack.propTypes = {
  carouselStore: PropTypes.object.isRequired,
  children: CarouselPropTypes.children.isRequired,
  className: PropTypes.string,
  currentSlide: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  step: PropTypes.number.isRequired,
  totalSlides: PropTypes.number.isRequired,
  visibleSlides: PropTypes.number.isRequired,
  infinite: PropTypes.bool,
};

ButtonBack.defaultProps = {
  className: null,
  disabled: null,
  onClick: null,
  infinite: false,
};

export default ButtonBack;
