import { evaluate } from "mathjs";
import { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";


const FalsePosition = () => {
    const [Equation, setEquation] = useState("x^4-13");

    const [X, setX] = useState();
    const [XL, setXL] = useState(0);
    const [XR, setXR] = useState(0);
    const data = [];
    const [state, setstate] = useState([]);
    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;

    const Calfalsepos = (xl, xr) => {
        var xi,fXi,fXl,fXr,ea,scope;
        var iter = 0;
        var xstring = ""+iter;
        var MAX = 50;
        const e = 0.00001;
        var obj={};

        do
        {
            scope = {
                x:xl,
            }
            fXl = evaluate(Equation, scope)
            scope = {
                x:xr,
            }
            fXr = evaluate(Equation, scope)
            xi = (xl*(fXr)-xr*(fXl))/(fXr-fXl);
            scope = {
                x:xi,
            }
            fXi = evaluate(Equation, scope)
            iter ++;
            xstring = "X"+iter;
            if (fXi*fXr > 0)
            {
                ea = error(xr, xi);
                obj = {
                    Iteration:iter,
                    Xn:xstring,
                    Xi:xi,
                    Xl:xl,
                    Xr:xr
                }
                data.push(obj)
                xr = xi;
            }
            else if (fXi*fXr < 0)
            {
                ea = error(xl, xi);
                obj = {
                    Iteration:iter,
                    Xn:xstring,
                    Xi:xi,
                    Xl:xl,
                    Xr:xr
                }
                data.push(obj)
                xl = xi;
            }
        }while(ea>e && iter<MAX)
        setX(xi)
    }

    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        Calfalsepos(xlnum,xrnum);
        setstate(data);
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
                            <th width="30%">Xn</th>
                            <th width="30%">XL</th>
                            <th width="30%">XR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.Iteration}</td>
                                <td>{element.Xn}</td>
                                <td>{element.Xl}</td>
                                <td>{element.Xr}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
        </Container>
    )
}

export default FalsePosition