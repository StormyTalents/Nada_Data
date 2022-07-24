import {
  Checkbox,
  Chip,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import { useMutation, useQuery } from 'react-query';

import { Autocomplete } from '@material-ui/lab';
import { Certification } from '../../certification/Certification';
import { Industrycode } from '../../industrycode/Industrycode';
import Multiselect from 'multiselect-react-dropdown';
import { Organization } from '../../interfaces/Organization';
import { OrganizationType } from '../../organization/organization.interface';
import api from '../../common/api/api';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateOrganization } from '../../hooks/organizations/useUpdateOrganization';
import { useUserContext } from '../../user/UserContext';

interface Request {
  industrycodes: any;
}

const StyledDiv = styled.div``;

function useFindIndustryCodes() {
  return useQuery('industrycodes', async () => {
    const { data } = await api.axios.get('/industrycodes');
    return data;
  });
}

const OnboardIndustryCodesCard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [selectedIndustryCodes, setSelectedIndustryCodes] = useState<
    Industrycode[]
  >();
  const findIndustryCodes = useFindIndustryCodes();
  const [type = OrganizationType.Buyer, setType] = useQueryParam(
    'type',
    StringParam
  );
  const {
    updateOrganization,
    updatedOrganization,
    isUpdating,
    error,
  } = useUpdateOrganization(user?.activeUserOrganization?.organizationId || 0);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Request>({ reValidateMode: 'onSubmit' });

  useEffect(() => {
    if (updatedOrganization) {
      navigate(`/onboard/complete`);
    }
  }, [navigate, updatedOrganization]);

  let header = 'Last step! Goods & Services';
  let subheader = 'Pick a few things that you’re looking to buy.';
  if (type === OrganizationType.Supplier) {
    subheader = `What does ${user?.activeUserOrganization?.organization?.name} do?`;
  }
  return (
    <StyledDiv>
      <form
        method='POST'
        onSubmit={handleSubmit(() => {
          const organization = user?.activeUserOrganization?.organization;
          if (!organization) {
            return false;
          }
          if (!selectedIndustryCodes) {
            return false;
          }
          organization.industryCodes = selectedIndustryCodes;
          updateOrganization(organization);
        })}
      >
        <div className='main grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8'>
          <div className='main-left lg:px-12 md:px-8 sm:px-4 px-4'>
            <div className='logo'>
              <img alt='logo' src='/assets/images/onboard/logo.svg' />
            </div>
            <div className='body'>
              <div className='header'>{header}</div>
              <div className='subheader pt-2'>{subheader}</div>
              <div className='form mt-4'>
                <div>
                  {findIndustryCodes.data?.data && (
                    <Autocomplete
                      multiple
                      loading={findIndustryCodes.isFetching}
                      id='tags-outlined'
                      options={findIndustryCodes.data.data}
                      getOptionLabel={(option: Industrycode) => option.name}
                      filterSelectedOptions
                      onChange={(e, value) => {
                        setSelectedIndustryCodes(value);
                      }}
                      disableCloseOnSelect
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='Choose IndustryCodes'
                          placeholder='IndustryCodes'
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {findIndustryCodes.isFetching ? (
                                  <CircularProgress />
                                ) : null}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  )}
                </div>
              </div>

              <button
                className='text-white w-full bg-black rounded h-12 leading-6 text-base mt-8'
                type='submit'
                disabled={isUpdating}
              >
                {isUpdating ? <CircularProgress size='20px' /> : 'Next'}
              </button>
            </div>
          </div>

          <div className='main-right '>
            <div className='top flex justify-end'>
              <img alt='top' src='/assets/images/onboard/industrycode.svg' />
            </div>
          </div>
        </div>
      </form>
    </StyledDiv>
  );
};

export default OnboardIndustryCodesCard;
