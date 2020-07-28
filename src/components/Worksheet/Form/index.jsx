import React, { Suspense, lazy, useState } from 'react';
import {
  Modal,
  Button,
  Card,
  Tab,
  Nav
} from 'react-bootstrap';
import { useForm, FormProvider } from "react-hook-form";

// Step Components
const StepOne = lazy(() => import('./StepOne'));
const StepTwo = lazy(() => import('./StepTwo'));

const FormContainer = ({
  show,
  mode,
  handleForm,
  submitForm,
  selectedData,
  deleteData
}) => {
  const [ tabKey, setTabKey ] = useState('tab1');

  const handleTab = (type) => {
    let lastNum = parseInt(tabKey[tabKey.length - 1]);
    if(type === 'next') lastNum += 1
    else if(type ==='prev') lastNum -= 1
    setTabKey('tab' + lastNum);
  }

  const methods = useForm();
  const onSubmit = data => console.log(data);

  return (
    <Modal
      show={true}
      onHide={handleForm}
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-90w"
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Modal.Header style={{ backgroundColor: '#8C00FF' }}>
            <Modal.Title className="text-capitalize">{mode} Worksheet</Modal.Title>
            <div>
              {
                mode === 'delete'
                ? (
                  <Button
                    variant="info"
                    className="border border-white"
                    size="sm"
                    onClick={deleteData}
                    type="button"
                  >
                  Delete
                </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="info"
                    className="border border-white"
                    size="sm"
                    disabled={mode === 'view'}
                  >
                    Save
                  </Button>
                )
              }
              <Button
                variant="success"
                size="sm"
                className="border border-white ml-1"
                onClick={handleForm}
              >
                Cancel
              </Button>
              <Button variant="danger" className="border border-white ml-1" size="sm">Help</Button>
            </div>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#F2F2F2' }}>
            <Tab.Container id="tab-controlled" activeKey={tabKey} onSelect={(key) => setTabKey(key)}>
              <Card>
                <Card.Header>
                  <Nav variant="tabs">
                    <Nav.Item>
                      <Nav.Link eventKey="tab1">Tab 1: Introduction</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tab2">Tab 2: Key Officers</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tab3">Tab 3: Inspection Team</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tab4">Tab 4: Objectives</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tab5">Tab 5: Approaches</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tab6">Tab 6: Audit Log and Status</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body>
                  <Tab.Content>
                    <Suspense fallback={<div>Loading...</div>}>
                      <Tab.Pane eventKey="tab1">
                        <StepOne />
                      </Tab.Pane>
                      <Tab.Pane eventKey="tab2">
                        <StepTwo />
                      </Tab.Pane>
                      <Tab.Pane eventKey="tab3">
                        <p>3</p>
                      </Tab.Pane>
                      <Tab.Pane eventKey="tab4">
                        <p>4</p>
                      </Tab.Pane>
                      <Tab.Pane eventKey="tab5">
                        <p>5</p>
                      </Tab.Pane>
                      <Tab.Pane eventKey="tab6">
                        <p>6</p>
                      </Tab.Pane>
                    </Suspense>
                    {/* <div className="d-flex flex-row justify-content-end mt-3">
                      {tabKey !== 'tab1' && <Button className="mr-2" variant="danger" onClick={() => handleTab('prev')}>Previous</Button>}
                      {tabKey !== 'tab6' && <Button onClick={() => handleTab('next')}>Next</Button>}
                    </div> */}
                  </Tab.Content>
                </Card.Body>
              </Card>
            </Tab.Container>
          </Modal.Body>
        </form>
      </FormProvider>
    </Modal>
  )
}

export default FormContainer;