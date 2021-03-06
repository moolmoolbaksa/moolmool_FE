import React from "react";
import styled from "styled-components";
import Grid from "./Grid";

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
    name,
    text,
    rows,
    cols,
    multiLine,
    border,
    height,
    bg,
    onClick,
    disabled,
  } = props;

  const style = {
    width,
    padding,
    margin,
    size,
    height,
    bg,
  };
  
  if (multiLine)
  {
    return (
      <React.Fragment>
        <MultiInput
          {...style}
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          rows={rows}
          cols={cols}
          border={border}
        />
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Grid position="relative">
        <ElInput
          {...style}
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onClick={onClick}
          border={border}
          disabled={disabled}
        />
        <Label htmlFor={id} name={name}>
          {text}
        </Label>
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  placeholder: null,
  label: null,
  type: "text",
  id: null,
  name: null,
  width: "100%",
  size: "14px",
  padding: false,
  margin: false,
  text: null,
  rows:"",
  disabled: false,
  onChange: () => {},
  onClick: () => {},
  border:'1px solid grey',
};

const ElInput = styled.input`
  width: ${props => props.width};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  font-size: ${props => props.size};
  border: ${props => props.border};
  ${props => (props.height ? `height:${props.height}` : '')};
  ${props => (props.bg ? `background:${props.bg}` : '')};
  border-radius: 5px;
  outline: none;
  border: none;
  &::placeholder {
    font-size:  ${props => props.size};
    color: rgb(157,157,157);
    line-height: 22.6px;
    font-weight: 500;
    letter-spacing: -1px;
  }
  resize: none;
`;

const Label = styled.label`
  position: absolute;
  left: 5px;
  bottom: 13px;
  letter-spacing: -1px;
  font-size: 12px;
  color: red;
`;

const MultiInput = styled.textarea`
  width: ${props => props.width};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  font-size: ${props => props.size};
  border: ${props => props.border};
  border-radius: 3px;
  outline: none;
  &::placeholder {
    font-size:  ${props => props.size};
    color: #90a4ae;
  }
  resize:none;
`

export default Input;
