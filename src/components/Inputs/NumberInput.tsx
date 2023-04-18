import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel
} from '@chakra-ui/react'

type NumberInputProps = {
  value: any
  onChange: (value: any) => void
  placeholder?: string
  label?: string
}

export const NumberInputs = ({ value, onChange, placeholder, label }: NumberInputProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <NumberInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  )
}