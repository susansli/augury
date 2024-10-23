import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureReturn,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MultiSelect } from 'chakra-multiselect';

interface Props {
  disclosure: UseDisclosureReturn;
}
export default function CreateGroupModal(props: Props): JSX.Element {
  const [pgName, setPgName] = useState<string>();
  const [portfolioList, setPortfolioList] = useState<any>([]);

  // TODO: Get options from avalible portfolios
  const options = [
    { value: 'thing1', label: 'thing1' },
    { value: 'thing2', label: 'thing2' },
  ];

  return (
    <Modal isOpen={props.disclosure.isOpen} onClose={props.disclosure.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add portfolio group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder="Name" />
          <MultiSelect
            options={options}
            value={portfolioList}
            label="Choose an item"
            onChange={setPortfolioList}
          />
          <Button onClick={() => console.log(portfolioList)}/>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={props.disclosure.onClose}>
            Close
          </Button>
          <Button variant="solid">Add Group</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
