import React, { ComponentProps, forwardRef, HTMLProps } from 'react';
import styled from 'styled-components';

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0 -12px;
`;
const StyledListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 8px;
  /* border-top: 1px solid #ccc; */
  /* border: 2px solid transparent; */
  &.hover:hover {
    background: #f4f4f4;
    /* border: 2px solid #f4f4f4; */
    border-radius: 6px;
  }
  &.dragging {
    /* border-top: none; */
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  }
  &.button {
    cursor: pointer;
  }
  .list-item-icon {
    display: flex;
    /* align-items: center; */
    .drag-indicator {
      margin-left: -2px;
      color: #ccc;
    }
  }
  .list-item-line {
    display: flex;
    /* align-items: center; */
    .list-item-primary {
      flex: 1;
      display: flex;
      align-items: center;
    }
    .list-item-secondary-action {
      padding-right: 4px;
    }
  }
`;

export type ConfigListProps = ComponentProps<typeof StyledList> &
  HTMLProps<HTMLUListElement> & {};

export const ConfigList = forwardRef<HTMLUListElement, ConfigListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <StyledList
        ref={ref}
        className={`config-list${className ? ` ${className}` : ''}`}
        {...props}
      >
        {children}
      </StyledList>
    );
  }
);

export type ConfigListItemProps = ComponentProps<typeof StyledListItem> &
  HTMLProps<HTMLLIElement> & {
    hover?: boolean;
    icon?: JSX.Element;
    iconProps?: HTMLProps<HTMLDivElement>;
    primary?: JSX.Element;
    secondaryAction?: JSX.Element;
  };

export const ConfigListItem = forwardRef<HTMLLIElement, ConfigListItemProps>(
  (
    {
      hover,
      icon,
      iconProps,
      primary,
      secondaryAction,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <StyledListItem
        ref={ref}
        className={[
          'config-list-item',
          hover && 'hover',
          onClick && 'button',
          className
        ]
          .filter(c => c)
          .join(' ')}
        onClick={onClick}
        {...props}
      >
        <div className='list-item-line'>
          {icon && (
            <div className='list-item-icon' {...iconProps}>
              {icon}
            </div>
          )}
          {primary && <div className='list-item-primary'>{primary}</div>}
          {secondaryAction && (
            <div className='list-item-secondary-action'>{secondaryAction}</div>
          )}
        </div>
        {children && <div className='list-item-body'>{children}</div>}
      </StyledListItem>
    );
  }
);
