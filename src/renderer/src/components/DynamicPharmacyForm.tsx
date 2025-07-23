import { CalendarDays, Check, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type FormValue = string | number | boolean | null
export interface FormFieldConfig {
  id: string
  label: string
  type: 'text' | 'select' | 'date' | 'number'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  width?: 'full' | 'half' | 'third' | 'quarter'
  className?: string
  min?: string | number
  max?: number
  pattern?: string
  sectionTitle?: string
}

export interface TableColumn {
  id: string
  header: string
  accessor: string
}

export interface CostSection {
  id: string
  title: string
  fields: FormFieldConfig[][]
  tableColumns: TableColumn[]
  initialFormState: Record<string, FormValue>
  validation?: (formData: Record<string, FormValue>) => string | null

  allowMultipleEntries?: boolean
}

interface DynamicCostFormProps {
  pageName: string
  sections: CostSection[]
  onSave?: (data: Record<string, Record<string, FormValue>[]>) => void
}

const DynamicInventoryForm: React.FC<DynamicCostFormProps> = ({ pageName, sections, onSave }) => {
  const [formValues, setFormValues] = useState<Record<string, Record<string, FormValue>>>(
    {} as Record<string, Record<string, FormValue>>
  )

  const [allEntries, setAllEntries] = useState<Record<string, Record<string, FormValue>[]>>(
    {} as Record<string, Record<string, FormValue>[]>
  )

  const [dates, setDates] = useState<Record<string, Date | null>>({})
  const [lockedSections, setLockedSections] = useState<Record<string, boolean>>({})
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [availableSections, setAvailableSections] = useState<Record<string, boolean>>({})

  // Initialize form values and entries
  React.useEffect(() => {
    const initialFormValues: Record<string, Record<string, FormValue>> = {}
    const initialEntries: Record<string, Record<string, FormValue>[]> = {}
    const initialLockedSections: Record<string, boolean> = {}
    const initialAvailableSections: Record<string, boolean> = {}

    sections.forEach((section, index) => {
      initialFormValues[section.id] = { ...section.initialFormState }
      initialEntries[section.id] = []
      initialLockedSections[section.id] = false
      initialAvailableSections[section.id] = index === 0
    })

    setFormValues(initialFormValues)
    setAllEntries(initialEntries)
    setLockedSections(initialLockedSections)
    setAvailableSections(initialAvailableSections)
  }, [sections])

  const isSectionLocked = (sectionId: string) => {
    // First section is never locked
    if (sectionId === sections[0]?.id) return false

    // Lock section if previous section has no entries
    const currentIndex = sections.findIndex((s) => s.id === sectionId)
    if (currentIndex > 0) {
      const prevSection = sections[currentIndex - 1]
      if ((allEntries[prevSection.id]?.length || 0) === 0) {
        return true
      }
    }

    // Otherwise respect the locked state
    return lockedSections[sectionId] === true
  }

  const validateSection = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId)
    if (!section) return true

    // Check required fields
    for (const field of section.fields.flat()) {
      if (field.required && !formValues[sectionId][field.id]) {
        alert(`${field.label} is required`)
        return false
      }
    }

    // Check custom validation if exists
    if (section.validation) {
      const validationError = section.validation(formValues[sectionId])
      if (validationError) {
        alert(validationError)
        return false
      }
    }

    return true
  }

  const handleInputChange = (
    sectionId: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (isSectionLocked(sectionId)) return

    const { name, value } = e.target

    const field = sections
      .find((s) => s.id === sectionId)
      ?.fields.flat()
      .find((f) => f.id === name)

    if (field?.type === 'number') {
      const numericValue = value.replace(/[^\d]/g, '')
      setFormValues((prev) => ({
        ...prev,
        [sectionId]: {
          ...(prev[sectionId] || {}),
          [name]: numericValue
        }
      }))
    } else {
      setFormValues((prev) => ({
        ...prev,
        [sectionId]: {
          ...(prev[sectionId] || {}),
          [name]: value
        }
      }))
    }
  }

  const handleDateChange = (sectionId: string, fieldId: string, date: Date | null) => {
    if (isSectionLocked(sectionId)) return

    setDates((prev) => ({
      ...prev,
      [`${sectionId}-${fieldId}`]: date
    }))

    if (date) {
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getFullYear()}`

      setFormValues((prev) => ({
        ...prev,
        [sectionId]: {
          ...(prev[sectionId] || {}),
          [fieldId]: formattedDate
        }
      }))
    } else {
      setFormValues((prev) => ({
        ...prev,
        [sectionId]: {
          ...(prev[sectionId] || {}),
          [fieldId]: ''
        }
      }))
    }
  }

  const addEntry = (sectionId: string) => {
    if (!validateSection(sectionId)) return

    const section = sections.find((s) => s.id === sectionId)
    if (!section) return

    const formDataToAdd = { ...formValues[sectionId] }

    setAllEntries((prev) => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), formDataToAdd]
    }))

    if (!section.allowMultipleEntries) {
      setLockedSections((prev) => ({
        ...prev,
        [sectionId]: true
      }))
    }

    // Reset form values for this section
    setFormValues((prev) => ({
      ...prev,
      [sectionId]: { ...section.initialFormState }
    }))

    // Reset dates for this section
    const dateFieldIds = section.fields
      .flat()
      .filter((field) => field.type === 'date')
      .map((field) => `${sectionId}-${field.id}`)

    const newDates = { ...dates }
    dateFieldIds.forEach((dateId) => {
      newDates[dateId] = null
    })
    setDates(newDates)

    // Unlock the next section
    const currentIndex = sections.findIndex((s) => s.id === sectionId)
    const nextSectionId = sections[currentIndex + 1]?.id

    if (nextSectionId) {
      setAvailableSections((prev) => ({
        ...prev,
        [nextSectionId]: true
      }))
    }
  }

  const removeEntry = (sectionId: string, index: number) => {
    setAllEntries((prev) => {
      const newEntries = { ...prev }
      newEntries[sectionId] = prev[sectionId].filter((_, entryIndex) => entryIndex !== index)
      return newEntries
    })

    // If no entries left, unlock the section
    setTimeout(() => {
      setAllEntries((prev) => {
        if (prev[sectionId]?.length === 0) {
          setLockedSections((prevLocks) => ({
            ...prevLocks,
            [sectionId]: false
          }))
        }
        return prev
      })
    }, 0)

    // Lock subsequent sections when removing an entry
    const currentIndex = sections.findIndex((s) => s.id === sectionId)
    const newAvailableSections = { ...availableSections }
    sections.forEach((section, idx) => {
      if (idx > currentIndex) {
        newAvailableSections[section.id] = false
      }
    })
    setAvailableSections(newAvailableSections)
  }

  const handleSave = async () => {
    setSaveStatus('saving')

    try {
      if (onSave) {
        await onSave(allEntries)
      }

      // Reset form after successful save but maintain section availability
      const initialFormValues: Record<string, Record<string, FormValue>> = {}
      const initialEntries: Record<string, Record<string, FormValue>[]> = {}
      const initialLockedSections: Record<string, boolean> = {}
      const initialDates: Record<string, Date | null> = {}
      const initialAvailableSections: Record<string, boolean> = {}

      sections.forEach((section, index) => {
        initialFormValues[section.id] = { ...section.initialFormState }
        initialEntries[section.id] = []
        initialLockedSections[section.id] = false
        initialAvailableSections[section.id] = index === 0
      })

      setFormValues(initialFormValues)
      setAllEntries(initialEntries)
      setLockedSections(initialLockedSections)
      setDates(initialDates)
      setAvailableSections(initialAvailableSections)

      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch {
      setSaveStatus('idle')
      alert('Error saving data. Please try again.')
    }
  }

  const renderField = (section: CostSection, field: FormFieldConfig) => {
    const sectionId = section.id
    const formData = formValues[sectionId] || {}
    const dateKey = `${sectionId}-${field.id}`
    const isLocked = isSectionLocked(sectionId)

    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <div key={field.id} className={field.className || 'col-span-1'}>
            <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
              {field.label}
              {field.required && <span className="text-prd-fix-value-indicator-negative">*</span>}
            </label>
            <input
              type={field.type === 'number' ? 'text' : field.type}
              name={field.id}
              placeholder={field.placeholder}
              value={formData[field.id] !== undefined ? String(formData[field.id]) : ''}
              onChange={(e) => !isLocked && handleInputChange(sectionId, e)}
              readOnly={isLocked}
              disabled={isLocked}
              className={`w-full p-2 placeholder:font-normal placeholder:text-[10px] placeholder:text-[#383838] text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                isLocked ? 'bg-[#E6E6E6] cursor-not-allowed' : ''
              }`}
            />
          </div>
        )

      case 'select':
        return (
          <div key={field.id} className={field.className}>
            <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
              {field.label}
              {field.required && <span className="text-prd-fix-value-indicator-negative">*</span>}
            </label>
            <select
              name={field.id}
              value={formData[field.id] !== undefined ? String(formData[field.id]) : ''}
              onChange={(e) => !isLocked && handleInputChange(sectionId, e)}
              className={`w-full p-2 text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                isLocked ? 'bg-[#E6E6E6] cursor-not-allowed' : 'bg-white'
              }`}
              disabled={isLocked}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )

      case 'date':
        return (
          <div key={field.id} className={field.className}>
            <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
              {field.label}
              {field.required && <span className="text-prd-fix-value-indicator-negative">*</span>}
            </label>
            <div className="relative">
              <DatePicker
                selected={dates[dateKey] || null}
                onChange={(date) => !isLocked && handleDateChange(sectionId, field.id, date)}
                dateFormat="dd-MM-yyyy"
                placeholderText={field.placeholder || 'dd-mm-yyyy'}
                className={`w-[275px] p-2 pr-16 text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                  isLocked ? 'bg-[#E6E6E6] cursor-not-allowed' : ''
                }`}
                disabled={isLocked}
              />
              <CalendarDays
                className={`w-full absolute right-2 top-1/2 transform -translate-y-1/2 ${
                  isLocked ? 'text-gray-500' : 'text-pink-500'
                }`}
                style={{ fontSize: '18px', pointerEvents: 'none' }}
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen pt-35">
      <div className="p-3 ml-8 text-center bg-white w-48 rounded-t-md">
        <h2 className="text-sm font-medium text-[#1A1A1A]">{pageName}</h2>
      </div>
      <div className="ml-8 max-w-[1480px] bg-white rounded-b-lg rounded-r-lg">
        {sections.map((section) => {
          // Special condition only for 'productdetails' section
          if (section.id === 'productdetails') {
            const materialEntries = allEntries['receivedmaterial'] || []

            // Only show 'productdetails' if 'receivedmaterial' section has at least one entry
            if (materialEntries.length === 0) {
              return null
            }
          }

          const isLocked = lockedSections[section.id]
          const hasEntries = (allEntries[section.id]?.length || 0) > 0
          const showAddButton = !hasEntries || section.allowMultipleEntries

          return (
            <div key={section.id} className="p-4">
              {/* Section Header */}
              <div className="flex justify-between items-center mt-6 mb-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-xs font-semibold">{section.title} Details</h2>
                  {showAddButton && (
                    <button
                      className={`text-[#FB009C] text-xs flex items-center font-semibold ${
                        isLocked ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={() => !isLocked && addEntry(section.id)}
                      disabled={isLocked}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              {section.fields.map((row, rowIndex) => (
                <div key={`${section.id}-row-${rowIndex}`} className="grid grid-cols-5 gap-4 mb-4">
                  {row.map((field) => renderField(section, field))}
                </div>
              ))}

              {/* Table */}
              {hasEntries && (
                <div className="w-full bg-white rounded-md border border-[#999999] overflow-hidden mt-4">
                  <table className="w-full">
                    <thead className="bg-[#E6F3D8]">
                      <tr>
                        {section.tableColumns.map((column) => (
                          <th
                            key={column.id}
                            className="px-4 py-2 text-[10px] font-normal text-[#1A1A1A] uppercase text-left"
                          >
                            {column.header}
                          </th>
                        ))}
                        <th className="px-4 py-2 text-[10px] font-normal text-[#1A1A1A] uppercase text-right">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allEntries[section.id]?.map((entry, entryIndex) => (
                        <tr key={entryIndex} className="border-t border-[#E6E6E6]">
                          {section.tableColumns.map((column) => (
                            <td
                              key={column.id}
                              className="px-4 py-3 text-[10px] font-normal text-[#1A1A1A]"
                            >
                              {entry[column.accessor] || '--'}
                            </td>
                          ))}
                          <td className="px-4 py-3 text-right">
                            <button
                              className="text-[#FB009C]"
                              onClick={() => removeEntry(section.id, entryIndex)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Save Button */}
      <div className="ml-8 max-w-[1480px] flex justify-end mt-4">
        <button
          className={`px-4 py-2 rounded-md text-xs font-medium border border-white shadow-sm flex items-center justify-center gap-2 ${
            saveStatus === 'saved'
              ? 'bg-[#B3DB8A] text-[#1A1A1A]'
              : sections.every((section) => (allEntries[section.id] || []).length > 0)
                ? 'bg-[#FB009C] text-white shadow-[#FB009C]/80'
                : 'bg-[#FF94D6] text-white shadow-[#FB009C]/80 opacity-50 cursor-not-allowed'
          }`}
          onClick={handleSave}
          disabled={
            !sections.every((section) => (allEntries[section.id] || []).length > 0) ||
            saveStatus === 'saving' ||
            saveStatus === 'saved'
          }
        >
          {saveStatus === 'saved' ? (
            <>
              <Check size={16} />
              Saved
            </>
          ) : saveStatus === 'saving' ? (
            'Saving...'
          ) : (
            'Save'
          )}
        </button>
      </div>
    </div>
  )
}

export default DynamicInventoryForm
