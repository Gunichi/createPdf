import { FormControl, FormLabel, Select } from '@chakra-ui/react'

type SelectProps = {
  value: number
  onChange: (value: any) => void
  placeholder?: string
  label?: string
}

export const SelectMargin = ({ value, onChange, placeholder, label }: SelectProps) => {

  const marginOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select value={value} onChange={onChange} placeholder={placeholder}>
        {marginOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

