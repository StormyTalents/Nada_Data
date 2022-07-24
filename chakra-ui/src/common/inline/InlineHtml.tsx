import { debounce, DebouncedFunc } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import styled from 'styled-components';

import {
  Button,
  ButtonGroup,
  Collapse,
  Grid,
  GridProps,
  Typography
} from '@material-ui/core';
import { Clear, Done } from '@material-ui/icons';
import { api, AppSnackbar } from '@nobrainerlabs/react-material-ui';
import { Editor as EditorImport } from '@tinymce/tinymce-react';

import { useHtmlImageHandler } from '../../hooks/html/useHtmlImageHandler';
import { useImageReloader } from '../../hooks/html/useImageReloader';
import { useField, useFormikContext } from 'formik';

const StyledGrid = styled(Grid)`
  width: 100%;
  .hidden {
    display: none;
  }
  iframe {
    max-width: 100% !important;
  }
  .html-container {
    min-height: 64px;
  }
`;

const StyledButtonGroup = styled(ButtonGroup)`
  border: 1px solid #ccc;
  background: #fff;
  border-top: 0;
  border-radius: 0;
`;

export type InlineHtmlProps = {
  name: string;
  value?: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  enableMedia?: boolean;
  grid?: GridProps;
};

export const InlineHtml: React.FC<InlineHtmlProps> = props => {
  const {
    name,
    value: initialValue,
    label,
    disabled,
    helperText,
    enableMedia,
    grid
  } = props;
  const formik = useFormikContext();
  const [field, meta, { setValue: setFieldValue, setTouched }] = useField(
    props
  );

  const { processedHtml, processHtmlImageTags } = useHtmlImageHandler();
  const { error, reloadFailedImages } = useImageReloader();
  const debounceFunc = useRef<DebouncedFunc<() => void>>();
  const editorElementRef = useRef<HTMLDivElement>();
  const iframeRef = useRef<HTMLIFrameElement>();
  // const setImageCallbackRef = useRef<Function>();
  const lastProcessedHtmlRef = useRef(processedHtml);
  const [buttonFocus, setButtonFocus] = useState(false);
  const [didInit, setDidInit] = useState(false);
  // const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [value, setValue] = useState(initialValue || field.value || '');
  const [focus, setFocus] = useState(!value || false);
  const previousValueRef = useRef(value);
  const toolbar: string = useMemo(() => {
    const str: string[] = [
      'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify',
      `image media`,
      'link bullist numlist outdent indent | removeformat | help | code'
    ];
    return str.join(' | ');
  }, []);
  const Editor = EditorImport as any;

  // after processing image tags in html save the results
  useEffect(() => {
    if (
      processedHtml &&
      // prevent form from reselecting element on re-render while editing
      // another form element
      lastProcessedHtmlRef.current !== processedHtml
    ) {
      lastProcessedHtmlRef.current = processedHtml;
      setValue(processedHtml);
      setTouched(true);
      setFocus(false);
      formik.submitForm();
      setTimeout(() => {
        if (iframeRef.current) {
          reloadFailedImages(iframeRef.current);
        }
      }, 500);
    }
  }, [formik, processedHtml, reloadFailedImages, setTouched]);

  const handleCancel = () => {
    setTouched(false);
    setValue(previousValueRef.current);
  };
  const handleSubmit = () => {
    // look for data url image tags and upload to server
    processHtmlImageTags(value);
  };
  return (
    <StyledGrid item {...grid}>
      {label && (
        <Typography variant='h5' gutterBottom>
          {label}
        </Typography>
      )}
      {!didInit && (
        <Typography
          variant='body2'
          color='textSecondary'
          style={{ marginTop: 10 }}
        >
          Loading editor...
        </Typography>
      )}
      <Editor
        apiKey={(api.environment as any).tinyApiKey}
        value={value}
        init={{
          menubar: false,
          paste_data_images: true,
          relative_urls: false,
          remove_script_host: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste help wordcount',
            'autoresize',
            enableMedia ? 'media' : ''
          ],
          toolbar
          // file_picker_callback: (setImageCallback: Function) => {
          //   setImageCallbackRef.current = setImageCallback;
          //   setFileDialogOpen(true);
          // }
        }}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onInit={(event: any) => {
          editorElementRef.current = event.target?.container as HTMLDivElement;
          const iframe: HTMLIFrameElement | undefined =
            event.target?.iframeElement;
          iframeRef.current = iframe;
          // applyImageStyling(iframe);
          reloadFailedImages(iframe);
          setDidInit(true);
        }}
        onBlur={() => {
          handleSubmit();
          setFocus(false);
        }}
        onEditorChange={(content: string | undefined, editor: any) => {
          reloadFailedImages(editor.iframeElement);
          setValue(content || '');
          debounceFunc.current = debounce(
            () => setFieldValue(content || ''),
            300
          );
          debounceFunc.current();
        }}
        onKeyDown={(event: { key: any }) => {
          switch (event.key) {
            case 'Escape':
              setFocus(false);
              return handleCancel();
          }
        }}
      />
      <Collapse in={didInit && (focus || buttonFocus)}>
        <StyledButtonGroup fullWidth color='primary' variant='text'>
          <Button
            fullWidth
            onFocus={() => setButtonFocus(true)}
            onBlur={() => setButtonFocus(false)}
            onClick={event => {
              debounceFunc.current?.();
              event.stopPropagation();
              setButtonFocus(false);
              handleSubmit();
            }}
          >
            <Done />
          </Button>
          <Button
            fullWidth
            onFocus={() => setButtonFocus(true)}
            onBlur={() => setButtonFocus(false)}
            onClick={event => {
              debounceFunc.current?.();
              event.stopPropagation();
              setFocus(false);
              setButtonFocus(false);
              handleCancel();
            }}
          >
            <Clear />
          </Button>
        </StyledButtonGroup>
      </Collapse>
      <AppSnackbar
        severity='error'
        open={!!errorMessage}
        onClose={() => setErrorMessage('')}
      >
        {errorMessage}
      </AppSnackbar>
    </StyledGrid>
  );
};

export default InlineHtml;
