import React, { Fragment } from 'react';
import { FormData } from '../data';

const Input = ({
	value,
	onChange,
	type,
	rest,
}: {
	value: any;
	onChange: (e: any) => void;
	type: string;
	rest: FormData;
}) => {
	switch (type) {
		case 'text':
			return (
				<input
					type='text'
					placeholder={rest?.placeholder}
					onChange={(e) => onChange(e.target.value)}
					value={value}
				/>
			);

		case 'email':
			return (
				<input
					type='email'
					placeholder={rest?.placeholder}
					onChange={(e) => onChange(e.target.value)}
					value={value}
				/>
			);

		case 'password':
			return (
				<input
					type='password'
					placeholder={rest?.placeholder}
					onChange={(e) => onChange(e.target.value)}
					value={value}
				/>
			);
		case 'radio':
			return (
				<>
					{rest?.options?.map((element: any, index: number) => (
						<span key={index}>
							<label htmlFor={element}>{element}:</label>
							<input
								type='radio'
								onChange={(e) => onChange(e.target.value)}
								value={element}
								name='radio'
							/>
						</span>
					))}
				</>
			);
		case 'checkbox':
			return (
				<>
					<label htmlFor=''>{rest?.checkboxLabel}:</label>
					<input
						type='checkbox'
						onChange={(e) => onChange(e.target.checked)}
						value={value}
					/>
				</>
			);
		case 'dropdown':
			return (
				<select
					onChange={(e) => onChange(e.target.value)}
					value={value}
				>
					<option value=''>Select</option>
					{rest?.options?.map((element: any, index: number) => (
						<option key={index} value={element}>
							{element}
						</option>
					))}
				</select>
			);
		default:
			return null;
	}
};

export default Input;
