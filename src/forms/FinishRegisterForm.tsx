import React from 'react';
import { Form as FormBoot } from 'react-bootstrap';
import { Form, useFormikContext } from 'formik';

import SubmitFormButton from '../components/SubmitButton/SubmitFormButton';
import { FinishRegisterFormikValues } from '../interfaces/formik/Formiks';

import { divider, errorSpan, form, formControl, formGroup, formLabel, submitButton } from './FormStyles';

const FinishRegisterForm = () => {
	const { handleChange, errors, touched } = useFormikContext<FinishRegisterFormikValues>();

	return (
		<Form className={form}>
			<FormBoot.Group className={formGroup}>
				<FormBoot.Label className={formLabel}>First name</FormBoot.Label>
				<FormBoot.Control
					type={`text`}
					className={formControl}
					name={`firstName`}
					onChange={handleChange}
					isInvalid={touched.firstName && !!errors.firstName}
					isValid={touched.firstName && !errors.firstName}
				/>

				<span id={'firstName-error'} className={errorSpan}>
					{errors.firstName}
				</span>
			</FormBoot.Group>

			<FormBoot.Group className={formGroup}>
				<FormBoot.Label className={formLabel}>Last name</FormBoot.Label>
				<FormBoot.Control
					type={`text`}
					className={formControl}
					name={`lastName`}
					onChange={handleChange}
					isInvalid={touched.lastName && !!errors.lastName}
					isValid={touched.lastName && !errors.lastName}
				/>

				<span id={'lastName-error'} className={errorSpan}>
					{errors.lastName}
				</span>
			</FormBoot.Group>

			<FormBoot.Group className={formGroup}>
				<FormBoot.Label className={formLabel}>National Id</FormBoot.Label>
				<FormBoot.Control
					type={`text`}
					className={formControl}
					name={`nationalId`}
					onChange={handleChange}
					isInvalid={touched.nationalId && !!errors.nationalId}
					isValid={touched.nationalId && !errors.nationalId}
				/>

				<span id={'nationalId-error'} className={errorSpan}>
					{errors.nationalId}
				</span>
			</FormBoot.Group>

			<FormBoot.Group className={formGroup}>
				<FormBoot.Label className={formLabel}>Phone number</FormBoot.Label>
				<FormBoot.Control
					type={`text`}
					className={formControl}
					name={`phoneNumber`}
					onChange={handleChange}
					isInvalid={touched.phoneNumber && !!errors.phoneNumber}
					isValid={touched.phoneNumber && !errors.phoneNumber}
				/>

				<span id={'phoneNumber-error'} className={errorSpan}>
					{errors.phoneNumber}
				</span>
			</FormBoot.Group>

			<hr className={divider} />

			<SubmitFormButton variant={`info`} className={submitButton}>
				Finish registration
			</SubmitFormButton>
		</Form>
	);
};

export default FinishRegisterForm;
