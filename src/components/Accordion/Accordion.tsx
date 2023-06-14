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
    <Accordion allowToggle _expanded={{ bg: '#6b283e', borderTopRadius: 'md'}} mt={mt} mb={mb}>
      <AccordionItem boxShadow="md" borderRadius="md" mb={8} borderColor={'#ffddf2'} borderWidth={2} _hover={{ borderColor: '#ffddf2' }}>
        <AccordionButton _expanded={{ bg: '#6b283e', color: 'white', borderTopRadius: 'md'}} _hover={{ bg: '#6b283e', color: 'white' }}>
          <AccordionIcon />
          {title}
        </AccordionButton>
        <AccordionPanel pb={4}>{children}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default AccordionComponent