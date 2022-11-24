import { evaluate,  index , inv } from "mathjs";
import { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import 'chart.js/auto';
import { Bar, Line } from "react-chartjs-2";

const Bisection = () => {
    const [Equation, setEquation] = useState("x^4-13");

    const [X, setX] = useState();
    const [XL, setXL] = useState(0);
    const [XR, setXR] = useState(0);
    
    const data = [{iteration:0, Xl:0, Xm:0, Xr:0}];
    //const [state, setstate] = useState([]);
    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;

    const Calbisection = (xl, xr) => {
        var xm,fXm,fXr,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj={};
        data.pop();
        do
        {
            xm = (xl+xr)/2.0;
            scope = {
                x:xr,
                X:xr
            }
            fXr = evaluate(Equation, scope)
            scope = {
                x:xm,
                X:xm
            }
            fXm = evaluate(Equation, scope)

            iter ++;
            if (fXm*fXr > 0)
            {
                ea = error(xr, xm);
                obj = {
                    Iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr,
                    Ea:ea
                }
                
                data.push(obj)
                xr = xm;
            }
            else if (fXm*fXr < 0)
            {
                ea = error(xl, xm);
                obj = {
                    Iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr,
                    Ea:ea
                }
                
                data.push(obj)
                xl = xm;
            }
        }while(ea>e && iter<MAX)
        setX(xm)
    }

    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        Calbisection(xlnum,xrnum);
        setstate(data);
        setgraph({labels: state.map((element,index)=>{return element.Iteration;}),
        datasets: [
          {
            label: 'Xm',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#51dfa8',
            borderColor: '#51dfa8',
            borderWidth: 2,
            data: state.map((element,index)=>{return element.Xm;})
          },
          {
            label: 'error',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#f12e2e',
            borderColor: '#f12e2e',
            borderWidth: 2,
            data: state.map((element,index)=>{return element.Ea;})
          }
        ]
    })
    }
    const[state,setstate] = useState([{
        Iteration:0,
        Xl:0,
        Xm:0,
        Xr:0,
        Ea:0
    }])
    const[graph,setgraph] = useState({labels: state.map((element,index)=>{return element.Iteration;}),
    datasets: [
        {
          label: 'Xm',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#51dfa8',
          borderColor: '#51dfa8',
          borderWidth: 2,
          data: state.map((element,index)=>{return element.Xm;})
        },
        {
          label: 'error',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#f12e2e',
          borderColor: '#f12e2e',
          borderWidth: 2,
          data: state.map((element,index)=>{return element.Ea;})
        }
      ]
  });
    const e=(even)=>{
        console.log(even.target.value) ;
        
    }

    
    return(
     <Container className="mb-4">
            <Row className="mb-4">
                        <Col>
                        <h4>f(x)</h4>
                        <input type="text" id="equation" value={Equation} onChange={e => setEquation(e.target.value)} ></input>
                        </Col>
                        <Col>
                        <h4>XL</h4>
                        <input type="number" id="XL" value={XL} onChange={e => setXL(e.target.value)} ></input>
                        </Col>
                        <Col>
                        <h4>XR</h4>
                        <input type="number" id="XR" value={XR} onChange={e => setXR(e.target.value)} ></input>
                        </Col>
                </Row>

                <Button className="mb-4" variant="dark" onClick={calculateRoot}>
                        Calculate
                </Button>
                    <br></br>
                    <h1>Ans = {X}</h1>


                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width="30%">XM</th>
                            <th width="30%">XR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.Iteration}</td>
                                <td>{element.Xl}</td>
                                <td>{element.Xm}</td>
                                <td>{element.Xr}</td>
                            </tr>)
                        })}
                    </tbody>
                    
                </Table>
                <Line
                        data={graph}
                        options={{
                            title:{
                                display:true,
                                text:'test',
                                fontSize:20
                            },
                            legnd:{
                                display:true,
                                position: 'right'
                            }
                        }}
                    />

            
        </Container>

    )
}

export default Bisection