import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../helpers';
import s from './ButtonPlay.scss';

const ButtonPlay = class ButtonPlay extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(ev) {
    const { onClick } = this.props;
    this.props.carouselStore.setStoreState({
      isPlaying: !this.props.isPlaying,
    }, onClick !== null && onClick.call(this, ev));
  }

  render() {
    const {
      carouselStore: _carouselStore,
      children: _children,
      childrenPaused,
      childrenPlaying,
      className,
      isPlaying,
      onClick: _onClick,
      ...props
    } = this.props;

    const newClassName = cn([
      s.buttonNext,
      'carousel__play-button',
      className,
    ]);

    return (
      <button
        type="button"
        aria-label="play"
        className={newClassName}
        onClick={this.handleOnClick}
        {...props}
      >
        {isPlaying && childrenPlaying}
        {!isPlaying && childrenPaused}
        {this.props.children}
      </button>
    );
  }
};

ButtonPlay.propTypes = {
    carouselStore: PropTypes.object.isRequired,
    children: PropTypes.node,
    childrenPaused: PropTypes.node,
    childrenPlaying: PropTypes.node,
    className: PropTypes.string,
    isPlaying: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
  };

ButtonPlay.defaultProps = {
    children: null,
    childrenPaused: null,
    childrenPlaying: null,
    className: null,
    onClick: null,
  };

export default ButtonPlay;
