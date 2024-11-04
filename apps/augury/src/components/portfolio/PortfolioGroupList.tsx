import { useState } from 'react';
import { PortfolioGroupData } from './PortfolioTypes';
import PortfolioGroup from './PortfolioGroup';

export default function PortfolioGroupList(): JSX.Element {
  const [portfolioGroups, SetPortfolioGroups] = useState<PortfolioGroupData[]>([]);
  return (
    <>
      {portfolioGroups.map((element, index) => {
        return <PortfolioGroup key={index} PortfolioGroup={element} />;
      })}
    </>
  );
}
