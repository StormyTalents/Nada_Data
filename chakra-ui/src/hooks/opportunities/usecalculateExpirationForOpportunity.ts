import { useCallback } from 'react';
import {
  formatDistance,
  differenceInDays,
  differenceInCalendarDays,
} from 'date-fns';

export const useCalculateExpirationForOpportunity = () => {
  const calculateExpirationForOpportunity = useCallback((endDate: any) => {
    const resultOfDifference = differenceInCalendarDays(
      new Date(endDate),
      new Date()
    );

    if (resultOfDifference < 2) {
      return 'orange-circle-expiration';
    } else if (resultOfDifference > 1 && resultOfDifference < 5) {
      return 'yellow-circle-expiration';
    } else if (resultOfDifference >= 5) {
      return 'green-circle-expiration';
    }
  }, []);

  return {
    calculateExpirationForOpportunity,
  };
};
