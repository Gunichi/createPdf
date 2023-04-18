import React from 'react'

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'

interface AccordionProps {
  title: string
  mt?: string
  mb?: string
  children: React.ReactNode
}

const AccordionComponent = ({ title, children, mt, mb }: AccordionProps) => {
  return (
    <Accordion allowToggle _expanded={{ bg: '#BB975E', borderTopRadius: 'md'}} mt={mt} mb={mb}>
      <AccordionItem border="none" boxShadow="md" borderRadius="md" mb={4}>
        <AccordionButton _expanded={{ bg: '#BB975E', borderTopRadius: 'md'}} _hover={{ bg: '#BB975E' }}>
          <AccordionIcon />
          {title}
        </AccordionButton>
        <AccordionPanel pb={4}>{children}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default AccordionComponent