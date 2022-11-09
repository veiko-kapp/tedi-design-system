import cn from 'classnames';

import styles from './form-helper.module.scss';

export type FormHelperType = 'help' | 'valid' | 'error';

export interface FormHelperProps {
  /**
   * Helper text
   */
  text: string;
  /**
   * ID to reference the helper from aria-describedby attributes.
   */
  id?: string;
  /**
   * Additional custom class.
   */
  className?: string;
  /**
   * Type of form-helper.
   */
  type?: FormHelperType;
}

export const FormHelper = (props: FormHelperProps): JSX.Element => {
  const { text, id, className, type = 'help' } = props;
  return (
    <div id={id} className={cn(styles['form-helper'], styles[`form-helper--${type}`], className)}>
      {text}
    </div>
  );
};

export default FormHelper;