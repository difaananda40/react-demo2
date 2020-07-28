import React, { Fragment, useEffect, useState } from 'react';
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
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

const years = new Array(25 + 1).fill().map((e,i) => {
  return {label: i, value: i}
});

const months = new Array(10 + 1).fill().map((e,i) => {
  return {label: i, value: i}
});

const StepTwo = () => {
  const { register, errors, control, watch } = useFormContext();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "keyOfficers"
  });

  const [ users, setUsers ] = useState([...usersJson])

  useEffect(() => {
    append();
  }, [append])

  const watchKeyOfficers = watch('keyOfficers');

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
                Staff Name*
              </Form.Label>
              <Controller
                name={`keyOfficers[${index}].staffName`}
                as={Select}
                options={users}
                control={control}
                getOptionValue={option => option.userid}
                getOptionLabel={option => `${option.title}. ${option.firstName} ${option.lastNamme}`}
                rules={{ required: 'Staff Name is required!' }}
                onChange={e => console.log(e)}
                isInvalid={errors.keyOfficers?.[index]?.staffName}
              />
            </Form.Group>
            <Form.Group as={Col} controlId={`keyOfficers[${index}].gradeLevel`}>
              <Form.Label>
                Grade Level
              </Form.Label>
              <Form.Control readOnly defaultValue={watchKeyOfficers?.[index]?.staffName?.gradeLevel} />
            </Form.Group>
            <Form.Group as={Col} controlId={`keyOfficers[${index}].designate`}>
              <Form.Label>
                Functions
              </Form.Label>
              <Form.Control readOnly defaultValue={watchKeyOfficers?.[index]?.staffName?.designate} />
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
        <Row>
          <Col className="text-center mt-3">
            <Button variant="primary" type="button" onClick={append}>Add Staff</Button>
          </Col>
        </Row>
        </Card.Body>
      </Card>
    </Fragment>
  )
}

export default StepTwo;