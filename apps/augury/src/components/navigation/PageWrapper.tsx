import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import PageIcon from './PageIcon';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

interface Props {
  children?: ReactNode;
}

export default function PageWrapper(props: Props): JSX.Element {
  return (
    <Flex width="100vw" height="100vh" overflow="hidden" flexDirection="column">
      <Box flex="1">{props?.children}</Box>
      <Flex height="50px" roundedTop='10' overflow="hidden">
        <PageIcon icon={faHouse} activated={true}></PageIcon>
        <PageIcon icon={faHouse} activated={false}></PageIcon>
        <PageIcon icon={faHouse} activated={false}></PageIcon>
      </Flex>
    </Flex>
  );
}
