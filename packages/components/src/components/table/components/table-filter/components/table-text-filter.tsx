import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { useLabels } from '../../../../../providers/label-provider';
import Button from '../../../../button/button';
import TextField from '../../../../form/textfield/textfield';
import Col from '../../../../grid/col';
import Row from '../../../../grid/row';
import VerticalSpacing from '../../../../vertical-spacing/vertical-spacing';
import { TableFilterContext } from '../table-filter-context';

export const TableTextFilter = () => {
  const { getLabel } = useLabels();
  const { column, open, setOpen, values: contextValues } = React.useContext(TableFilterContext);
  const initialValues = { filter: contextValues?.filter };

  const filterId = `text-filter-${column?.id}`;
  const filterLabel = getLabel('table.filter');
  const filterPlaceholder = getLabel('search');
  const filterMinLengthVal = getLabel('table.filter.validation.min-length');
  const filterMinLength = typeof filterMinLengthVal === 'string' ? filterMinLengthVal : filterMinLengthVal(3);

  // TODO: Remove ts-ignore
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const validationSchema: Yup.SchemaOf<typeof initialValues> = Yup.object().shape({
    filter: Yup.string()
      .matches(/^(?!\s+$).*/, getLabel('table.filter.validation.no-spaces'))
      .min(3, filterMinLength),
  });

  const { values, setFieldValue, handleReset, handleSubmit, touched, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: typeof initialValues) => {
      column?.setFilterValue(values.filter);
      setOpen?.(false);
    },
    onReset: () => {
      column?.setFilterValue('');
      setOpen?.(false);
    },
  });

  React.useEffect(() => {
    if (open && !values.filter) {
      const filterField = document.getElementById(filterId);
      filterField?.focus?.({ preventScroll: true });
    }
  }, [column?.id, values.filter, open, filterId]);

  return (
    <form onSubmit={handleSubmit}>
      <VerticalSpacing>
        <TextField
          id={filterId}
          label={filterLabel}
          placeholder={filterPlaceholder}
          icon="close"
          onIconClick={handleReset}
          value={(values.filter as string) || ''}
          onChange={(value) => setFieldValue('filter', value)}
          helper={touched.filter && errors.filter ? { text: errors.filter, type: 'error' } : { text: filterMinLength }}
          input={{
            autoComplete: 'off',
          }}
        />
        <Row gutter={2}>
          <Col>
            <Button visualType="secondary" onClick={handleReset} fullWidth>
              {getLabel('clear')}
            </Button>
          </Col>
          <Col>
            <Button type="submit" fullWidth>
              {getLabel('table.filter')}
            </Button>
          </Col>
        </Row>
      </VerticalSpacing>
    </form>
  );
};
