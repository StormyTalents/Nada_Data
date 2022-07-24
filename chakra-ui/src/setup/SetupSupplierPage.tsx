import * as Yup from 'yup';

import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import {
  FormikGrid,
  FormikSelectField,
  FormikTextField,
} from '@nobrainerlabs/react-material-ui-formik';
import { NumberParam, useQueryParam } from 'use-query-params';
import React, { useEffect, useState } from 'react';
import {
  User,
  avgInvestmentAmountOptions,
  largestInvestmentAmountOptions,
  numInvestedCompaniesOptions,
} from '../interfaces/User';
import { UserContextType, useUserContext } from '../user/UserContext';
import {
  countriesOptions,
  usStatesOptions,
} from '../common/interfaces/Location.interface';

import Button from '@material-ui/core/Button';
import OnboardLayoutCard from '../onboard/cards/OnboardLayoutCard';
import { useNavigate } from 'react-router-dom';
import { useUpdateInvestor } from '../hooks/users/useUpdateInvestor';

export interface UpdateStep1Request {
  countryCode: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface UpdateStep2Request {
  isAccreditedInvestor: boolean;
}

export interface UpdateStep3Request {
  isFirstTimeInvestor: boolean;
  numInvestedCompanies?: number;
  avgInvestmentAmount?: number;
  largestInvestmentAmount?: number;
}

enum Steps {
  Step1Location = 1,
  Step2InvestingLevel = 2,
  Step3InvestingHistory = 3,
  Step4Confirmation = 4,
}

const SetupSupplierPage: React.FC = () => {
  const { user, refreshUser } = useUserContext();
  const navigate = useNavigate();
  const { updatedUser, isUpdating, error, updateUser } = useUpdateInvestor(
    user?.id || 0
  );
  const [showWhyAskDialog, setShowWhyAskDialog] = useState(false);
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const [activeStep = Steps.Step1Location, setActiveStep] = useQueryParam(
    'step',
    NumberParam
  );

  let errorMessage = error
    ? error.statusCode === 403
      ? 'Please make sure you are logged in and try again.'
      : 'There was a problem updating your information. Please try again.'
    : undefined;

  const handleSubmit = async (form: Partial<User>) => {
    errorMessage = undefined;
    updateUser(form);
  };

  useEffect(() => {
    // redirect to login if user is not signed in
    if (!user) {
      navigate('/login');
      return;
    }
    checkRequired(user);
  }, [user]);

  useEffect(() => {
    if (!isUpdating && updatedUser) {
      refreshUser();

      // if user skipped
      if (updatedUser.isSkipped && showSkipDialog) {
        navigate('/');
        return;
      }

      // go to next step
      handleNext();
    }
  }, [updatedUser, isUpdating]);

  // if user is missing any fields, set appropriate step to resume
  function checkRequired(user: UserContextType) {
    if (user && activeStep) {
      if (!user.countryCode || !user.city || !user.state || !user.postalCode) {
        setActiveStep(Steps.Step1Location);
      } else if (user.isAccreditedInvestor === null) {
        setActiveStep(Steps.Step2InvestingLevel);
      }
    }
  }

  function handleSkip() {
    setShowSkipDialog(true);
  }

  function handleNext() {
    const step = activeStep || 0 + 1;

    // if reached the last step
    if (step > Steps.Step4Confirmation) {
      navigate('/');
      return;
    }
    navigate(`?step=${step}`);
  }

  function handleBack() {
    errorMessage = undefined;
    const step = activeStep || 0 - 1;

    // if before first step
    if (step < Steps.Step1Location) {
      navigate('/setup/user-type');
      return;
    }

    navigate(`?step=${step}`);
  }

  return (
    <OnboardLayoutCard>
      {activeStep === Steps.Step1Location && (
        <>
          <Button
            className='skip'
            color='secondary'
            variant='text'
            size='large'
            onClick={() => handleSkip()}
          >
            SKIP
          </Button>
          <Typography variant='h5' className='title'>
            Tell us a little about you
          </Typography>
          <Typography variant='subtitle1' className='subtitle'>
            Where are you located?
          </Typography>

          <Formik
            initialValues={{
              countryCode: user?.countryCode || '',
              city: user?.city || '',
              state: user?.state || '',
              postalCode: user?.postalCode || '',
            }}
            validationSchema={Yup.object().shape({
              countryCode: Yup.string().required('Country is required'),
              city: Yup.string().required('City is required'),
              state: Yup.string().required('State is required'),
              postalCode: Yup.string()
                .required('Postal code is required')
                .matches(/^[0-9]+$/, 'Must be only digits')
                .min(5, 'Must be 5 digits')
                .max(5, 'Must be 5 digits'),
            })}
            validateOnBlur={true}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
            }: FormikProps<UpdateStep1Request>) => (
              <Form className='form'>
                <FormikSelectField
                  variant='outlined'
                  name='countryCode'
                  options={countriesOptions}
                  label='Choose a country'
                ></FormikSelectField>

                <FormikTextField name='city' label='City' />

                <FormikGrid>
                  <FormikSelectField
                    variant='outlined'
                    name='state'
                    options={usStatesOptions}
                    grid={{ xs: 12, md: 6 }}
                    label='State'
                  ></FormikSelectField>

                  <FormikTextField
                    type='postalCode'
                    name='postalCode'
                    label='Postal Code'
                    grid={{ xs: 12, md: 6 }}
                  />
                </FormikGrid>
                <div className='step-button'>
                  <Button
                    variant='contained'
                    color='secondary'
                    size='large'
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    size='large'
                    disabled={isUpdating || Object.keys(errors).length > 0}
                    endIcon={isUpdating && <CircularProgress size={16} />}
                  >
                    Next
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}

      {activeStep === Steps.Step2InvestingLevel && (
        <>
          <Button
            className='skip'
            color='secondary'
            variant='text'
            size='large'
            onClick={() => handleSkip()}
          >
            SKIP
          </Button>
          <Typography variant='h5' className='title'>
            Company Info
          </Typography>

          <Typography variant='subtitle1' className='subtitle'>
            What type of business do you have?
          </Typography>

          <Formik
            initialValues={{
              isAccreditedInvestor: user?.isAccreditedInvestor || false,
            }}
            validationSchema={Yup.object().shape({
              isAccreditedInvestor: Yup.bool().required('Please choose one'),
            })}
            validateOnBlur={true}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              handleChange,
              handleBlur,
            }: FormikProps<UpdateStep2Request>) => (
              <Form className='form'>
                <RadioGroup
                  row
                  aria-label='Is Accredited Investor'
                  name='isAccreditedInvestor'
                  value={values.isAccreditedInvestor}
                >
                  <FormControlLabel
                    key={'isNonAccreditedInvestor'}
                    value={false}
                    control={<Radio color='primary' />}
                    label={'Non-profit'}
                    onChange={(event: any) => {
                      setFieldValue('isAccreditedInvestor', false);
                    }}
                  />

                  <FormControlLabel
                    key={'isAccreditedInvestor'}
                    value={true}
                    control={<Radio color='primary' />}
                    label={'For Profit'}
                    onChange={(event: any) => {
                      setFieldValue('isAccreditedInvestor', true);
                    }}
                  />
                </RadioGroup>

                <div className='step-button'>
                  <Button
                    variant='contained'
                    color='secondary'
                    size='large'
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    size='large'
                    disabled={isUpdating || Object.keys(errors).length > 0}
                    endIcon={isUpdating && <CircularProgress size={16} />}
                  >
                    Next
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}

      {activeStep === Steps.Step3InvestingHistory && (
        <>
          <Button
            className='skip'
            color='secondary'
            variant='text'
            size='large'
            onClick={() => handleSkip()}
          >
            SKIP
          </Button>
          <Typography variant='h5' className='title'>
            Company History
          </Typography>

          <Typography variant='subtitle1' className='subtitle'>
            How large is your company?
          </Typography>

          <Formik
            initialValues={{
              isFirstTimeInvestor: user?.isFirstTimeInvestor || false,
              numInvestedCompanies: user?.numInvestedCompanies || 1,
              avgInvestmentAmount: user?.avgInvestmentAmount || 1,
              largestInvestmentAmount: user?.largestInvestmentAmount || 1,
            }}
            validationSchema={Yup.object().shape({
              isFirstTimeInvestor: Yup.bool().required('Please choose one'),
            })}
            validateOnBlur={true}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              handleChange,
              handleBlur,
            }: FormikProps<UpdateStep3Request>) => (
              <Form className='form investing-history'>
                <RadioGroup
                  row
                  aria-label='Is First Time Investor'
                  name='isFirstTimeInvestor'
                  value={values.isFirstTimeInvestor}
                >
                  <FormControlLabel
                    key={'isNonFirstTimeInvestor'}
                    value={false}
                    control={<Radio color='primary' />}
                    label={'Yes, I have'}
                    onChange={(event: any) => {
                      setFieldValue('isFirstTimeInvestor', false);
                    }}
                  />

                  {!values.isFirstTimeInvestor && (
                    <Grid
                      container
                      spacing={3}
                      className='investing-history-options'
                    >
                      <FormikSelectField
                        variant='outlined'
                        name='numInvestedCompanies'
                        label='How many employees?'
                        options={numInvestedCompaniesOptions}
                      />

                      <FormikSelectField
                        variant='outlined'
                        name='avgInvestmentAmount'
                        label='Average annual income amount?'
                        options={avgInvestmentAmountOptions}
                      />
                    </Grid>
                  )}

                  <FormControlLabel
                    key={'isFirstTimeInvestor'}
                    value={true}
                    control={<Radio color='primary' />}
                    label={'Nope, first time!'}
                    onChange={(event: any) => {
                      setFieldValue('isFirstTimeInvestor', true);
                    }}
                  />
                </RadioGroup>

                <div className='step-button'>
                  <Button
                    variant='contained'
                    color='secondary'
                    size='large'
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    size='large'
                    disabled={isUpdating || Object.keys(errors).length > 0}
                    endIcon={isUpdating && <CircularProgress size={16} />}
                  >
                    Next
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
      {activeStep === Steps.Step4Confirmation && (
        <>
          <Typography variant='h5' className='title'>
            Thank You!
          </Typography>
          <Typography variant='body1'>
            You've completed the supplier onboarding. We will soon match you up
            with potential buyers.
          </Typography>
          <Button
            variant='contained'
            color='primary'
            size='large'
            className='step-button'
            onClick={() => navigate('/')}
          >
            Start Browsing
          </Button>
        </>
      )}

      {!isUpdating && errorMessage && (
        <Typography color='error' variant='body2' className='center error'>
          {errorMessage}
        </Typography>
      )}
      <Dialog open={showSkipDialog}>
        <DialogTitle>Skip this for now?</DialogTitle>
        <DialogContent>
          If you wish to skip this for now, you can always come back to finish
          it at a later time. You will be asked to fill out this page again when
          you try to invest in a project.
        </DialogContent>
        <DialogActions>
          <Button
            color='primary'
            onClick={() => updateUser({ isSkipped: true })}
          >
            Skip
          </Button>
          <Button onClick={() => setShowSkipDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </OnboardLayoutCard>
  );
};

export default SetupSupplierPage;
