import { Button, Flex, Text } from '@chakra-ui/react';
import GoogleIcon from '../../assets/icons/GoogleIcon';
import { useNavigate } from 'react-router-dom';
import Authentication from '../../api/user/Authentication';
import toast from 'react-hot-toast';
import AuthStoreManager from '../../helpers/AuthStoreManager';

export default function LoginComponents(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Flex flexDir="column" alignItems="center" gap="3">
      <Text color="text.header" fontFamily="monospace" fontSize="3xl">
        augury.ai
      </Text>
      <Text color="text.subtitle0" fontFamily="monospace" fontSize="sm">
        invest like a pro, with AI in tow
      </Text>
      <Button
        color="text.body"
        bgColor="background.surface0"
        marginTop="5"
        leftIcon={<GoogleIcon />}
        onClick={() => {
          const googleUrl = Authentication.getGoogleAuthUrl();
          if (googleUrl) {
            window.location.href = googleUrl;
          } else {
            toast.error(
              'There was an error generating the correct Google URL!'
            );
          }
        }}
      >
        <Flex>
          <Text>Continue With Google</Text>
        </Flex>
      </Button>
    </Flex>
  );
}
