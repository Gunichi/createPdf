import { FormControl, FormLabel, Select } from '@chakra-ui/react';

interface SelectProps {
  options: string[];
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  mr?: string;
}

const SelectInput: React.FC<SelectProps> = ({
  options,
  label,
  name,
  onChange,
  value,
  mr,
}) => {
  return (
    <FormControl mr={mr}>
      <FormLabel>{label}</FormLabel>
      <Select
        placeholder={label}
        name={name}
        onChange={onChange}
        value={value}
        colorScheme="teal"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;