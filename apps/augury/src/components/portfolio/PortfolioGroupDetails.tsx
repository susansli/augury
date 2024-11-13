import { useState } from "react";
import { useParams } from "react-router-dom";

interface Props {

}

export default function PortfolioGroupDetails(Props: Props): JSX.Element {

  const { id: userId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [portfolios, setPortfolios] = useState([]);

  const fetchPortfoliosInGroup = async () => {
    setLoading(true);
    // Load portfolios in group into
  }

  return (
    <>
      {/* Close button */}

      {/* List of portfolios */}

      {/* Add button */}

    </>
  )
}
