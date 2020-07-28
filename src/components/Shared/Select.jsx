import React, { Fragment } from 'react';
import ReactSelect from 'react-select';

const styles = {
  placeholder: (base) => ({
    ...base,
    fontSize: '1rem',
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: '1rem',
    color: '#495057'
  }),
  menuList: (base) => ({
    ...base,
    fontSize: '1rem',
    color: '#495057'
  }),
  control: (base, state) => ({
    ...base,
    boxShadow: state.isFocused ? state.selectProps.isInvalid ? "0 0 0 0.2rem rgba(220,53,69,.25)" : "0 0 0 0.2rem rgba(0, 123, 255, 0.25)" : 0,
    borderColor: state.selectProps.isInvalid ? "#dc3545" : state.isFocused ? "#80bdff" : "#CED4DA",
    "&:hover": {
      borderColor: state.selectProps.isInvalid ? "#dc3545" : state.isFocused ? "#80bdff" : "#CED4DA"
    }
  })
}

const Select = (props) => (
  <Fragment>
    <ReactSelect styles={styles} {...props} />
    {props.isInvalid && (
      <div className="custom-input-error">
        {props.isInvalid.message}
      </div>
    )}
  </Fragment>
);

export default Select;