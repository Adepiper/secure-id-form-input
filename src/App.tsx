import { useForm } from 'react-hook-form';

import { AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import './App.scss';
import { DynamicForm, dynamicForm } from './data';
import AddNewField from './edit/AddNewField';
import { StrictModeDroppable } from './forms/Dropable';
import FormInputs from './forms/FormInput';

export interface FormType {
	title: string;
	description: string;
}

function App() {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm();
	const [showAddNew, setShowAddNew] = useState(false);
	const [data, setData] = useState({});
	const [edit, setEdit] = useState(false);

	const fieldArray = useMemo(
		() =>
			Object.keys(dynamicForm).map((item) => {
				return { values: dynamicForm[item], id: item };
			}),
		[]
	);

	const [form, setForm] = useState<FormType>({
		title: '',
		description: '',
	});

	const [fields, setfields] = useState<any[]>(fieldArray);

	const addNewField = (values: DynamicForm) => {
		setfields((prev: any) => [
			...prev,
			{
				id: Object.keys(values)[0],
				values: Object.values(values)[0],
			},
		]);
		reset();
		setData({});
	};

	const removeField = (id: string) => {
		const updatedFIelds = fields.filter((item: any) => item.id !== id);
		setfields(updatedFIelds);
		reset();
		setData({});
	};

	const handleDragEnd = (result: any) => {
		if (!result.destination) return;

		const items = Array.from(fields);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setfields(items);
	};

	const onSubmit = (data: any) => {
		setData(data);
	};
	return (
		<div className='App'>
			<div className='navbar'>
				<div className='navbar_container'>
					<h3>Formarly</h3>
				</div>
			</div>
			<div className='container'>
				{!edit ? (
					<h1 className='form_title'>
						{form.title || 'Form Name #1'}{' '}
						<button type='button' onClick={() => setEdit(true)}>
							Edit Form
						</button>
					</h1>
				) : (
					<input
						type='text'
						placeholder='Enter Form Title'
						value={form.title}
						className='formInput_title'
						onChange={(e) =>
							setForm((prev) => ({
								...prev,
								title: e.target.value,
							}))
						}
					/>
				)}

				{edit ? (
					<DragDropContext onDragEnd={handleDragEnd}>
						<StrictModeDroppable droppableId='formFields'>
							{(provided) => (
								<form
									onSubmit={handleSubmit(onSubmit)}
									{...provided.droppableProps}
									ref={provided.innerRef}
								>
									{fields.map(
										(element: any, index: number) => {
											return (
												<Draggable
													key={element.id}
													draggableId={element.id}
													index={index}
												>
													{(provided) => (
														<div
															ref={
																provided.innerRef
															}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															className={
																edit
																	? 'formFieldItem'
																	: ''
															}
														>
															<span>
																<i className='fa-solid fa-grip'></i>
															</span>
															<p>
																{element.values
																	.label ??
																	element
																		.values
																		.checkboxLabel}
															</p>

															<button
																className='remove'
																onClick={() =>
																	removeField(
																		element.id
																	)
																}
															>
																Remove
															</button>
														</div>
													)}
												</Draggable>
											);
										}
									)}
									{provided.placeholder}

									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
										}}
									>
										<button
											type='button'
											className='btn-primary'
											onClick={() => setEdit(false)}
										>
											Save
										</button>
										<button
											className='btn-secondary'
											type='button'
											onClick={() => setShowAddNew(true)}
										>
											Add Field
										</button>
									</div>
								</form>
							)}
						</StrictModeDroppable>
					</DragDropContext>
				) : (
					<>
						{fields.length > 0 ? (
							<form onSubmit={handleSubmit(onSubmit)}>
								{fields.map((element: any, index: number) => {
									return (
										<FormInputs
											key={element.id}
											control={control}
											data={element.values}
											element={element.id}
											errors={errors}
											className='form_group'
											checkBoxClass='form_checkbox'
											radioClass='form_radio'
										/>
									);
								})}
								<button type='submit' className='btn-primary'>
									Submit
								</button>
							</form>
						) : (
							<p>Please Add a field to test</p>
						)}
					</>
				)}
			</div>

			<AnimatePresence>
				{showAddNew && (
					<AddNewField
						addField={addNewField}
						onClose={() => setShowAddNew(false)}
					/>
				)}
			</AnimatePresence>

			<div>
				{Object.keys(data).length > 0 && (
					<pre>{JSON.stringify(data)}</pre>
				)}
			</div>
		</div>
	);
}

export default App;
