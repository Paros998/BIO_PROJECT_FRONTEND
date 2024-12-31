import React from 'react';
import { Form as FormBoot } from 'react-bootstrap';
import { Form, useFormikContext } from 'formik';

import SubmitFormButton from '../components/SubmitButton/SubmitFormButton';
import { LoginFormikValues } from '../interfaces/formik/Formiks';

import { divider, errorSpan, form, formControl, formGroup, formLabel, submitButton } from './FormStyles';

const RegisterForm = () => {
	const { handleChange, errors, touched } = useFormikContext<LoginFormikValues>();

	return (
		<Form className={form}>
			<FormBoot.Group className={formGroup}>
				<FormBoot.Label className={formLabel}>Email</FormBoot.Label>
				<FormBoot.Control
					type={`text`}
					className={formControl}
					name={`username`}
					onChange={handleChange}
					isInvalid={touched.username && !!errors.username}
					isValid={touched.username && !errors.username}
				/>

				<span id={'username-error'} className={errorSpan}>
					{errors.username}
				</span>
			</FormBoot.Group>

			<FormBoot.Group className={formGroup}>
				<FormBoot.Label className={formLabel}>Password</FormBoot.Label>
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
				Register Account
			</SubmitFormButton>
		</Form>
	);
};

export default RegisterForm;
