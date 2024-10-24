import React, { FC } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { ButtonProps } from 'react-bootstrap/Button';
import { useFormikContext } from 'formik';

export type BaseSubmitButtonProps = ButtonProps;

const SubmitFormButton: FC<BaseSubmitButtonProps> = ({ children, ...props }) => {
	const { isSubmitting } = useFormikContext();
	return (
		<Button type={'submit'} disabled={isSubmitting} {...props}>
			{isSubmitting && <Spinner as="span" animation="border" size="sm" role="status" className="me-1" />}

			{children}
		</Button>
	);
};

export default SubmitFormButton;
