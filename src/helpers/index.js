import PropTypes from 'prop-types';

export function cn(a) {
  return a.map((b) => {
    if (b === false) return null;
    return b;
  }).join(' ').replace(/\s+/g, ' ').trim();
}

export function randomHexColor() {
   
  return `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
}

export function slideUnit(visibleSlides = 1) {
  return 100 / visibleSlides;
}

export function slideSize(totalSlides, visibleSlides) {
  return ((100 / totalSlides) * visibleSlides) / visibleSlides;
}

export function slideTraySize(totalSlides, visibleSlides) {
  return (100 * totalSlides) / visibleSlides;
}

export function pct(num) {
  return `${num}%`;
}

export const LOADING = 'loading';
export const SUCCESS = 'success';
export const ERROR = 'error';

export const CarouselPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  direction: PropTypes.oneOf(['forward', 'backward']),
  height: (props, propName) => {
    const prop = props[propName];
    if (props.orientation === 'vertical' && (prop === null || typeof prop !== 'number')) {
      return new Error(`Missing required property '${propName}' when orientation is vertical.  You must supply a number representing the height in pixels`);
    }
    return null;
  },
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  isBgImage: (props, propName) => {
    const value = props[propName];
    if (value === true && props.tag === 'img') {
      return new Error(`HTML img elements should not have a backgroundImage.  Please use ${propName} for other block-level HTML tags, like div, a, section, etc...`);
    }
    return null;
  },
};

/**
 * Cap a value at a minimum value and a maximum value.
 * @param  {number} min The smallest allowed value.
 * @param  {number} max The largest allowed value.
 * @param  {number} x   A value.
 * @return {number}     Either the original value, the minimum value, or the maximum value.
 */
export const boundedRange = ({ min, max, x }) => Math.min(
  max,
  Math.max(min, x),
);

// Safe merge utilities for React 19 compatibility
export const safeArrayMerge = (destination, source) => source;

export const safeMergeOptions = {
  arrayMerge: safeArrayMerge,
  clone: false,
  customMerge: (key) => {
    if (key === '$$typeof' || key === '_owner' || key === '_store' || key === 'ref' || key === 'key') {
      return (target, source) => source;
    }
    return undefined;
  },
};

// Export our custom object merge utility
export { deepMerge, deepClone } from './objectMerge';
