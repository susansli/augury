import { Center, VisuallyHidden, Link, Icon, Box } from '@chakra-ui/react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { navbarPageAtom } from './atoms/atom';
import { useNavigate } from 'react-router-dom';

interface Props {
  icon: IconDefinition;
  iconActivated?: IconDefinition;
  text: string;
  link: string;
  index: number;
}

export default function PageIcon(props: Props): JSX.Element {

  const [activePage, setActivePage] = useRecoilState<number>(navbarPageAtom)
  
  const [isPageActive, setIsPageActive] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsPageActive(activePage == props.index);
  }, [activePage]);

  return (
    <Box
      flex="1"
      bg={isPageActive ? 'background.mantle' : 'background.crust'}
      color={isPageActive ? 'text.subtitle0' : 'text.subtitle1'}
      _hover={{
        bg: 'background.selBg',
        color: 'text.body',
      }}
    >
      <VisuallyHidden>{props.text}</VisuallyHidden>
      <Center 
        h="full"
        onClick={() => {
          setActivePage(props.index);
          navigate(props.link);
        }}
      >
        <Icon
          as={FontAwesomeIcon}
          icon={
            isPageActive && props.iconActivated
              ? props.iconActivated
              : props.icon
          }
          size="xl"
        />
      </Center>
    </Box>
  );
}
