import React, { Component } from 'react'
import {Button,InputGroup,InputGroupAddon,InputGroupText,Input} from 'reactstrap';

export default function Equation(props){

    return (
        <div className="equation">
            <InputGroup>
                <InputGroupAddon addonType="prepend">f(x,y):</InputGroupAddon>
                <Input onChange={(e)=>{props.seti(e.target.value)}}></Input>
                <InputGroupAddon addonType="append">i</InputGroupAddon>
                <p style={{margin:0,lineHeight:"38px"}}>&#65291;</p>
                <Input onChange={(e)=>{props.setj(e.target.value)}}></Input>
                <InputGroupAddon addonType="append">j</InputGroupAddon>
            </InputGroup>
            

        </div>
    )

}
