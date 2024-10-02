import { Box, Center, VisuallyHidden, Link } from '@chakra-ui/react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  icon: IconDefinition;
  iconActivated?: IconDefinition;
  text?: string;
  activated?: boolean;
  link: string; // Unsure how to manage this
}

export default function PageIcon(props: Props): JSX.Element {
  return (
    <Link
      flex="1"
      bg={props?.activated ? 'background.mantle' : 'background.crust'}
      color={props?.activated ? 'text.subtitle0' : 'text.subtitle1'}
      _hover={{
        bg: 'background.selBg',
        color: 'text.body',
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
          size="xl"
        ></FontAwesomeIcon>
      </Center>
    </Link>
  );
}
