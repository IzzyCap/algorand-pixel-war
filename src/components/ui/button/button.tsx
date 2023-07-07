import Link from 'next/link';

import classes from './button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  link?: string;
  enable?: boolean;
  onClickHandler?: () => void;
}

export default function Button({children, link, enable = true, onClickHandler} : ButtonProps) {
  
  if (link) {
    return (
      <Link href={link} className={`${enable ? '' : `${classes.disable}`} ${classes.btn}`}>
        {children}
      </Link>
    )
  } else {
    return (
      <button className={`${enable ? '' : `${classes.disable}`} ${classes.btn}`} onClick={enable ? onClickHandler : undefined}>
        {children}
      </button>
    )
  }
}
