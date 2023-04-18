import { FormControl, FormLabel, Input } from '@chakra-ui/react'

type InputProps = {
  value: string
  onChange: (value: any) => void
  placeholder?: string
  label?: string
}

export const InputColor = ({ value, onChange, placeholder, label }: InputProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        type="color"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </FormControl>
  )
}
