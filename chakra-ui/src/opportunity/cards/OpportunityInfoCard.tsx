import { Box, Card, Icon, Typography } from '@material-ui/core';
import { createFilterOptions, FilterOptionsState } from '@material-ui/lab';
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
import { InlineDateTimePicker } from '@nobrainerlabs/react-material-ui-formik-pickers';
import { FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import { Certification } from '../../certification/Certification';
import { useFindCertifications } from '../../certification/hooks/useFindCertifications';
import InlineAutocompleteSelect from '../../common/inline/InlineAutocompleteSelect';
import InlineMultiSelectChip from '../../common/inline/InlineMultiSelectChip';
import InlineMultiSelectChipAddable from '../../common/inline/InlineMultiSelectChipAddable';
import InlineSelectField from '../../common/inline/InlineSelectField';
import { useFindOpportunity } from '../../hooks/opportunities/useFindOpportunity';
import { useUpdateOpportunity } from '../../hooks/opportunities/useUpdateOpportunity';
import { useFindOrganizations } from '../../hooks/organizations/useFindOrganizations';
import { useFindIndustrycodes } from '../../industrycode/hooks/useFindIndustrycodes';
import { Industrycode } from '../../industrycode/Industrycode';
import {
  Opportunity,
  OpportunitySectorType,
  OpportunityType,
} from '../../interfaces/Opportunity';
import { Keyword } from '../../keyword/Keyword';
import { useFindKeywords } from '../../keyword/useFindKeywords';
import { useFindSources } from '../../source/hooks/useFindSources';
import { useUserContext } from '../../user/UserContext';

const OpportunityInfoCard: React.FC<{
  opportunityId: number;
  onLoad?: (opportunity: Opportunity) => void;
}> = ({ opportunityId, onLoad }) => {
  const formikRef = useRef<FormikValues>();
  const { user } = useUserContext();
  const {
    opportunity,
    findOpportunity,
    loadingOpportunity,
    loadingError,
  } = useFindOpportunity(+opportunityId || 0, true);
  const { sourceList, findSources } = useFindSources(true);
  const { certificationList, findCertifications } = useFindCertifications(true);
  const { industrycodeList, findIndustrycodes } = useFindIndustrycodes();
  const {
    updatedOpportunity,
    updateOpportunity,
    isUpdating,
    error: updateError,
  } = useUpdateOpportunity(+opportunityId || 0);
  const [initialValues, setInitialValues] = useState<Partial<Opportunity>>();
  const [certificationOptions, setCertificationOptions] = useState<
    Certification[]
  >();
  const [industrycodeOptions, setIndustrycodeOptions] = useState<
    Industrycode[]
  >();
  const [keywordOptions, setKeywordOptions] = useState<Keyword[]>();

  const { organizationList, findOrganizations } = useFindOrganizations();

  const { keywordList, findKeywords } = useFindKeywords();
  const filter = createFilterOptions();

  const handleChange = (e: any) => {
    console.log('CHANGEDINGING', e);
  };

  // set keywordList
  useEffect(() => {
    findKeywords({
      type: 'opportunity',
    });
  }, [findKeywords]);

  // set the initial state of the form once loaded
  useEffect(() => {
    if (opportunity) {
      setInitialValues({
        ...opportunity,
      });
    }
  }, [opportunity]);

  useEffect(() => {
    findOrganizations({
      order: 'organization.name',
      direction: 'ASC',
    });
  }, []);

  useEffect(() => {
    setCertificationOptions(certificationList?.data || []);
  }, [certificationList]);

  useEffect(() => {
    setIndustrycodeOptions(industrycodeList?.data || []);
  }, [industrycodeList]);

  useEffect(() => {
    if (keywordList) {
      setKeywordOptions(keywordList?.data || []);
    }
  }, [keywordList]);

  useEffect(() => {
    if (updatedOpportunity) {
      findOpportunity();
    }
  }, [updatedOpportunity]);

  return (
    <Card>
      <CardTitle>
        <Icon>person</Icon>
        Opportunity #{opportunity?.id}
      </CardTitle>

      <CardContent padding='large'>
        {!opportunity && !loadingOpportunity && (
          <Box>
            <Typography variant='body2' color='error'>
              User is not part of this organization
            </Typography>
          </Box>
        )}

        {opportunity && (
          <InlineFormik
            innerRef={(formik: any) => (formikRef.current = formik)}
            initialValues={initialValues}
            validationSchema={Yup.object().shape({})}
            isSubmitting={isUpdating}
            error={updateError}
            onSubmit={(opportunity: Partial<Opportunity>) => {
              updateOpportunity(opportunity);
            }}
          >
            <InlineForm>
              <InlineTextField
                name='name'
                label='Name'
                placeholder='Name'
                grid={{ xs: 12 }}
              />
              <InlineTextField
                name='refName'
                label='Reference Name (Read-only for internal use)'
                placeholder='Reference Name'
                grid={{ xs: 12 }}
                disabled={true}
              />
              {organizationList && (
                <InlineSelectField
                  name='organizationId'
                  label='Organization'
                  //optionLabel={(optionLabel: any) => optionLabel.name}
                  // options={certificationOptions}
                  //options={organizationList.data}

                  options={organizationList?.data.map((organization) => {
                    return {
                      label: organization.name,
                      value: organization.id,
                    };
                  })}
                  grid={{ xs: 6 }}
                />
                /*
                <InlineAutocompleteSelect
                  name="organizationId"
                  label="Organization"
                  optionLabel={(optionLabel) => optionLabel.name}
                  // options={certificationOptions}
                  options={organizationList.data}
                  grid={{ xs: 6 }}
                />*/
              )}
              <InlineSelectField
                name='sourceId'
                label='Source'
                labelHtml={`<a style='margin-left: 4px;' href='${opportunity?.refUrl}' target='_blank'>(Open Source Link)</a>`}
                options={sourceList?.data.map((source) => {
                  return {
                    label: source.name,
                    value: source.id,
                  };
                })}
                grid={{ xs: 6 }}
              />

              <InlineTextField
                name='refId'
                label='Reference ID'
                placeholder='reference id number of source site'
                grid={{ xs: 12 }}
              />

              {/* <InlineImage
                name="imageUrl"
                label="Image"
                s3Path={FolderPaths.UserImages}
                grid={{ xs: 12 }}
              /> */}
              <InlineTextField
                name='description'
                label='Description'
                multiline
                placeholder='Description'
                grid={{ xs: 12 }}
              />
              <InlineTextField
                name='placeOfPerformance'
                label='Place Of Performance'
                placeholder='eg; Los Angeles, CA'
                grid={{ xs: 12 }}
              />
              <InlineTextField
                name='city'
                label='City'
                placeholder='City'
                grid={{ xs: 6 }}
              />
              <InlineTextField
                name='state'
                label='State'
                placeholder='State'
                grid={{ xs: 6 }}
              />

              <InlineSelectField
                name='type'
                label='Type'
                options={Object.values(OpportunityType).map((type) => {
                  return {
                    label: type,
                    value: type,
                  };
                })}
                grid={{ xs: 6 }}
              />

              <InlineSelectField
                name='sectorType'
                label='Haven Type'
                options={Object.values(OpportunitySectorType).map((type) => {
                  return {
                    label: type,
                    value: type,
                  };
                })}
                grid={{ xs: 6 }}
              />

              <InlineMultiSelectChip
                name='certifications'
                label='What certifications does it have?'
                options={certificationOptions}
                optionLabel={(optionLabel) => optionLabel.name}
              />
              <InlineMultiSelectChip
                name='industrycodes'
                label='What industry codes does it have?'
                options={industrycodeOptions}
                onInputChange={(event: any, value) => {
                  findIndustrycodes({
                    search: value,
                  });
                }}
                optionLabel={(optionLabel) => {
                  return `${optionLabel.code}: ${optionLabel.name}`;
                }}
              />
              <InlineMultiSelectChipAddable
                name='keywords'
                label='Keywords'
                options={keywordOptions}
                onInputChange={(e: any, value) => {
                  findKeywords({
                    search: value,
                  });
                }}
                optionLabel={(option) => {
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return `${option.name}`;
                }}
                filterOptions={(
                  options: any[],
                  params: FilterOptionsState<any>
                ) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  const isExisting = options.some(
                    (option: any) => inputValue === option.name
                  );
                  if (inputValue !== '' && !isExisting) {
                    filtered.push({
                      name: inputValue,
                      type: 'opportunity',
                      createdBy: user?.id,
                      modifiedBy: user?.id,
                    });
                  }
                  return filtered;
                }}
              />

              <InlineDateTimePicker
                name='beginDate'
                label='Begin Date'
                placeholder='Opportunity start date'
                grid={{ xs: 6 }}
              />

              <InlineDateTimePicker
                name='endDate'
                label='End Date'
                placeholder='Opportunity end date'
                grid={{ xs: 6 }}
              />

              <InlineTextField
                name='secondaryUrl'
                label='Secondary Link'
                placeholder='https://somewebsite.com'
                grid={{ xs: 12 }}
              />
            </InlineForm>
          </InlineFormik>
        )}
        <AppSnackbar severity='error' open={Boolean(updateError)}>
          There was an error saving.
        </AppSnackbar>
      </CardContent>
    </Card>
  );
};

export default OpportunityInfoCard;
