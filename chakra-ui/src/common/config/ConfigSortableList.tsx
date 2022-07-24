import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { Icon, IconButton } from '@material-ui/core';

import { ConfigList, ConfigListItem } from './ConfigList';

export interface ConfigSortableListProps<T> {
  data: T[];
  keyExtractor?: (item: T, index: number) => string | number;
  footer?: JSX.Element;
  renderItem: (item: T, index: number) => JSX.Element;
  onMove?: (sourceIndex: number, destinationIndex: number) => void;
  onDelete?: (index: number) => void;
  removable?: boolean;
}

export const ConfigSortableList = <T extends object>({
  data,
  footer,
  onMove,
  onDelete,
  renderItem,
  keyExtractor,
  removable = true
}: ConfigSortableListProps<T>) => {
  return (
    <DragDropContext
      onDragEnd={result => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
          return;
        }
        onMove?.(source.index, destination.index);
      }}
    >
      <Droppable droppableId='action'>
        {provided => (
          <ConfigList className='config-list' ref={provided.innerRef}>
            {data.map((item, index) => {
              return (
                <Draggable
                  key={keyExtractor ? keyExtractor(item, index) : index}
                  index={index}
                  draggableId={`draggable-${
                    keyExtractor ? keyExtractor(item, index) : index
                  }`}
                >
                  {(provided, snapshot) => (
                    <ConfigListItem
                      hover
                      className={snapshot.isDragging ? 'dragging' : ''}
                      ref={provided.innerRef}
                      icon={
                        <Icon className='drag-indicator'>drag_indicator</Icon>
                      }
                      iconProps={provided.dragHandleProps}
                      {...provided.draggableProps}
                      primary={renderItem(item, index)}
                      secondaryAction={
                        removable && (
                          <IconButton
                            size='small'
                            onClick={e => {
                              e.stopPropagation();
                              onDelete?.(index);
                            }}
                          >
                            <Icon>remove_circle_outline</Icon>
                          </IconButton>
                        )
                      }
                      onClick={() => {}}
                    ></ConfigListItem>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
            {footer && <ConfigListItem>{footer}</ConfigListItem>}
          </ConfigList>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ConfigSortableList;
