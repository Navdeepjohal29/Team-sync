import React, {useState} from 'react';
import { Row,Col,Card,Container} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import userImage from '../../Images/user.png';
import add_member from '../../Images/plus.png';
import './ListMember.css';
import Header from '../../Components/Header/Header';

// ListMember will accept an array of user objects
// using map we will list each user 
// Edit Button will have a callback to HandleEditClick that set the state to that editinguser object
// then we navigate to /EditMember and pass the state so that EditMember page can pre-fill the user data 

const ListMember = ({UserList}) => {
    const navigate = useNavigate();
    const [editingUser, setEditingUser]=useState(null);
    const handleEditClick = (user)=>{
        setEditingUser(user);
        console.log("user in List Members", user);
        navigate("/EditMember", { state: { userdata: user } });
    }
 
    return (
        <>
        <Header/>
        <Container className='list-container'>
         <Row>
                <Col md={6} className="m-auto mt-5 member_form">
                   <Link to="/AddMember"><img  className='plus_icon' src={add_member} alt="plus-icon"/></Link>
                    <div className="add_team_member">
                        <h2>  Team members</h2>
                        <p>You have {UserList.length } team members.</p>
                    </div>
                    {UserList.map((user) => (
                     
                <Col key={user.user_id}>
                    <Card className='member_list'>
                        <Card.Img variant="top" src={userImage}/>
                        <Card.Body>
                        <Card.Title>{user.firstname} {user.lastname}
                        {user.role ===1 ? ` (Admin)` : ''}
                        </Card.Title>
                        <Card.Text>
                        <a href= "#">{user.phone}</a>
                        <a href="#"> {user.email}</a>
                       
                        </Card.Text>
                        </Card.Body>
                        
                         <button className='buttonStyle ' onClick={() => handleEditClick(user=user)}>Edit</button>
                       

                    </Card>
                    </Col>
               
            ))}
             </Col>
            </Row>
            </Container>
        </>
    );
};

export default ListMember;