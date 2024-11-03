import {
  Text,
  Flex,
  Icon,
  IconButton,
  Spacer,
  Tooltip,
} from '@chakra-ui/react';
import colors from '../../theme/foundations/colours';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SettingsAccountBalance(): JSX.Element {
  return (
    <Flex
      direction="column"
      borderRadius="10"
      padding="1rem 1rem 2rem 1rem"
      width="100%"
      backgroundColor={colors.background.selBg}
      marginTop="5"
      gap="3"
    >
      <Flex alignItems="center">
        <Text fontWeight="semibold" color="text.body">
          Modify Account Balance
        </Text>
        <Spacer />
        <Tooltip
          label="Add a dollar amount to your account balance, use negative if deducting."
          placement="bottom-start"
          fontSize="xs"
          width="10rem"
        >
          <IconButton
            aria-label="more-info"
            background="none"
            padding="0"
            _focus={{ background: 'none' }}
            icon={
              <Icon
                as={FontAwesomeIcon}
                icon={faQuestionCircle}
                color="text.body"
              />
            }
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
}
