import React from 'react';
import { Form as FormBoot } from 'react-bootstrap';
import { HexColorPicker } from 'react-colorful';
import { Form, useFormikContext } from 'formik';

import SubmitFormButton from '../components/SubmitButton/SubmitFormButton';
import { AddVehicleRequest } from '../interfaces/models/Api';

import { divider, errorSpan, form, formControl, formGroup, formLabel, submitButton } from './FormStyles';

const NewVehicleForm = () => {
	const { values, handleChange, errors, touched } = useFormikContext<AddVehicleRequest>();

	return (
		<Form className={form}>
			<FormBoot.Group className={formGroup}>
				<FormBoot.Label className={formLabel}>Plate</FormBoot.Label>
				<FormBoot.Control
					type={`text`}
					className={formControl}
					name={`plate`}
					onChange={handleChange}
					isInvalid={touched.plate && !!errors.plate}
					isValid={touched.plate && !errors.plate}
				/>

				<span id={'plate-error'} className={errorSpan}>
					{errors.plate}
				</span>
			</FormBoot.Group>

			<FormBoot.Group className={formGroup}>
				<FormBoot.Label className={formLabel}>Model</FormBoot.Label>
				<FormBoot.Control
					type={`text`}
					className={formControl}
					name={`model`}
					onChange={handleChange}
					isInvalid={touched.model && !!errors.model}
					isValid={touched.model && !errors.model}
				/>

				<span id={'model-error'} className={errorSpan}>
					{errors.model}
				</span>
			</FormBoot.Group>

			<FormBoot.Group className={formGroup}>
				<FormBoot.Label className={formLabel}>Color</FormBoot.Label>
				<HexColorPicker
					color={values.color}
					onChange={(newColor) => {
						values.color = newColor;
					}}
				/>
				<span id={'color-error'} className={errorSpan}>
					{errors.color}
				</span>
			</FormBoot.Group>

			<FormBoot.Group className={formGroup}>
				<FormBoot.Label className={formLabel}>Rent Day Per Price in Dollars $</FormBoot.Label>
				<FormBoot.Control
					type={`number`}
					className={formControl}
					name={`rentPerDayPrice`}
					onChange={handleChange}
					isInvalid={touched.rentPerDayPrice && !!errors.rentPerDayPrice}
					isValid={touched.rentPerDayPrice && !errors.rentPerDayPrice}
				/>

				<span id={'rentPerDayPrice-error'} className={errorSpan}>
					{errors.rentPerDayPrice}
				</span>
			</FormBoot.Group>

			<FormBoot.Group className={formGroup}>
				<FormBoot.Label className={formLabel}>Year of production</FormBoot.Label>
				<FormBoot.Control
					type={`number`}
					className={formControl}
					name={`yearOfProduction`}
					onChange={handleChange}
					isInvalid={touched.yearOfProduction && !!errors.yearOfProduction}
					isValid={touched.yearOfProduction && !errors.yearOfProduction}
				/>

				<span id={'yearOfProduction-error'} className={errorSpan}>
					{errors.yearOfProduction}
				</span>
			</FormBoot.Group>

			<hr className={divider} />

			<SubmitFormButton variant={`info`} className={submitButton}>
				Create new vehicle
			</SubmitFormButton>
		</Form>
	);
};

export default NewVehicleForm;
