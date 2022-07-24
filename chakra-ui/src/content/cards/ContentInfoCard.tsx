import { Button, Card, Icon } from '@material-ui/core';
import { createFilterOptions, FilterOptionsState } from '@material-ui/lab';
import {
  AppSnackbar,
  CardContent,
  CardTitle,
  ConfirmDialog,
} from '@nobrainerlabs/react-material-ui';
import {
  InlineForm,
  InlineFormik,
  InlineTextField,
} from '@nobrainerlabs/react-material-ui-formik';
import { InlineDateTimePicker } from '@nobrainerlabs/react-material-ui-formik-pickers';
import { FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Certification } from '../../certification/Certification';
import { useFindCertifications } from '../../certification/hooks/useFindCertifications';

import InlineHtml from '../../common/inline/InlineHtml';
import InlineMultiSelectChip from '../../common/inline/InlineMultiSelectChip';
import InlineMultiSelectChipAddable from '../../common/inline/InlineMultiSelectChipAddable';
import InlineSelectField from '../../common/inline/InlineSelectField';
import { useFindContenttypes } from '../../contenttype/hooks/useFindContenttypes';
import { useDeleteContent } from '../../hooks/contents/useDeleteContent';
import { useFindContent } from '../../hooks/contents/useFindContent';
import { useUpdateContent } from '../../hooks/contents/useUpdateContent';
import { Content } from '../../interfaces/Content';
import { Keyword } from '../../keyword/Keyword';
import { useFindKeywords } from '../../keyword/useFindKeywords';
import { useUserContext } from '../../user/UserContext';

const ContentInfoCard: React.FC<{
  contentId: number;
  onLoad?: (content: Content) => void;
}> = ({ contentId, onLoad }) => {
  const formikRef = useRef<FormikValues>();
  const onLoadRef = useRef(onLoad);
  const {
    content,
    isLoading: isLoadingInitialValues,
    error: findError,
  } = useFindContent(contentId, true);

  const { isUpdating, error: updateError, updateContent } = useUpdateContent(
    contentId
  );

  const { deleteContent, deletedContent } = useDeleteContent(contentId);
  const [keywordOptions, setKeywordOptions] = useState<Keyword[]>();
  const { certificationList, findCertifications } = useFindCertifications(true);
  const { contenttypeList, findContenttypes } = useFindContenttypes(true);
  const { keywordList, findKeywords } = useFindKeywords();
  const [initialValues, setInitialValues] = useState<Partial<Content>>();
  const { user } = useUserContext();
  const [certificationOptions, setCertificationOptions] = useState<
    Certification[]
  >();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const filter = createFilterOptions();

  // set keywordList
  useEffect(() => {
    findKeywords({
      type: 'content',
    });
  }, [findKeywords]);

  useEffect(() => {
    setKeywordOptions(keywordList?.data || []);
  }, [keywordList]);

  useEffect(() => {
    if (deletedContent) {
      navigate(`/portal/contents?type=${content?.contenttype?.name}`);
    }
  }, [deletedContent]);

  useEffect(() => {
    if (content) {
      console.log('co', content);
    }
  }, [content]);
  useEffect(() => {
    if (!isLoadingInitialValues && content) {
      setInitialValues({
        ...content,
      });
      onLoadRef?.current?.(content);
    }
  }, [isLoadingInitialValues, content]);

  useEffect(() => {
    setCertificationOptions(certificationList?.data || []);
  }, [certificationList]);

  return (
    <Card>
      <CardTitle>
        <Icon>view_quilt</Icon>
        Content Info
      </CardTitle>
      <CardContent padding='large'>
        <InlineFormik
          innerRef={(formik: any) => (formikRef.current = formik)}
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            title: Yup.string().required(),
          })}
          isSubmitting={isUpdating}
          error={findError}
          onSubmit={(content: Partial<Content>) => {
            console.log('on submit content', content);
            updateContent(content);
          }}
        >
          <InlineForm>
            <InlineSelectField
              name='contenttypeId'
              label='Type'
              labelHtml={`<a href="/portal/contenttypes" style="margin-left: 4px; color: blue;" target="_blank">(Manage)</a>`}
              options={contenttypeList?.data.map((contenttype) => {
                return {
                  label: contenttype.name,
                  value: contenttype.id,
                };
              })}
              grid={{ xs: 6 }}
            />

            <InlineTextField
              name='title'
              label='Title'
              placeholder='Enter content title'
            />

            {content?.contenttype.name === 'Events' && (
              <>
                <InlineDateTimePicker
                  name='eventTime'
                  label='When'
                  placeholder='Time of event'
                  grid={{ xs: 6 }}
                />
                <InlineTextField
                  name='eventLocation'
                  label='Where'
                  multiline
                  placeholder='Enter event location'
                />
              </>
            )}

            <InlineTextField
              name='summary'
              label='Short Summary'
              placeholder='Enter a short summary'
              multiline={true}
            />

            <InlineHtml name='html' label='Content' />

            <InlineMultiSelectChipAddable
              style={{ marginTop: 10 }}
              name='keywords'
              label='Keywords'
              options={keywordOptions}
              optionLabel={(option) => {
                if (option.inputValue) {
                  return option.inputValue;
                }
                return `${option.name}`;
              }}
              filterOptions={(
                options: any[],
                params: FilterOptionsState<any>
              ) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some(
                  (option: any) => inputValue === option.name
                );
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    name: inputValue,
                    type: 'content',
                    createdBy: user?.id,
                    modifiedBy: user?.id,
                  });
                }
                return filtered;
              }}
            />

            <InlineMultiSelectChip
              name='certifications'
              label='What certifications does it have?'
              options={certificationOptions}
              optionLabel={(optionLabel) => optionLabel.name}
            />
          </InlineForm>
        </InlineFormik>

        <Button
          variant='contained'
          color='secondary'
          style={{ backgroundColor: 'red' }}
          onClick={() => setShowDeleteDialog(true)}
        >
          Delete
        </Button>

        {showDeleteDialog && (
          <ConfirmDialog
            open
            title='Delete?'
            message={`Are you sure you want to this?`}
            onCancel={() => setShowDeleteDialog(false)}
            onConfirm={() => {
              deleteContent();
            }}
          />
        )}

        <AppSnackbar severity='error' open={Boolean(updateError)}>
          There was an error saving.
        </AppSnackbar>
      </CardContent>
    </Card>
  );
};

export default ContentInfoCard;
