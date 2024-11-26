import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Accordion,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { StockSymbolInterface } from '../../api/stock/Stocks';
import StockAccordion from './StockAccordion';

interface Props {
  isOpen: boolean;
  onClose: (refresh: boolean) => void;
  stocks: StockSymbolInterface[];
}

export default function BuyStockModal(props: Props): JSX.Element {
  function renderAccordionItem(): JSX.Element[] {
    return props.stocks.map((stock, index) => {
      return <StockAccordion stock={stock} onClose={props.onClose} key={index} />;
    });
  }

  return (
    <Modal isOpen={props.isOpen} onClose={() => props.onClose(false)}>
      <ModalOverlay />
      <ModalContent margin="1rem">
        <ModalHeader>Buy Stocks</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            {props.stocks.length ? 
              <Accordion>
                {renderAccordionItem()}
              </Accordion> :
              <Center>
                <Spinner />
              </Center>
            }
          </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => props.onClose(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
