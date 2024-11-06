import {
  Box,
  Button,
  Flex,
  Heading,
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
import { Card, CardBody } from '@chakra-ui/react';
import { PortfolioGroupData } from './PortfolioTypes';

interface Props {
  PortfolioGroup: PortfolioGroupData;
  key: number;
}

export default function PortfolioGroup(props: Props): JSX.Element {
  return (
    <Card flex="1">
      <CardBody>
        <Flex direction={['row']}>
          <Box flexGrow="1">
            <Stack>
              <Heading fontSize="2xl">{props.PortfolioGroup.label}</Heading>
              <Text>
                {props.PortfolioGroup.portfolios.length}{' '}
                {props.PortfolioGroup.portfolios.length === 1
                  ? 'portfolio'
                  : 'portfolios'}
              </Text>
            </Stack>
          </Box>
          <Box>
            <Stack flex="1" marginEnd="auto">
              <StatGroup>
                <Stat>
                  <StatNumber>
                    {props.PortfolioGroup.value.toLocaleString(undefined, {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow
                      type={
                        props.PortfolioGroup.percentageChange < 0
                          ? 'decrease'
                          : 'increase'
                      }
                    />
                    {props.PortfolioGroup.percentageChange.toLocaleString(
                      undefined,
                      {
                        style: 'percent',
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      }
                    )}
                  </StatHelpText>
                </Stat>
              </StatGroup>
            </Stack>
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
              <PopoverBody>Delete?</PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </CardBody>
    </Card>
  );
}
