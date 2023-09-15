import React, { useState, FC, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DynamicForm, FormData, fieldTypes } from '../data'

interface Props {
  onClose: () => void
  addField: (value: DynamicForm) => void
}

const AddNewField: FC<Props> = ({ onClose, addField }) => {
  const [option, setOption] = useState<string>('')
  const [fieldName, setfieldName] = useState<string>('')
  const [required, setRequired] = useState(false)
  const [max, setmax] = useState(0)
  const [min, setmin] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [type, setType] = useState('')

  useEffect(() => {
    setOptions([])
  }, [type])

  const submit = () => {
    const newField: DynamicForm = {
      [fieldName.split(' ').join('')]: {
        type,
        options,
        rules: {
          required,
          maxLength: !max ? undefined : max,
          minLength: !min ? undefined : min,
        },
        defaultValue: '',
        label: fieldName,
      },
    }

    addField(newField)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='add_modal'>
      <motion.div
        initial={{ scale: 0.2 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.2 }}
        className='add_modal-content'>
        <h1>Select a Field type</h1>
        {fieldTypes.map((item, index) => (
          <span key={index} className='select_input'>
            <label>
              <input
                name='field'
                value={item}
                type='radio'
                onChange={(e) => setType(e.target.value)}
              />
              {item}
            </label>
          </span>
        ))}

        {type && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            style={{ marginTop: '20px' }}>
            <label className='addFieldLabel'>Enter Field Name</label>
            <input
              type='text'
              placeholder='Enter field name'
              value={fieldName}
              onChange={(e) => setfieldName(e.target.value)}
            />
            {(type === 'radio' || type === 'dropdown') && (
              <div>
                <input
                  type='text'
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                />
                {options?.map((item, index) => (
                  <span className='addField_option' key={index}>
                    {item}
                  </span>
                ))}
                <button
                  className='btn-primary btn-small'
                  disabled={!option}
                  onClick={() => {
                    option && setOptions((prev) => [...prev, option])
                    setOption('')
                  }}>
                  Add option
                </button>
              </div>
            )}

            <div className='addField_rules'>
              <div className='formInput_rule-item'>
                <input
                  type='checkbox'
                  checked={required}
                  onChange={(e) =>
                    e.target.checked ? setRequired(true) : setRequired(false)
                  }
                />
                <p>Required</p>
              </div>
              <div className='formInput_rule-item'>
                <input
                  type='number'
                  value={min}
                  placeholder='0'
                  onChange={(e) => setmin(Number(e.target.value))}
                />
                <p>Min. Lenght</p>
              </div>
              <div className='formInput_rule-item'>
                <input
                  type='number'
                  value={max}
                  onChange={(e) => setmax(Number(e.target.value))}
                  placeholder='0'
                />
                <p>Max. Lenght</p>
              </div>
            </div>

            <button
              className='btn-primary w-100'
              disabled={!fieldName}
              onClick={submit}>
              Add Field
            </button>
          </motion.div>
        )}
        <button className='btn-secondary w-100' onClick={onClose}>
          Cancel
        </button>
      </motion.div>
    </motion.div>
  )
}

export default AddNewField
