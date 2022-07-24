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
  certifications: any;
}

const StyledDiv = styled.div``;

function useFindCertifications() {
  return useQuery('certifications', async () => {
    const { data } = await api.axios.get('/certifications');
    return data;
  });
}

const OnboardCertificationsCard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [type = OrganizationType.Buyer, setType] = useQueryParam(
    'type',
    StringParam
  );
  const [selectedCertifications, setSelectedCertifications] = useState<
    Certification[]
  >();
  const findCertifications = useFindCertifications();
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
      navigate(`/onboard/industrycodes?type=${type}`);
    }
  }, [navigate, type, updatedOrganization]);

  let header = 'Who are you looking to buy from?';
  let subheader = "Select the certifications that you're interested in!";
  if (type === OrganizationType.Supplier) {
    header = `Ok ${user?.firstName}, what makes your business unique?`;
    subheader = `Select your certifications`;
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
          if (!selectedCertifications) {
            return false;
          }
          organization.interestedCertifications = selectedCertifications;
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
                  {findCertifications.data?.data && (
                    <Autocomplete
                      multiple
                      loading={findCertifications.isFetching}
                      id='tags-outlined'
                      options={findCertifications.data.data}
                      getOptionLabel={(option: Certification) => option.name}
                      filterSelectedOptions
                      onChange={(e, value) => {
                        setSelectedCertifications(value);
                      }}
                      disableCloseOnSelect
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='Choose Certifications'
                          placeholder='Certifications'
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {findCertifications.isFetching ? (
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
              <img alt='top' src='/assets/images/onboard/signup.svg' />
            </div>
          </div>
        </div>
      </form>
    </StyledDiv>
  );
};

export default OnboardCertificationsCard;
