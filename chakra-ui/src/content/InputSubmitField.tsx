import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Button, InputBase } from '@material-ui/core';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useCreateMailingList } from '../hooks/mailingList/useCreateMailingList';
import { AppSnackbar } from '@nobrainerlabs/react-material-ui';

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border: solid 2px rgba(89, 118, 105, 0.25);
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 5px;
  height: 50px;
  margin: 0px;
  .email-subscribe {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    position: relative;
    background-color: transparent;
    margin: 0px;
    padding-top: 5px;
    ${(props) => props.theme.breakpoints.down('md')} {
      padding-top: 0px;
    }
  }
  .mailing-text {
    padding-right: 5px;
    ${(props) => props.theme.breakpoints.down('xs')} {
      display: none;
    }
  }
  .subscribe {
    padding-right: 2px;
  }
  .button {
    color: white;
    background-color: #507768;
    width: 50px;
    height: 30px;
    font-size: 10px;
  }
  .input-base {
    color: white;
    margin: 5px;
    font-size: 10px;
    width: 100%;
    height: 40px;
  }
  .inner-input {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const InputSubmitField: React.FC<{
  buttonLabel: string;
}> = ({ buttonLabel }) => {
  const { createdMailingList, isCreating, emailError, createMailingList } =
    useCreateMailingList();
  const [inputEmail, setInputEmail] = useState('');

  const onChange = (event: any) => {
    setInputEmail(event.target.value);
  };
  return (
    <InputContainer>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object().shape({
          email: Yup.string().trim().email('Invalid email.'),
        })}
        onSubmit={() => {
          createMailingList({ email: inputEmail });
          setInputEmail('');
        }}
      >
        <Form autoComplete="off">
          <div className="inner-input">
            <InputBase
              id="email"
              name="email"
              type="text"
              className="input-base"
              placeholder="email address"
              onChange={onChange}
              value={inputEmail}
            />
            <div className="subscribe">
              <Button type="submit" className="button" disabled={isCreating}>
                {buttonLabel}
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
      <AppSnackbar severity="error" open={!!emailError}>
        {emailError && emailError.message === 'Invalid Email'
          ? emailError.message
          : 'Network Error. Try again later.'}
      </AppSnackbar>
    </InputContainer>
  );
};

export default InputSubmitField;
