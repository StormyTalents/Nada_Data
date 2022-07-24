import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  withStyles
} from '@material-ui/core';

export const ConfigAccordion = withStyles(theme => ({
  root: {
    boxShadow: 'none',
    marginBottom: -1,
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: '0',
      borderLeft: `solid 4px ${theme.palette.primary.main};`
    },
    '&.dragging': {
      opacity: 0.7,
      borderRadius: '4px',
      boxShadow:
        '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)'
    }
  },
  expanded: {}
}))(Accordion);

export const ConfigAccordionSummary = withStyles({
  root: {
    minHeight: 0,
    borderTop: 'solid 1px #ccc',
    borderBottom: 'solid 1px #ccc',
    '&:hover': {
      background: '#f4f4f4'
    },
    '&$expanded': {
      minHeight: 0,
      background: '#f4f4f4'
    }
  },
  focused: {
    backgroundColor: 'none !important'
  },
  content: {
    alignItems: 'center',
    '&$expanded': {
      margin: '12px 0'
    },
    '& .drag-indicator': {
      marginLeft: '-12px',
      color: '#ccc'
    }
  },
  expandIcon: {
    marginRight: '-4px !important',
    transform: 'none !important'
  },
  expanded: {
    minHeight: 0
  }
})(AccordionSummary);

export const ConfigAccordionDetails = withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0
  }
})(AccordionDetails);
