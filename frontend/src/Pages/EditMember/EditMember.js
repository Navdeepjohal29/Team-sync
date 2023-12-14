import React, { useState, useEffect } from "react";
import { Container, Row, Form, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import InputForm from '../../Components/InputForm/InputForm';
import { deleteUser, editUser } from "../../Api/api";
import Button from "../../Components/Button/Button";
import './EditMember.css';
import Header from "../../Components/Header/Header";

//When calling EditMember pass the current user state with user data
//Example: navigate("/EditMember", { state: { userdata: user } });

const EditMember = () => {
    const loc = useLocation();
    const { userdata } = loc.state || {};
    console.log("edit>>>> member data is ", userdata);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [userid, setUserId] = useState(userdata.user_id);
    const [role, setRole] = useState("");
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (userdata) {
            // Populate the form fields with user data
            setFirstName(userdata.firstname || ""); // Use empty string as default if user.firstname is undefined
            setLastName(userdata.lastname || "");   // Use empty string as default if user.lastname is undefined
            setEmail(userdata.email || "");         // Use empty string as default if user.email is undefined
            setPhone(userdata.phone || "");         // Use empty string as default if user.phone is undefined
            setRole(userdata.role || "");           // Use empty string as default if user.role is undefined
        }
    }, [userdata]);


    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validation rules
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

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = async () => {
        const isValid = validateForm();

        if (isValid) {
            // Perform logic to save the updated information (e.g., make an API call)
            const payload = {
                "firstname": firstName,
                "lastname": lastName,
                "email": email,
                "phone": phone,
                "role": role,
            };
            console.log("payload", payload)
            const isSucess = await editUser(userid, payload);
            if (isSucess === true) {
                setMessage("Information edit successfully");
                // First show message then it will navigate to list member page
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
            else {
                setMessage(" Some error occured");

            }
        }
    };
    const handleDelete = async () => {
        console.log("this is userid", userid);
        const isSucess = await deleteUser(userid);
        if (isSucess === true) {
            setMessage("Member Deleted  successfully");
            // First show message then it will navigate to list member page
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
        else {
            setMessage(" Some error occured");

        }


    };

    return (
        <>
        <Header/>
            <Container>
                <Row>
                    <div className="col-md-6 m-auto mt-5 member_form">
                        <div className="add_team_member">
                            <h2>Edit team member</h2>
                            <p>Edit contact info, location, and role.</p>
                        </div>
                        <Form>
                            <InputForm label="Info" formtext="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} error={errors.firstName} />
                            <InputForm formtext="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} error={errors.lastName} />
                            <InputForm formtext="Email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
                            <InputForm formtext="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} />
                        </Form>

                        <div className="role-col mt-3">
                            <div className="custom-input"><label>Role</label></div>
                            {['radio'].map((type) => (
                                <div key={type} className="mb-3 mt-4">
                                    <Form.Check
                                        checked={role === 2}
                                        label="Regular - Can't delete members"
                                        onChange={() => setRole(2)}
                                        type={type}
                                        id={`inline-${type}-1`}

                                    />
                                    <Form.Check
                                        checked={role === 1}
                                        label="Admin - Can delete members"
                                        onChange={() => setRole(1)}
                                        type={type}
                                        id={`inline-${type}-2`}

                                    />
                                </div>
                            ))}
                        </div>

                        {message && (
                            <Alert variant={errors && Object.keys(errors).length > 0 ? "danger" : "success"} className="mt-3">
                                {message}
                            </Alert>
                        )}

                        <div className="d-flex justify-content-between mt-3">
                            <Button text="Save" onClick={handleSave} />
                            <Button className="del-btn" text="Delete" onClick={handleDelete} />
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default EditMember;
