import { useRef, RefObject } from 'react';
import { Input, Box } from '@chakra-ui/react';

interface FileInputProps {
  onFileSelect: (file: File) => void;
}

function FileInput({ onFileSelect }: FileInputProps) {
  const fileInputRef: RefObject<HTMLInputElement> = useRef(null);

  function handleSelectFile() {
    if (fileInputRef.current?.files?.[0]) {
      onFileSelect(fileInputRef.current.files[0]);
    }
  }

  return (
    <Input
      type="file"
      ref={fileInputRef}
      opacity={0}
      position="absolute"
      zIndex="-1"
      pointerEvents="none"
    >
      <Box
        as="button"
        mx="4"
        bg="gray.300"
        py="2"
        px="4"
        rounded="md"
        fontWeight="medium"
        _hover={{ bg: 'gray.400' }}
        onClick={handleSelectFile}
      >
        Escolher arquivo
      </Box>
    </Input>
  );
}

export default FileInput;
