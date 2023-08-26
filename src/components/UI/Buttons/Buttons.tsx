import { JSX } from 'preact';
import styles from './Buttons.module.sass';
import backIcon from './icons/backArrow.svg';
import nextIcon from './icons/nextArrow.svg';

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  onClick: (() => void) | undefined;
  children: JSX.Element | JSX.Element[] | string;
}

/**
 * Basic Button component
 */
export function Button(props: ButtonProps) {
  return <button className={styles.button} {...props}>{props.children}</button>;
}

/**
 * Primary Button
 */
export function PrimaryButton(props: ButtonProps) {
  return (
    <Button className={styles.primaryButton} {...props}>
      {props.children}
    </Button>
  );
}

/**
 * Secondary Button
 */
export function SecondaryButton(props: ButtonProps) {
  return (
    <Button className={styles.secondaryButton} {...props}>
      {props.children}
    </Button>
  );
}

/**
 * Button UI for moving next
 */
export function NextButton(props: ButtonProps) {
  return (
    <PrimaryButton onClick={props.onClick}>
      <div className={styles.container}>
        {props.children}
        <img src={nextIcon} alt="עבור למונח הבא בתפריט" />
      </div>
    </PrimaryButton>
  );
}

/**
 * Button UI for moving backwards
 */
export function BackButton(props: ButtonProps) {
  return (
    <PrimaryButton onClick={props.onClick}>
      <div className={styles.container}>
        <img src={backIcon} alt="עבור למונח הקודם בתפריט" />
        {props.children}
      </div>
    </PrimaryButton>
  );
}
