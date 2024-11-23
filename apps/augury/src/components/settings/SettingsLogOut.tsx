import { Text, Flex, Button } from "@chakra-ui/react";
import colors from "../../theme/foundations/colours";

export default function SettingsLogOut(): JSX.Element {
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
      <Text fontWeight="semibold" color="text.body">
        Log Out From Augury
      </Text>
      <Button color={colors.color.red}>Log Out</Button>
    </Flex>
  );
}
