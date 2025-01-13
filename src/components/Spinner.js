import styles from '../styles/components/Spinner.module.css';
import React from 'react';
import classNames from 'classnames';

const Spinner = ({ size = '' }) => (
  <span
    className={classNames(
      size === 'sm' ? styles['spinner-sm'] : styles.spinner
    )}
  />
);

export default Spinner;
