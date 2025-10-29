import React from 'react';
import PropTypes from 'prop-types';
import { CarouselPropTypes, cn, pct } from '../helpers';
import s from './Slide.scss';

const Slide = class Slide extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.state = {
      focused: false,
    };
  }

  isVisible() {
    const { currentSlide, index, visibleSlides } = this.props;
    return index >= currentSlide && index < currentSlide + visibleSlides;
  }

  handleOnFocus(ev) {
    const { onFocus } = this.props;

    this.setState({
      focused: true,
    }, () => {
      if (onFocus !== null) { onFocus.call(this, ev); }
    });
  }

  handleOnBlur(ev) {
    const { onBlur } = this.props;

    this.setState({
      focused: false,
    }, () => {
      if (onBlur !== null) { onBlur.call(this, ev); }
    });
  }

  renderFocusRing() {
    if (this.state.focused) return <div className={[s.focusRing, 'carousel__slide-focus-ring'].join(' ')} />;
    return null;
  }

  render() {
    const {
      ariaLabel,
      carouselStore: _carouselStore,
      children: _children,
      className,
      classNameHidden,
      classNameVisible,
      currentSlide: _currentSlide,
      index: _index,
      innerClassName,
      innerTag: InnerTag,
      naturalSlideHeight,
      naturalSlideWidth,
      onBlur: _onBlur,
      onFocus: _onFocus,
      orientation,
      slideSize,
      style,
      tag: Tag,
      totalSlides,
      visibleSlides: _visibleSlides,
      isIntrinsicHeight,
      ...props
    } = this.props;

    const tempStyle = {};

    if (orientation === 'horizontal') {
      tempStyle.width = pct(slideSize);
      tempStyle.paddingBottom = pct((naturalSlideHeight * 100) / (naturalSlideWidth * totalSlides));
    } else {
      tempStyle.width = pct(100);
      tempStyle.paddingBottom = pct((naturalSlideHeight * 100) / naturalSlideWidth);
    }

    const innerStyle = {};
    if (isIntrinsicHeight) {
      if (orientation === 'horizontal') {
        tempStyle.height = 'unset';
      } else {
        tempStyle.width = 'unset';
      }
      tempStyle.paddingBottom = 'unset';
      innerStyle.position = 'unset';
    }

    const newStyle = Object.assign({}, tempStyle, style);

    const isVisible = this.isVisible();

    const newClassName = cn([
      s.slide,
      orientation === 'horizontal' && s.slideHorizontal,
      'carousel__slide',
      this.state.focused && 'carousel__slide--focused',
      isVisible && classNameVisible,
      isVisible && 'carousel__slide--visible',
      !isVisible && classNameHidden,
      !isVisible && 'carousel__slide--hidden',
      className,
    ]);

    const newInnerClassName = cn([
      s.slideInner,
      'carousel__inner-slide',
      innerClassName,
    ]);

    return (
      <Tag
        ref={(el) => { this.tagRef = el; }}
        aria-selected={this.isVisible()}
        aria-label={ariaLabel}
        role={this.props.role}
        onFocus={this.handleOnFocus}
        onBlur={this.handleOnBlur}
        className={newClassName}
        style={newStyle}
        {...props}
      >
        <InnerTag
          ref={(el) => { this.innerTagRef = el; }}
          className={newInnerClassName}
          style={innerStyle}
        >
          {this.props.children}
          {this.renderFocusRing()}
        </InnerTag>
      </Tag>
    );
  }
};

Slide.propTypes = {
    ariaLabel: PropTypes.string,
    carouselStore: PropTypes.object,
    children: CarouselPropTypes.children,
    className: PropTypes.string,
    classNameHidden: PropTypes.string,
    classNameVisible: PropTypes.string,
    currentSlide: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    innerClassName: PropTypes.string,
    innerTag: PropTypes.string,
    naturalSlideHeight: PropTypes.number.isRequired,
    naturalSlideWidth: PropTypes.number.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    orientation: CarouselPropTypes.orientation.isRequired,
    slideSize: PropTypes.number.isRequired,
    role: PropTypes.string,
    style: PropTypes.object,
    tag: PropTypes.string,
    totalSlides: PropTypes.number.isRequired,
    visibleSlides: PropTypes.number.isRequired,
    isIntrinsicHeight: PropTypes.bool,
  };

Slide.defaultProps = {
  ariaLabel: 'slide',
  carouselStore: null,
  children: null,
  className: null,
  classNameHidden: null,
  classNameVisible: null,
  innerClassName: null,
  innerTag: 'div',
  onBlur: null,
  onFocus: null,
  role: 'option',
  style: {},
  tag: 'div',
  isIntrinsicHeight: false,
};

export default Slide;
