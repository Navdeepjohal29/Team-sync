import React from 'react';
import Form from 'react-bootstrap/Form'
import "./InputForm.scss"
function Input(props) {
    return (
        <>
            <Form.Group className=" custom-input error" controlId="formBasicEmail">
                <label>{props.label}</label>
                <Form.Control className='form-control-danger' type={props.type} placeholder={props.formtext} onChange={props.onChange} name={props.name} value={props.value} autoComplete="off" />
                <span className="error danger text-danger text-success">{props.error}</span>
            </Form.Group>
           
        </>
    );
}

export default Input;
