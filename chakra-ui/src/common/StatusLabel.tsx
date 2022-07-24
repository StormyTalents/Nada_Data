import React from 'react';
import styled from 'styled-components';

export const StyledStatusLabel = styled.div`
  display: inline-block;
  padding: 5px 10px;
  background: #efefef;
  border-radius: 6px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
  color: #000;
  transition: background 0.25s cubic-bezier(0.075, 0.82, 0.165, 1),
    color 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
  &.approved,
  &.published,
  &.completed {
    background: #61cdbb;
  }
  &.warn,
  &.in-review,
  &.in-progress {
    background: rgb(241, 225, 91);
  }
  &.draft {
    background: rgb(33, 150, 243);
    color: #fff;
  }
  &.to-do,
  &.incomplete,
  &.error {
    background: #f47560;
    color: #fff;
  }
`;

export const StatusLabelTypes = [
  'completed',
  'warn',
  'in-progress',
  'incomplete',
  'draft',
  'to-do',
  'in-review',
  'approved',
  'published',
  'error'
] as const;

export type StatusLabelType = typeof StatusLabelTypes[number];

const getStatusText = (status?: StatusLabelType) => {
  if (!status) {
    return 'Unknown Status';
  }
  switch (status) {
    case 'in-progress':
      return 'In Progress';
    case 'in-review':
      return 'In Review';
    default:
      // return _.startCase(status);
      return status;
  }
};

export interface StatusLabelProps {
  status?: string;
  color?: StatusLabelType;
}

const StatusLabel: React.FC<StatusLabelProps> = props => {
  const status = props.status?.toLowerCase().trim().replace(' ', '-');
  return (
    <StyledStatusLabel className={`status-label ${props.color || status}`}>
      {getStatusText(status as StatusLabelType)}
    </StyledStatusLabel>
  );
};

export default StatusLabel;
