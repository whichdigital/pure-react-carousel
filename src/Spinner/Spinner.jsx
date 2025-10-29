import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../helpers';
import s from './Spinner.scss';

const Spinner = class Spinner extends React.PureComponent {

  render() {
    const { className, ...filteredProps } = this.props;
    const newClassName = cn([s.spinner, 'carousel__spinner', className]);
    return (
      <div className={newClassName} {...filteredProps} />
    );
  }
};

Spinner.propTypes = {
    className: PropTypes.string,
  };

Spinner.defaultProps = {
    className: null,
  };

export default Spinner;
