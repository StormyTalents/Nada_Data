import React from 'react';
import StatusLabel from './StatusLabel';
import styled from 'styled-components';

const StyledStatusLabelContainer = styled.div`
  display: flex;
  .status-label {
    margin-right: 8px;
  }
`;

export function getPublishedStatusLabel(status: string) {
  switch (status) {
    case 'draft':
      return 'Draft';
    case 'published':
      return 'Published';
  }
}

export enum PublishStatus {
  Draft = 'draft',
  Published = 'published'
}

const PublishStatusLabels: React.FC<{
  status: PublishStatus;
  version: number;
}> = ({ status, version }) => {
  const statusLabel = getPublishedStatusLabel(status);
  return (
    <StyledStatusLabelContainer className='status-label-container'>
      {version > 1 && (
        <StatusLabel
          status={`Published v${version - 1}`}
          color={PublishStatus.Published}
        />
      )}
      {status !== PublishStatus.Published && (
        <StatusLabel
          status={`${statusLabel} v${version}`}
          color={status as any}
        />
      )}
    </StyledStatusLabelContainer>
  );
};

export default PublishStatusLabels;
