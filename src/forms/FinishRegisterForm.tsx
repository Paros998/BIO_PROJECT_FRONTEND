import React from 'react';
import { Form as FormBoot } from 'react-bootstrap';
import { Form, useFormikContext } from 'formik';

import SubmitFormButton from '../components/SubmitButton/SubmitFormButton';
import { FinishRegisterFormikValues } from '../interfaces/formik/FinishRegisterFormikValues';

const FinishRegisterForm = () => {
	const formGroup = `mx-3 my-1 fw-light w-50 align-self-center`;
	const formLabel = `position-relative left-10 fs-4`;
	const formControl = `rounded-pill px-3 w-100 bg-light text-dark`;
	const errorSpan = `text-danger position-relative left-10`;

	const { handleChange, errors, touched } = useFormikContext<FinishRegisterFormikValues>();

	return (
		<Form className={`h-80 w-100 py-2 d-flex flex-column justify-content-around`}>
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

			<hr className={`my-4 w-50 align-self-center position-relative left-5`} />

			<SubmitFormButton variant={`info`} className={`w-25 align-self-center rounded-pill text-light`}>
				Finish registration
			</SubmitFormButton>
		</Form>
	);
};

export default FinishRegisterForm;
