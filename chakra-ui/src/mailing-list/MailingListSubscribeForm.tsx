import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Button, CircularProgress, InputBase, Typography } from '@material-ui/core';
import { AppSnackbar } from '@nobrainerlabs/react-material-ui';

import { useCreateMailingList } from '../hooks/mailingList/useCreateMailingList';
import { useEffect } from 'react';

const StyledDiv = styled.div`
  .subscribe {
    margin-top: 10px;
    input {
      padding: 18px 24px;
    }
    button {
      margin-right: 12px;
    }
  }
  .subscribe-input {
    background-color: white;
    border-radius: 100px;
    border: 0;
  }
  .email-container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 0px;
    border-radius: 100px;
    background: white;
    color: black;
    input,
    input:focus {
      font-size: 16px;
      background: none;
      border: 0;
      outline: 0;
    }
    button {
      width: 35%;
      min-width: 108px;
      margin-right: 10px;
      padding: 0 20px;
      border: 2px solid ${props => props.theme.palette.primary.main};
      box-sizing: border-box;
      border-radius: 40px;
    }
  }
`;

const MailingListSubscribeForm: React.FC = () => {
  const formikRef = useRef<FormikProps<FormikValues> | null>();
  const {
    createdMailingList,
    isCreating,
    emailError,
    createMailingList
  } = useCreateMailingList();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (createdMailingList) {
      formikRef.current?.resetForm();
    }
  }, [createdMailingList]);
  return (
    <StyledDiv className='subscribe-container'>
      <div className='subscribe'>
        <Formik
          innerRef={(formik: any) => (formikRef.current = formik)}
          initialValues={{ email: '' }}
          validationSchema={Yup.object().shape({
            email: Yup.string().trim().email('Invalid email')
          })}
          onSubmit={() => {
            createMailingList({ email });
          }}
        >
          <Form autoComplete='off'>
            <div className='email-container'>
              {createdMailingList && (
                <Typography variant='subtitle1'>You are now subscribed!</Typography>
              )}
              {!createdMailingList && (
                <>
                  <InputBase
                    name='email'
                    type='text'
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                  />

                  <Button
                    fullWidth
                    endIcon={
                      isCreating && (
                        <CircularProgress color='primary' size={20} />
                      )
                    }
                    variant='outlined'
                  >
                    Subscribe
                  </Button>
                </>
              )}
            </div>
          </Form>
        </Formik>
      </div>
      {emailError && (
        <AppSnackbar severity='error' open>
          {emailError && emailError.message === 'email already exists'
            ? 'You are already subscribed'
            : 'Network Error. Try again later.'}
        </AppSnackbar>
      )}
      {createdMailingList && (
        <AppSnackbar severity='success' open>
          Thank you for signing up!
        </AppSnackbar>
      )}
    </StyledDiv>
  );
};

export default MailingListSubscribeForm;
