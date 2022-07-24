import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledDiv = styled.div`
  max-width: 1440px;
  margin: 0 auto;

  font-family: 'Inter', sans-serif !important;
  h4,
  h6,
  button,
  input {
    font-family: 'Inter', sans-serif !important;
  }

  .header {
    font-size: 36px;
  }

  .subheader {
    font-size: 18px;
  }

  .subheader-2 {
    font-size: 52px;
    line-height: 63px;
  }

  .header {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 38px;
    color: #101828;
  }

  .header-2 {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 100px;
    line-height: 121px;
    color: #101828;
  }

  .logo {
    margin-top: 70px;
    margin-bottom: 50px;
  }

  .MuiFormControl-root {
    padding: 0;
  }

  .Mui-error {
    margin-bottom: 0px;
  }

  a:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  button:hover {
    font-weight: 600;
  }

  button:active {
    background-color: #333333;
  }

  button:disabled {
    color: #999;
  }

  .select-logo {
    width: 58.71px
    height: 35.74px
  }

  .select-card {
    background: #F9FAFB;
    border-radius: 4px;
    width: 528px;
    height: 105px;

    &:hover {
      cursor: pointer;
    }
  }

  .select-card-checked, .select-card:hover {
    border: 1px solid #1656C6;
  }

  .select-user-tick {
    width: 26.37px
    height: 20.04px
  }

  .select-user-text {
    color: #667085;
    width: 340px;
  }

  .select-purple-ball {
    background: #7D69FF;
    width: 32px;
    height: 32px;
    border-radius: 99px;
  }

  ${(props) => props.theme.breakpoints.down('md')} {
    .select-card {
      width: 100%;
    }
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    .select-card {
      width: 100%;
      height: 77px;
    }

    .select-logo {
      width: 51px;
      height: 31.04px;
    }

    .select-user-text {
      width: 229px;
    }

    .select-purple-ball {
      width: 27px;
      height: 27px;
    }

    .header-2 {
      font-size: 45px;
      line-height: 54.46px;
    }

    .subheader-2 {
      font-size: 32px;
      line-height: 38.73px;
    }
  }

  .error {
    color: #D8000C;
  }


`;

const OnboardCard: React.FC = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default OnboardCard;
