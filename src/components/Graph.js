import React, { Component } from 'react'
import PropType from 'prop-types';
import Vector from '../Vector';
import {Button} from 'reactstrap';
import Equation from './Equation';
import {evaluate} from 'mathjs';

export default class Graph extends Component {
    
    container;

    canvas;

    ctx;

    canvasLen;

    gridSpacing;

    vectorLen;

    state = {
        i:undefined,
        j:undefined,
        invalidEqn: false,
        vectorArray: []
    }

    seti=(i)=> {
    
        this.setState({
            i: i
        })
    }

    setj=(j)=> {
    
        this.setState({
            j: j
        })
    }

    

    /* fits canvas element size to the parent div*/
    fillCanvas=()=>{

        this.container = document.getElementById("container");
        this.canvas = document.getElementById("canvas");

        this.canvas.height = this.container.offsetHeight;
        this.canvas.width = this.container.offsetWidth;


        /*will need the px values during drawing*/

        this.canvasLen = this.container.offsetWidth; //canvas is a square so height==width
        this.gridSpacing = this.canvasLen / 12;
        this.vectorLen = this.gridSpacing * 0.6;
        
    }

    /*draws the grid and its labels*/
    drawGrid=()=>{
        
        this.ctx = this.canvas.getContext("2d");
        

        this.ctx.beginPath();
        /*vertical grid lines*/
        for (let i=0; i<=this.canvasLen;i+=this.gridSpacing){
            this.ctx.moveTo(i,0);
            this.ctx.lineTo(i,this.canvasLen);
        }
        /*horizontal grid lines*/
        for (let j=0; j<=this.canvasLen;j+=this.gridSpacing){
            this.ctx.moveTo(0,j);
            this.ctx.lineTo(this.canvasLen,j);
        }
            

        this.ctx.strokeStyle = "#EDEDED";
        this.ctx.stroke();

        this.ctx.beginPath();

        /*y axis*/
        this.ctx.moveTo(this.canvasLen/2,0);
        this.ctx.lineTo(this.canvasLen/2,this.canvasLen);

        /*x axis*/
        this.ctx.moveTo(0,this.canvasLen/2);
        this.ctx.lineTo(this.canvasLen,this.canvasLen/2);

        this.ctx.strokeStyle = "black";
        this.ctx.stroke();



        
        
    }

    drawVectors = () => {
        if(!this.state.invalidEqn && this.state.vectorArray.length != 0){
            let i = 0;
            for(let y=-5; y<6; y+=1){
                for(let x=-5; x<6; x+=1){
                    let x_canvas = (x+6)*this.gridSpacing;
                    let y_canvas = this.canvasLen - (y+6)*this.gridSpacing;
                    this.state.vectorArray[i].draw(x_canvas,y_canvas,this.vectorLen);
                    i += 1;
                }
            }
        }
   
    }

    

    generateVectors = () => {

        this.state.vectorArray = [];
        for(let y=-5; y<6; y+=1){
            for(let x=-5; x<6; x+=1){

                /*calculate i and j values using equation*/
                let i,j;

                /*if mathjs.evaluate cannot parse the equation throw an error*/
                try{
                    i = evaluate(this.state.i,{
                        x:x,
                        y:y
                    })
                    j = evaluate(this.state.j,{
                        x:x,
                        y:y
                    })

                    /*in some cases such as empty expression mathjs returns undefined*/

                    if(i===undefined || j===undefined){
                        this.setState({invalidEqn:true});
                        return ;
                        //end execution if either i or j is undefined
                    }
                    else{
                        this.state.vectorArray.push(
                            new Vector(this.ctx,i,j)
                        )
                        
                    }

                    
                    
                }
                catch(err){
                    this.setState({invalidEqn:true});
                    return;
                    //end execution if expression cannot be evaluated

                }

                
            }
        }
        this.setState({invalidEqn:false},this.drawVectors);
        

    }

    
    

    componentDidMount(){
        this.fillCanvas();
        this.drawGrid();
        
        window.addEventListener("resize",()=>{
            /*clear canvas first*/
            
            this.ctx.clearRect(0,0,this.canvasLen,this.canvasLen);
            

            /*on window resize re initialize the drawing*/
            
            this.fillCanvas();
            this.drawGrid();
            this.drawVectors();
            
           
        });

        
    }

    
    render() {
        return (
            <div>
                <div className="graph-container" id="container">
                    <canvas id="canvas" >

                    </canvas>
                    
                </div>
                
                <Equation seti={this.seti} setj={this.setj}/>
                {this.state.invalidEqn && 
                <p style={{margin:"0 auto",color:"red"}} >Invalid Equation </p>}
                <br/>
                <Button onClick={this.generateVectors}>Generate</Button>
                
            </div>
        )
    }
}



Graph.propTypes = {
    i: PropType.string,
    j: PropType.string
}