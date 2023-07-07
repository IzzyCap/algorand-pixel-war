import { ChangeEvent, RefObject } from 'react';
import classes from './search-bar.module.css';

interface SearchBarProps {
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
  inputRef: RefObject<HTMLInputElement>,
  value: string,
}

export default function SearchBar({onChangeHandler, inputRef, value}: SearchBarProps) {
  return (
    <p>
      <img className={classes.searchImg} src="https://www.kenney.nl/data/img/icons/search.svg"/>
      <input 
        placeholder="Hero Asset ID" 
        value={value}
        className={classes.inputBar}
        onChange={onChangeHandler}
        ref={inputRef}
      />
    </p>
  )
}
