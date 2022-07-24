import { Card, Icon } from '@material-ui/core';
import {
  AppSnackbar,
  CardContent,
  CardTitle,
} from '@nobrainerlabs/react-material-ui';
import {
  InlineForm,
  InlineFormik,
  InlineTextField,
} from '@nobrainerlabs/react-material-ui-formik';
import { FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';

import InlineSelect from '../../common/inline/InlineSelectField';
import { useFindOpportunity } from '../../hooks/opportunities/useFindOpportunity';
import { useUpdateOpportunity } from '../../hooks/opportunities/useUpdateOpportunity';
import {
  Opportunity,
  opportunityStatusOptions,
} from '../../interfaces/Opportunity';

const OpportunityStatusCard: React.FC<{
  opportunityId: number;
  onLoad?: (opportunity: Opportunity) => void;
}> = ({ opportunityId, onLoad }) => {
  const formikRef = useRef<FormikValues>();
  const {
    opportunity,
    findOpportunity,
    loadingOpportunity,
    loadingError,
  } = useFindOpportunity(+opportunityId || 0, true);
  const { updateOpportunity, isUpdating, error } = useUpdateOpportunity(
    +opportunityId
  );

  return (
    <Card>
      <CardTitle>
        <Icon>person</Icon>
        Status
      </CardTitle>

      <CardContent>
        <div>
          <InlineFormik
            innerRef={(formik: any) => (formikRef.current = formik)}
            initialValues={{ ...opportunity }}
            isSubmitting={isUpdating}
            error={error}
            onSubmit={(form: Partial<Opportunity>) => {
              updateOpportunity(form);
              window.location.reload();
            }}
          >
            <InlineForm>
              <InlineSelect
                name='status'
                label='Status!'
                style={{ backgroundColor: 'white', width: 200 }}
                options={opportunityStatusOptions}
              />
            </InlineForm>
          </InlineFormik>
        </div>
        <AppSnackbar severity='error' open={Boolean(error)}>
          There was an error saving.
        </AppSnackbar>
      </CardContent>
    </Card>
  );
};

export default OpportunityStatusCard;
