import React, { useState } from "react";
import { Container, Row, Form, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import InputForm from '../../Components/InputForm/InputForm'
import './AddMember.css'
import Button from "../../Components/Button/Button";
import { createUser } from "../../Api/api";
import Header from "../../Components/Header/Header";

const AddMember = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState(2);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validation logic for each field
        if (firstName.trim() === "") {
            newErrors.firstName = "First Name is required";
            isValid = false;
        }
        if (lastName.trim() === "") {
            newErrors.lastName = "Last Name is required";
            isValid = false;
        }
       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            newErrors.email = "Enter a valid email address";
            isValid = false;
        }
        
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        if (!phoneRegex.test(phone.trim())) {
            newErrors.phone = "Enter a valid phone number (e.g., XXX-XXX-XXXX)";
            isValid = false;
        }

        // Repeat the above validation logic for other fields

        setErrors(newErrors);
        return isValid;
    };
    function selectRole(value) {
        setRole(value);
        console.log("role set to", value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset previous messages and errors
        setMessage(null);
        setErrors({});

        // Validate form
        const isValid = validateForm();

        if (isValid) {
            // Perform logic to handle form submission (e.g., make an API call)
            // For demonstration purposes, show a success message
            const payload = {
                "firstname": firstName,
                "lastname": lastName,
                "email": email,
                "phone": phone,
                "role": role,
            };
            const isSucess = await createUser(payload);
            if (isSucess === true) {
                setMessage("Member added successfully");
                // First show message then it will navigate to list member page
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
            else {
                setMessage(" Some error occured");

            }

        }
        else {
            setMessage("Please check the errors.");
        }
    };



    return (
        <>
        <Header/>
            <Container>
                <Row>
                    <div className="col-md-6 m-auto mt-5 member_form">
                        <div className="add_team_member">
                            <h2>Add a team member</h2>
                            <p>Set email, location and role.</p>
                        </div>

                        <Form>
                            {message && (
                                <Alert variant={Object.keys(errors).length > 0 ? "danger" : "success"} className="mt-3">
                                    {message}
                                </Alert>
                            )}
                            <InputForm label="Info" formtext="First Name" onChange={(e) => setFirstName(e.target.value)} error={errors.firstName} />
                            <InputForm formtext="Last Name" onChange={(e) => setLastName(e.target.value)} error={errors.lastName} />
                            <InputForm formtext="Email" onChange={(e) => setEmail(e.target.value)} error={errors.email} />

                            <InputForm formtext="Phone" onChange={(e) => setPhone(e.target.value)} error={errors.phone} />




                            <div className="role-col mt-3">
                                <div className="custom-input"> <label>Role</label></div>
                                {['radio'].map((type) => (
                                    <div key={type} className="mb-3 mt-4">

                                        <Form.Check
                                            defaultChecked
                                            label="Regular - Can't delete members"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-1`}
                                            onClick={() => selectRole(2)}
                                        />
                                        <Form.Check
                                            label=" Admin - Can delete members"
                                            type={type}
                                            name="group1"
                                            id={`inline-${type}-2`}
                                            className="fade-color"
                                            onClick={() => selectRole(1)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Form>
                        <div className="text-right mt-5">
                            <Button text="Save" onClick={(e) => handleSubmit(e)} />

                        </div>
                    </div>

                </Row>
            </Container>
        </>
    )
}

export default AddMember;