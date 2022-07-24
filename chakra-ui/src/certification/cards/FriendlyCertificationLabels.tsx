import {
  Certification,
  getFriendlyCertificationColor,
  getFriendlyCertificationColorRevised,
  getFriendlyCertificationColorRevisedDot,
} from '../Certification';
import { Chip, Tooltip } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import {
  VerifiedUser,
  VerifiedUserOutlined,
  VerifiedUserTwoTone,
} from '@material-ui/icons';

import { XCircleIcon } from '@heroicons/react/solid';
import styled from 'styled-components';

const StyledDiv = styled.div`
  .opportunity-badge span::before {
    content: '•';
    margin: 0 5px 0 0;
    width: 1em;
    font-size: 1rem;
    vertical-align: center;
  }

  .opportunity-small-business span::before {
    color: #3970ff;
  }

  .opportunity-8a span::before {
    color: #5dccb1;
  }

  .opportunity-disability span::before {
    color: #026a3f;
  }

  .opportunity-dbe span::before {
    color: #fec337;
  }

  .opportunity-veteran span::before {
    color: #ffffff;
  }

  .opportunity-woman span::before {
    color: #e14034;
  }

  .opportunity-minority span::before {
    color: #9470de;
  }

  .opportunity-local span::before {
    color: #3cc5e7;
  }
`;

const FriendlyCertificationLabels: React.FC<{
  certifications?: Certification[];
  style?: {};
  classNames?: string;
  size?: any;
  showNumOfOpps?: number;
  setExpandCertifications?: any;
}> = ({
  certifications,
  style,
  size = 'small',
  classNames = 'flex gap-2 content-center justify-items-center flex-wrap relative opportunity-badge',
  showNumOfOpps,
  setExpandCertifications,
}) => {
  const friendlyNames = [];
  let totalFriendlyNamesCount = 0;
  let uniqueFriendlyNames: string[] = [];
  if (certifications) {
    for (const cert of certifications) {
      if (cert.friendlyNames) {
        for (const name of cert?.friendlyNames) {
          friendlyNames.push(name);
        }
      }
    }

    uniqueFriendlyNames = friendlyNames.filter((v, i, a) => a.indexOf(v) === i);
    totalFriendlyNamesCount = uniqueFriendlyNames?.length;
    uniqueFriendlyNames = showNumOfOpps
      ? uniqueFriendlyNames.slice(0, showNumOfOpps)
      : uniqueFriendlyNames;
  }

  return (
    <>
      {certifications && (
        <div style={style}>
          <>
            <StyledDiv>
              <div className={classNames}>
                {uniqueFriendlyNames.map((name, i) => (
                  <Chip
                    label={name}
                    key={i}
                    className={getFriendlyCertificationColorRevisedDot(name)}
                    style={{
                      ...getFriendlyCertificationColorRevised(name),
                    }}
                    size={size}
                  ></Chip>
                ))}

                {uniqueFriendlyNames &&
                  uniqueFriendlyNames?.length >= 3 &&
                  uniqueFriendlyNames?.length < totalFriendlyNamesCount && (
                    <button
                      type='button'
                      onClick={() =>
                        setExpandCertifications && setExpandCertifications(true)
                      }
                      className='rounded-full font-semibold tracking-wider'
                    >
                      +{totalFriendlyNamesCount - 3}
                    </button>
                  )}
              </div>
            </StyledDiv>
          </>
        </div>
      )}
    </>
  );
};

export default FriendlyCertificationLabels;
