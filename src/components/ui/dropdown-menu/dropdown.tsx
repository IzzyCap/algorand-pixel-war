import { useState } from 'react';
import classes from './dropdown-menu.module.css';

interface DropdownProps {
  title: string,
  children: React.ReactNode,
}

export default function Dropdown({title, children}: DropdownProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  function dropdownClickHandler() {
    setMenuOpen(!menuOpen);
  }

  return (
    <li key={title} className={classes.dropdown}>
      <p className={classes.dropDownTitle} onClick={dropdownClickHandler}>
        <span>{title}</span>
        {/* <img className={menuOpen ? `${classes.iconArrow} ${classes.iconArrowOpen}` : `${classes.iconArrow}`} alt='Helmet Dropdown' src='/icons/down-arrow.svg'></img> */}
      </p>
      <div className={menuOpen ?  `${classes.dropdownMenu} ${classes.dropdownMenuOpen}` : `${classes.dropdownMenu} ${classes.dropdownMenuClose}`}>
        {children}
      </div>
    </li>
  )
}
