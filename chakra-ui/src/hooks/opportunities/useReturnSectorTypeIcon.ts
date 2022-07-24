import { useCallback } from 'react';

export function useReturnSectorTypeIcon() {
  const changeIconForSectorType = useCallback((sectorType?: string) => {
    if (sectorType === 'Government Opportunity') {
      return 'government_opportunity_icon';
    } else if (sectorType === 'Supplier Diversity Opportunity') {
      return 'diversity_opportunity_icon';
    } else if (sectorType === 'Supplier Diversity Program') {
      return 'diversity_opportunity_icon';
    } else if (sectorType === 'Relationship Opportunity') {
      return 'relationship_opportunity_icon';
    } else if (sectorType === 'Future Opportunity') {
      return 'future_opportunity_icon';
    } else {
      return 'government_opportunity_icon';
    }
  }, []);

  return {
    changeIconForSectorType,
  };
}
