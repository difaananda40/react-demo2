import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { useFormContext, Controller, useFieldArray, useWatch } from "react-hook-form";
import {
  Form,
  Row,
  Col,
  Card,
  Button
} from 'react-bootstrap';
import moment from 'moment';
import Select from "../../Shared/Select";
import Datepicker from "../../Shared/Datepicker";

// Data from JSON file
import usersJson from '../../Dummy/ic4pro_users.json';
import designatesJson from '../../Dummy/ic4pro_designates.json';

const years = new Array(25 + 1).fill().map((e,i) => {
  return {label: i, value: i}
});

const months = new Array(10 + 1).fill().map((e,i) => {
  return {label: i, value: i}
});

const StepTwo = () => {
  const { register, errors, control, getValues, reset, selectedData, mode } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keyOfficers"
  });

  const [ users, setUsers ] = useState([...usersJson])

  useEffect(() => {
    if(mode === 'create') append();
  }, [append])

  useEffect(() => {
    if(selectedData && (mode !== 'create' || mode === null)) {
      reset({
        ...getValues(),
        keyOfficers: selectedData.keyofficers.map(sd => ({
          staffName: users.find(uj => uj.userid === sd.staffName),
          datejoin: moment(sd.datejoin, 'YYYYMMDD').toDate(),
          jobStayYear: years.find(y => y.value === parseInt(sd.jobStayYear)),
          jobStayMonth: months.find(m => m.value === parseInt(sd.jobStayMonth))
        }))
      })
    }
  }, [selectedData, reset, users, getValues])

  const watchKeyOfficers = useWatch({ name: 'keyOfficers' });

  const getDesignate = useCallback((designate) => {
    const designateFind = designatesJson.find(de => de.designate_id === designate)
    return designateFind?.designate_name;
  }, []);

  return (
    <Fragment>
      <Card>
        <Card.Header className="font-weight-bold" style={{ backgroundColor: '#FFC107' }}>
          Key Officers
        </Card.Header>
        <Card.Body>
          {fields.map((item, index) => (
            <Row key={item.id}>
              <Form.Group as={Col} controlId={`keyOfficers[${index}].staffName`}>
                <Form.Label>
                  Staff Name {index + 1}*
                </Form.Label>
                <Controller
                  name={`keyOfficers[${index}].staffName`}
                  as={Select}
                  options={users}
                  control={control}
                  getOptionValue={option => option.userid}
                  getOptionLabel={option => `${option.title}. ${option.firstName} ${option.lastNamme}`}
                  rules={{ required: 'Staff Name is required!' }}
                  isInvalid={errors.keyOfficers?.[index]?.staffName}
                />
              </Form.Group>
              <Form.Group as={Col} controlId={`keyOfficers[${index}].gradeLevel`}>
                <Form.Label>
                  Grade Level
                </Form.Label>
                <Form.Control name={`keyOfficers[${index}].gradeLevel`} ref={register} readOnly defaultValue={watchKeyOfficers?.[index]?.staffName?.gradeLevel} />
              </Form.Group>
              <Form.Group as={Col} controlId={`keyOfficers[${index}].designate`}>
                <Form.Label>
                  Functions
                </Form.Label>
                <Form.Control
                  name={`keyOfficers[${index}].designate`}
                  ref={register}
                  readOnly
                  defaultValue={getDesignate(watchKeyOfficers?.[index]?.staffName?.designate)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId={`keyOfficers[${index}].datejoin`}>
                <Form.Label>
                  Length of Stay*
                </Form.Label>
                <Controller
                  control={control}
                  name={`keyOfficers[${index}].datejoin`}
                  rules={{ required: 'Length of Stay is required!' }}
                  render={({ onChange, onBlur, value }) => (
                    <Fragment>
                      <Datepicker
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        isInvalid={errors.keyOfficers?.[index]?.datejoin}
                        className="form-control is-invalid"
                        placeholderText="Length of Stay..."
                      />
                    </Fragment>
                  )}
                />
              </Form.Group>
              <Form.Group as={Col} controlId={`keyOfficers[${index}].jobStayYear`}>
                <Form.Label>
                  Job Stay Year*
                </Form.Label>
                <Controller
                  name={`keyOfficers[${index}].jobStayYear`}
                  as={Select}
                  options={years}
                  control={control}
                  rules={{ required: 'Job Stay Year is required!' }}
                  isInvalid={errors.keyOfficers?.[index]?.jobStayYear}
                />
              </Form.Group>
              <Form.Group as={Col} controlId={`keyOfficers[${index}].jobStayMonth`}>
                <Form.Label>
                  Job Stay Month*
                </Form.Label>
                <Controller
                  name={`keyOfficers[${index}].jobStayMonth`}
                  as={Select}
                  options={months}
                  control={control}
                  rules={{ required: 'Job Stay Month is required!' }}
                  isInvalid={errors.keyOfficers?.[index]?.jobStayMonth}
                />
              </Form.Group>
              {fields.length > 1 && (
                <Form.Group as={Col} controlId={`keyOfficers[${index}].delete`}
                  className="d-flex align-items-center justify-content-center" xs="auto"
                >
                  <Button variant="danger" onClick={() => remove(index)}>Delete</Button>
                </Form.Group>
              )}
            </Row>
          ))}
          <Form.Group>
            <Button variant="primary" type="button" onClick={append}>Add Staff</Button>
          </Form.Group>
        </Card.Body>
      </Card>
    </Fragment>
  )
}

function compare(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

export default React.memo(StepTwo, compare);