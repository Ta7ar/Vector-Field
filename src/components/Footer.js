import React, { Component, useState } from 'react'
import {Button,Modal,ModalBody, ModalHeader} from 'reactstrap';

export default function Footer() {
    const [modal,modalToggle] = useState(false);

    return (
        <div className="footer" style={{paddingTop:"2.5vw", paddingBottom:"2.5vw"}}>
            <a href="https://github.com/Ta7ar/Vector-Field">
            <Button>
                <i className="fa fa-github"></i>
            </Button>
            </a>
            &nbsp;
            
            <Button onClick={()=>{modalToggle(!modal)}}><i class="fa fa-question-circle"></i></Button>
            <Modal isOpen={modal} toggle={()=>{modalToggle(!modal)}}>
                <ModalHeader toggle={()=>{modalToggle(!modal)}}></ModalHeader>
                <ModalBody>
                    Generate 2D Vector-Field using a user defined function such as,
                    f(x,y)=(2x^sqrt(3))i + (x+y)*sin(30 deg)j.
                    For acceptable expressions check
                    <a href= "https://mathjs.org/docs/expressions/parsing.html"> mathjs.org</a>
                </ModalBody>
            </Modal>
        </div>

    )

}
