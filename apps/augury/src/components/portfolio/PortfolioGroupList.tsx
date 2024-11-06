import { useState } from 'react';
import { CreatePortfolioGroup, PortfolioGroupData } from './PortfolioTypes';
import PortfolioGroup from './PortfolioGroup';
import { Button, Stack } from '@chakra-ui/react';

export default function PortfolioGroupList(): JSX.Element {
  const [portfolioGroups, SetPortfolioGroups] = useState<PortfolioGroupData[]>(
    []
  );

  function CreatePortfolioGroupCardTest() {
    const portfolios = [
      {
        id: 'P1',
        label: 'Portfolio 1',
        value: 821,
        prev: 745,
      },
      {
        id: 'P2',
        label: 'Portfolio 2',
        value: 634,
        prev: 624,
      },
    ];

    const portfolios2 = [
      {
        id: 'P3',
        label: 'Portfolio 3',
        value: 1213,
        prev: 1532,
      },
      {
        id: 'P2',
        label: 'Portfolio 2',
        value: 634,
        prev: 624,
      },
    ];
    const portfolios3 = [
      {
        id: "P4",
        label: 'Portfolio 4',
        value: 500,
        prev: 500
      }
    ]

    const g1 = CreatePortfolioGroup(portfolios, 'g1', 'Group1');
    const g2 = CreatePortfolioGroup(portfolios2, 'g2', 'Group2');
    const g3 = CreatePortfolioGroup(portfolios3, 'g3', 'Group3')

    SetPortfolioGroups([g1, g2, g3]);
  }

  return (
    <>
      <Stack>
        {portfolioGroups.map((element, index) => {
          return <PortfolioGroup key={index} PortfolioGroup={element} />;
        })}
      </Stack>

      <Button onClick={() => CreatePortfolioGroupCardTest()} />
    </>
  );
}
