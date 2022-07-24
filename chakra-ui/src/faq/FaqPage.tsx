import React from 'react';
import styled from 'styled-components';
import SiteHeader from '../common/SiteHeader';

const StyledDiv = styled.div``;

const FaqPage: React.FC = () => {
  return (
    <StyledDiv className='faq-page'>
      <SiteHeader dark />
    </StyledDiv>
  );
};

export default FaqPage;
