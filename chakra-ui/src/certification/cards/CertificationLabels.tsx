import { Chip, ListItem, Tooltip } from '@material-ui/core';
import { CardMembership } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Certification } from '../Certification';

const StyledDiv = styled.div`
  .chip:hover {
    font-weight: bold;
    border: 1px solid #ccc;
  }
`;

const CertificationLabels: React.FC<{
  certifications?: Certification[];
  style?: {};
}> = ({ certifications, style }) => {
  return (
    <StyledDiv>
      {certifications && (
        <div style={style}>
          {/* {certifications.map((certification) => certification.name).join(', ')} */}
          {certifications.map((certification, i) => (
            <a href={certification.link} target='_blank' rel='noreferrer'>
              <Tooltip key={i} title={certification.fullName}>
                <Chip
                  key={i}
                  className='chip text-gray-700 font-semibold'
                  avatar={<CardMembership />}
                  label={certification?.name}
                  size='medium'
                  style={{
                    //backgroundColor: certification.bgColor,
                    //color: certification.textColor,
                    backgroundColor: 'transparent',
                    //color: "gray",
                    marginRight: 4,
                    cursor: 'pointer',
                    borderRadius: 0,
                  }}
                />
              </Tooltip>
            </a>
          ))}
        </div>
      )}
    </StyledDiv>
  );
};

export default CertificationLabels;
