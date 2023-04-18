import { FormControl, FormLabel, Input } from '@chakra-ui/react'

type InputProps = {
  value: any
  onChange: (value: any) => void
  placeholder?: string
  label?: string
  width?: string
  mr?: string
  mt?: string
}

export const Inputs = ({ value, onChange, placeholder, label, width, mr, mt}: InputProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        width={width}
        mr={mr}
        mt={mt}
      />
    </FormControl>
  )
}
