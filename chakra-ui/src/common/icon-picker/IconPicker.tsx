import React, { useEffect, useRef, useState } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import styled from 'styled-components';

import {
  Button,
  Icon,
  IconButton,
  Popover,
  TextField
} from '@material-ui/core';

// metadata from https://fonts.google.com/metadata/icons
// TODO: consider proxying the data from server side
import metadata from './icon-metadata.json';

const StyledButton = styled(Button)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;
const StyledPopover = styled(Popover)`
  .popover-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .search-field {
    padding: 12px;
  }
  .virtual-list {
    flex: 1;
  }
  .icon {
    font-size: 24px;
  }
`;

const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px;
`;

const StyledItem = styled.div`
  padding: 3px;
`;

export interface IconPickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const IconPicker: React.FC<IconPickerProps> = ({
  onChange,
  ...props
}) => {
  const [search, setSearch] = useState('');
  const [value, setValue] = useState(props.value);
  const [icons, setIcons] = useState(metadata.icons);
  const timerRef = useRef<any>();
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement>();
  // handle value reset from parent
  useEffect(() => setValue(value), [value]);
  // debounce search
  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIcons(() =>
        search
          ? metadata.icons.filter(
              icon =>
                icon.name.includes(search) ||
                icon.categories.includes(search) ||
                icon.tags.some(t => t.includes(search))
            )
          : metadata.icons
      );
    }, 500);
  }, [search]);
  return (
    <>
      <StyledButton
        fullWidth
        className='icon-picker'
        variant='outlined'
        onClick={event => setAnchorElement(event.currentTarget)}
        startIcon={value && <Icon>{value}</Icon>}
      >
        {value ? `${value}` : 'Select an Icon'}
      </StyledButton>
      {anchorElement && (
        <StyledPopover
          anchorEl={anchorElement}
          keepMounted
          open={Boolean(anchorElement)}
          onClose={e => setAnchorElement(undefined)}
          PaperProps={{
            style: {
              width: 240,
              height: '100%',
              maxHeight: 480,
              overflow: 'hidden'
            }
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <div className='popover-content'>
            <div className='search-field'>
              <TextField
                fullWidth
                size='small'
                placeholder='Search Icons'
                value={search}
                onChange={event => {
                  const value = event.target.value;
                  setSearch(value);
                }}
              />
            </div>
            <div className='virtual-list'>
              <VirtuosoGrid
                totalCount={icons.length}
                // overscan={100}
                components={{
                  List: StyledList,
                  Item: StyledItem
                }}
                itemContent={(index: number) => (
                  <IconButton
                    size='small'
                    onClick={() => {
                      setValue(icons[index].name);
                      onChange?.(icons[index].name);
                      setAnchorElement(undefined);
                    }}
                  >
                    <Icon className='icon'>{icons[index].name}</Icon>
                  </IconButton>
                )}
              />
            </div>
          </div>
        </StyledPopover>
      )}
    </>
  );
};

export default IconPicker;
