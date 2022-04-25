import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const {
    placeholder,
    onChange,
    value,
    id,
    type,
    width,
    padding,
    margin,
    size,
  } = props;

  const style = {
    width,
    padding,
    margin,
    size,
  };

  return (
    <React.Fragment>
      <ElInput
        {...style}
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

Input.defaultProps = {
  placeholder: null,
  label: null,
  type: "text",
  id: null,
  width: "100%",
  size: "14px",
  padding: false,
  margin: false,
  onChange: () => {},
};

const ElInput = styled.input`
  width: ${props => props.width};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  font-size: ${props => props.size};
  border: 1px solid gray;
  border-radius: 3px;
  outline: none;
  &::placeholder {
    font-size: 14px;
    color: #90a4ae;
  }
`;

export default Input;
