import { Instagram, Twitter } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';

import { FormikValues } from 'formik';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCreateMailingList } from '../hooks/mailingList/useCreateMailingList';

const StyledDiv = styled.div`
  background-color: #fbf5f2;
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    margin: 1rem 0;
    line-height: 1.8;
    font-size: calc((1.3 - 1) * 1.2vh + 1rem);
    white-space: pre-wrap;
    text-align: center;
  }

  .logo {
    margin: 0 auto;
    width: 200px;
  }
`;
const LandingLayout: React.FC = (props) => {
  const { children } = props;
  const formikRef = useRef<FormikValues>();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const {
    createMailingList,
    createdMailingList,
    emailError,
  } = useCreateMailingList();
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    if (createdMailingList) {
      setSubscribed(true);
    }
    if (formikRef && formikRef.current) {
      formikRef.current.setSubmitting(false);
    }
  }, [createdMailingList, emailError]);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <StyledDiv>
      <div>
        <img
          alt=''
          className='logo center'
          src='/assets/images/logo_haven_landing.png'
        />{' '}
        <h1>Coming soon</h1>
      </div>
    </StyledDiv>
  );
};

export default LandingLayout;
