import {
  Divider,
  Flex,
  FormLabel,
} from '@chakra-ui/react';
import SettingsPortfolioDefaults from '../components/settings/SettingsPortfolioDefaults';
import SettingsAccountBalance from '../components/settings/SettingsAccountBalance';
import SettingsLogOut from '../components/settings/SettingsLogOut';

export default function Settings(): JSX.Element {

  return (
    <>
      <Flex direction="column" gap="2" margin="10">
        <FormLabel color="text.header" fontSize="28" fontWeight="bold">
          User Settings
        </FormLabel>
        <Divider />
        <SettingsPortfolioDefaults />
        <SettingsAccountBalance />
        <SettingsLogOut />
      </Flex>
    </>
  );
}
