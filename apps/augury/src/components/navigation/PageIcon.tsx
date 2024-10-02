import { Box, Center, VisuallyHidden } from '@chakra-ui/react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  icon: IconDefinition;
  iconActivated?: IconDefinition;
  text?: string;
  activated?: boolean;
  link?: string; // Unsure how to manage this
}

export default function PageIcon(props: Props): JSX.Element {
  return (
    <Box
      flex="1"
      bg={props?.activated ? 'background.overlay1' : 'background.overlay0'}
      color="text.body"
      _hover={{
        bg: 'background.selBg',
      }}
    >
      <VisuallyHidden>{props?.text}</VisuallyHidden>
      <Center h="full">
        <FontAwesomeIcon
          icon={
            props?.activated && props?.iconActivated
              ? props?.iconActivated
              : props?.icon
          }
          size='xl'
        ></FontAwesomeIcon>
      </Center>
    </Box>
  );
}
