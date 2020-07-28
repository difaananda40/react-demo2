import React, { Fragment, useState, useEffect } from 'react';
import { useFormContext, Controller } from "react-hook-form";
import {
  Form,
  Row,
  Col,
  Card
} from 'react-bootstrap';
import moment from 'moment';
import Select from "../../Shared/Select";
import Datepicker from "../../Shared/Datepicker";

// Data from JSON file
import worksheets from '../../Dummy/ic4pro_auditworksheets.json';
import branches from '../../Dummy/ic4pro_branches.json';
import months from '../../Dummy/ic4pro_auditMonths.json';
import years from '../../Dummy/ic4pro_auditYears.json';
import inspectionTypes from '../../Dummy/ic4pro_inspectiontypes.json';

const StepOne = () => {
  const { register, errors, control, watch, setValue } = useFormContext();
  const watchBranchId = watch('branchId');
  const worksheetsFiltered = worksheets.filter(dt => dt.branchId === watchBranchId?.branchId);

  useEffect(() => {
    setValue('lastAuditVisit', '');
  }, [watchBranchId, setValue])

  return (
    <Fragment>
      <Card>
        <Card.Header className="font-weight-bold" style={{ backgroundColor: '#FFC107' }}>
          Inspection Layer
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Form.Group as={Row} controlId="worksheetId">
                <Form.Label column sm="8">
                  Worksheet ID*
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    type="text"
                    name="worksheetId"
                    ref={register}
                    defaultValue={`WK${moment().format('YYYYMMDDHHmmss')}`}
                    readOnly
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Row} controlId="branchId">
                <Form.Label column sm="4">
                  Branch Name*
                </Form.Label>
                <Col sm="8">
                  <Controller
                    name="branchId"
                    as={Select}
                    options={branches.data}
                    control={control}
                    getOptionValue={option => option.branchId}
                    getOptionLabel={option => option.branchId + ' - ' + option.branchName}
                    rules={{ required: 'Branch name is required!' }}
                    isInvalid={errors.branchId}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group as={Row} controlId="currentAuditPeriod">
            <Form.Label column sm="4">
              Current Audit Period*
            </Form.Label>
            <Col>
              <Controller
                name="startMonth"
                as={Select}
                options={months}
                control={control}
                getOptionValue={option => option.monthName}
                getOptionLabel={option => option.monthName}
                placeholder="Start Month..."
                rules={{ required: 'Start Month is required!' }}
                isInvalid={errors.startMonth}
              />
            </Col>
            <Col>
              <Controller
                name="startYear"
                as={Select}
                options={years}
                control={control}
                getOptionValue={option => option.auditYear}
                getOptionLabel={option => option.auditYear}
                placeholder="Start Year..."
                rules={{ required: 'Start Year is required!' }}
                isInvalid={errors.startYear}
              />
            </Col>
            <Col xs="auto" className="d-flex align-items-center font-weight-bold">to</Col>
            <Col>
              <Controller
                name="endMonth"
                as={Select}
                options={months}
                control={control}
                getOptionValue={option => option.monthName}
                getOptionLabel={option => option.monthName}
                placeholder="End Month..."
                rules={{ required: 'End Month is required!' }}
                isInvalid={errors.endMonth}
              />
            </Col>
            <Col>
              <Controller
                name="endYear"
                as={Select}
                options={years}
                control={control}
                getOptionValue={option => option.auditYear}
                getOptionLabel={option => option.auditYear}
                placeholder="End Year..."
                rules={{ required: 'End Year is required!' }}
                isInvalid={errors.endYear}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="visitPeriod">
            <Form.Label column sm="4">
              Visit Period*
            </Form.Label>
            <Col>
              <Controller
                control={control}
                name="visitPeriodStart"
                rules={{ required: 'Visit Period Start is required!' }}
                render={({ onChange, onBlur, value }) => (
                  <Fragment>
                    <Datepicker
                      onChange={onChange}
                      onBlur={onBlur}
                      selected={value}
                      isInvalid={errors.visitPeriodStart}
                      className="form-control is-invalid"
                      placeholderText="Visit Period Start..."
                    />
                  </Fragment>
                )}
              />
            </Col>
            <Col xs="auto" className="d-flex align-items-center font-weight-bold">to</Col>
            <Col>
              <Controller
                control={control}
                name="visitPeriodEnd"
                rules={{ required: 'Visit Period End is required!' }}
                render={({ onChange, onBlur, value }) => (
                  <Datepicker
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    isInvalid={errors.visitPeriodEnd}
                    className="form-control"
                    placeholderText="Visit Period End..."
                  />
                )}
              />
            </Col>
          </Form.Group>
          <Row>
            <Col>
              <Form.Group as={Row} controlId="exitMeetingDate">
                <Form.Label column sm="8">
                  Exit Meeting Date*
                </Form.Label>
                <Col>
                  <Controller
                    control={control}
                    name="exitMeetingDate"
                    rules={{ required: 'Exit Meeting Date is required!' }}
                    render={({ onChange, onBlur, value }) => (
                      <Fragment>
                        <Datepicker
                          onChange={onChange}
                          onBlur={onBlur}
                          selected={value}
                          isInvalid={errors.exitMeetingDate}
                          className="form-control is-invalid"
                          placeholderText="Exit Meeting Date..."
                        />
                      </Fragment>
                    )}
                  />
                </Col>
              </Form.Group>      
            </Col>
            <Col>
              <Form.Group as={Row} controlId="inspectionType">
                <Form.Label column sm="4">
                  Inspection Type*
                </Form.Label>
                <Col>
                  <Controller
                    name="inspectionType"
                    as={Select}
                    options={inspectionTypes}
                    control={control}
                    getOptionValue={option => option.key}
                    getOptionLabel={option => option.description}
                    placeholder="Inspection Type..."
                    rules={{ required: 'Inspection Type is required!' }}
                    isInvalid={errors.inspectionType}
                  />
                </Col>
              </Form.Group> 
            </Col>
          </Row>
          <Form.Group as={Row} controlId="lastAuditVisit">
            <Form.Label column sm="4">
              Last Audit Visit
            </Form.Label>
            <Col>
              <Controller
                name="lastAuditVisit"
                as={Select}
                options={worksheetsFiltered}
                control={control}
                getOptionValue={option => option.worksheetId}
                getOptionLabel={option => option.worksheetId + ' - ' + option.inspectionType}
                placeholder="Last Audit Visit..."
                isInvalid={errors.lastAuditVisit}
                isDisabled={!watchBranchId}
              />
            </Col>
          </Form.Group>
        </Card.Body>
      </Card>
      <Card className="mt-3">
        <Card.Header className="font-weight-bold" style={{ backgroundColor: '#FFC107' }}>
          Introduction
        </Card.Header>
        <Card.Body>
          <Form.Group controlId="auditIntro">
            <Form.Control
              as="textarea"
              rows="5"
              name="auditIntro"
              ref={register({ required: 'Introduction is required!' })}
              isInvalid={errors.auditIntro}
              placeholder="Introduction..."
            />
            <Form.Control.Feedback type="invalid">
              {errors.auditIntro?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Card.Body>
      </Card>
    </Fragment>
  )
}

export default StepOne;