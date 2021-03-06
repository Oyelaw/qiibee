import React from 'react';
import { AppleSpinner } from './Spinners';

interface IProps {
  isSubmitting: boolean;
  text: string;
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
}

export default function Button(props: IProps) {
  const { isSubmitting, text, type, disabled } = props;

  //TODO, this should use inline styles at worst and be overwritten by the outside
  return (
    <div className="mt-3">
      <button
        type={type || 'submit'}
        className="btn btn-primary mr-2 mb-2 mb-md-0"
        disabled={isSubmitting || disabled}
        style={{ minWidth: '150px', minHeight: '40px' }}
      >
        {isSubmitting ? (
          <span>
            <AppleSpinner />
            <span style={{ marginLeft: 10, display: 'inline', fontFamily: 'inherit' }}>Loading...</span>
          </span>
        ) : (
          text
        )}
      </button>
    </div>
  );
}
