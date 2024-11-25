import { Box, Icon, IconButton } from '@chakra-ui/react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEventHandler } from 'react';

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  'aira-label': string;
  isDisabled?: boolean;
}

export default function AddButton(props: Props): JSX.Element {
  return (
    <Box position="fixed" bottom="20" right="4" zIndex="overlay">
      <IconButton
        icon={<Icon as={FontAwesomeIcon} icon={faPlus} color="text.body" />}
        onClick={props.onClick}
        aria-label={props['aira-label']}
        colorScheme="gray"
        borderRadius="full"
        size="lg"
        shadow="lg"
      />
    </Box>
  );
}
