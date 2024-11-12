import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
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
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  PortfolioGroup: PortfolioGroupData;
  key: number;
}

export default function PortfolioGroup(props: Props): JSX.Element {
  return (
    <Card flex="1">
      <CardBody>
        <Flex direction="row" gap="1em">
          <Box flexGrow="1">
            <Stack>
              <Heading fontSize="2xl">{props.PortfolioGroup.label}</Heading>
              <Text fontSize="sm">
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
                  <StatHelpText verticalAlign="baseline">
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
              <IconButton
                margin="auto"
                icon={
                  <Icon
                    as={FontAwesomeIcon}
                    icon={faEllipsisVertical}
                    color="text.body"
                  />
                }
                aria-label="Edit Portfolio Group"
                colorScheme="gray"
                borderRadius="10%"
                size="lg"
                shadow="lg"
              />
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
