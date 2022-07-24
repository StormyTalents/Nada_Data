import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Icon, IconButton, Popover, MenuItem, Menu } from '@material-ui/core';

const StyledButton = styled(IconButton)`
  .add-icon {
    color: #ccc;
  }
`;
const StyledPopover = styled(Menu)``;

export interface ConfigIconMenuOptions {
  value: string | number;
  label: string | JSX.Element;
}

export interface ConfigIconMenuProps {
  value?: string;
  onChange?: (value: string) => void;
  options: ConfigIconMenuOptions[];
}

export const ConfigIconMenu: React.FC<ConfigIconMenuProps> = ({
  options,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState(props.value);
  const timerRef = useRef<any>();
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement>();
  // handle value reset from parent
  useEffect(() => setValue(value), [value]);
  return (
    <>
      <StyledButton
        className="config-icon-menu"
        size="small"
        onClick={(event) => setAnchorElement(event.currentTarget)}
      >
        {value ? <Icon>{value}</Icon> : <Icon className="add-icon">add</Icon>}
      </StyledButton>
      {anchorElement && (
        <StyledPopover
          anchorEl={anchorElement}
          keepMounted
          open={Boolean(anchorElement)}
          onClose={(e) => setAnchorElement(undefined)}
          PaperProps={{
            style: {
              width: 240,
              overflow: 'hidden',
            },
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {options.map((option) => {
            <MenuItem key={option.value}>{option.label}</MenuItem>;
          })}
        </StyledPopover>
      )}
    </>
  );
};

export default ConfigIconMenu;
