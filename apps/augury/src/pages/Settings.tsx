import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Icon,
  IconButton,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import colors from '../theme/foundations/colours';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

export default function Settings(): JSX.Element {
  const { isOpen, onOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      <Flex direction="column" gap={2} margin="10">
        <FormLabel color="text.header" fontSize="28" fontWeight="bold">
          User Settings
        </FormLabel>
        <Divider />
        <Box
          borderRadius="10"
          padding="3"
          width="100%"
          backgroundColor={colors.background.selBg}
          marginTop="5"
        >
          <Flex alignItems="center">
            <Text fontWeight="semibold" color="text.body">
              Portfolio Defaults
            </Text>
            <Spacer />
            <Tooltip
              label="Equity/Bond percentages and Perferred Sectors are used for AI suggestions only."
              placement="bottom-start"
              fontSize="xs"
              width="10rem"
            >
              <IconButton
                aria-label="more-info"
                background="none"
                padding="0"
                _focus={{background: "none"}}
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
        </Box>
      </Flex>
    </>
  );
}
