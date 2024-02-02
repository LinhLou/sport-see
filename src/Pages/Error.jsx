import React from 'react';
import ErrorStyles from '../Styles/pageError.styled';

export default function Error({message}) {
  return (
    <ErrorStyles>{message}</ErrorStyles>
  )
}
