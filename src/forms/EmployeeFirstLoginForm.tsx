import React from 'react';
import { Form as FormBoot } from 'react-bootstrap';
import { Form, useFormikContext } from 'formik';

import SubmitFormButton from '../components/SubmitButton/SubmitFormButton';
import { FinishFirstLoginFormikValues } from '../interfaces/formik/Formiks';

import { divider, errorSpan, form, formControl, formGroup, formLabel, submitButton } from './FormStyles';

const EmployeeFirstLoginForm = () => {
	const { handleChange, errors, touched } = useFormikContext<FinishFirstLoginFormikValues>();

	return (
		<Form className={form}>
			<FormBoot.Group className={formGroup}>
				<FormBoot.Label className={formLabel}>New Password</FormBoot.Label>
				<FormBoot.Control
					type={`password`}
					className={formControl}
					name={`password`}
					onChange={handleChange}
					isInvalid={touched.password && !!errors.password}
					isValid={touched.password && !errors.password}
				/>

				<span id={'password-error'} className={errorSpan}>
					{errors.password}
				</span>
			</FormBoot.Group>

			<hr className={divider} />

			<SubmitFormButton variant={`info`} className={submitButton}>
				Submit password change
			</SubmitFormButton>
		</Form>
	);
};

export default EmployeeFirstLoginForm;
