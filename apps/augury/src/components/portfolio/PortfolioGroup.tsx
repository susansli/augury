import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatNumber,
  Text,
} from '@chakra-ui/react';
import { PortfolioGroupData } from './PortfolioTypes';

interface Props {
  PortfolioGroup: PortfolioGroupData;
  key: number;
}

export default function PortfolioGroup(props: Props): JSX.Element {
  return (
    <Flex flex="1">
      <Stack flex="1" marginEnd="auto">
        <Text>{props.PortfolioGroup.label}</Text>
        <Text>
          {props.PortfolioGroup.portfolios.length}{' '}
          {props.PortfolioGroup.portfolios.length === 1
            ? 'portfolio'
            : 'portfolios'}
        </Text>
      </Stack>
      <Box>
        <StatGroup>
          <Stat>
            <StatNumber>{props.PortfolioGroup.value}</StatNumber>
            <StatHelpText>
              <StatArrow
                type={
                  props.PortfolioGroup.percentageNumerical > 0
                    ? 'increase'
                    : 'decrease'
                }
              />
              {props.PortfolioGroup.percentageText}
            </StatHelpText>
          </Stat>
        </StatGroup>
      </Box>
      {/* TODO replace with real stuff */}
      <Popover>
        <PopoverTrigger>
          <Button>⋮</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>
            Delete?
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
