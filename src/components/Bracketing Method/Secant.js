import { evaluate } from "mathjs";
import { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";


const Secant = () => {
    const [Equation, setEquation] = useState("x^4-13");

    const [X, setX] = useState();
    const [X0, setX0] = useState(0);
    const [X1, setX1] = useState(0);

    const data = [];
    const [state, setstate] = useState([]);
    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;

    const Calsecant= (x0, x1) => {
        var f0,f1,ea,DF,DX,scope;
        var iter = 0;
        const e = 0.000001;
        var obj={};

        do
        {
            iter ++;
            scope = {
                x:x0,
            }
            f0 = evaluate(Equation, scope)
            scope = {
                x:x1,
            }
            f1 = evaluate(Equation, scope)

            DF = (f0-f1)/(x0-x1);
            DX = (-f1)/DF;
            x0 = x1;
            x1+=DX;
            obj = {
                Iteration:iter,
                X0:x0,
                X1:x1,
                F0:f0,
                F1:f1
            }
            data.push(obj)
            ea = error(x0, x1)            
        }while(ea>e)
        setX(x1)
    }

    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        const x1num = parseFloat(X1)
        Calsecant(x0num,x1num);
        setstate(data);
    }

    return(
        <Container className="mb-4">
            <Row className="mb-4">
                    <Col>
                    <h4>g(x)</h4>
                    <input type="text" id="equation" value={Equation} onChange={e => setEquation(e.target.value)} ></input>
                    </Col>
                    <Col>
                    <h4>X0</h4>
                    <input type="number" id="X0" value={X0} onChange={e => setX0(e.target.value)} ></input>
                    </Col>
                    <Col>
                    <h4>X1</h4>
                    <input type="number" id="X1" value={X1} onChange={e => setX1(e.target.value)} ></input>
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
                            <th width="20%">Iteration</th>
                            <th width="20%">X0</th>
                            <th width="20%">f(X0)</th>
                            <th width="20%">X1</th>
                            <th width="20%">f(X1)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.Iteration}</td>
                                <td>{element.X0}</td>
                                <td>{element.F0}</td>
                                <td>{element.X1}</td>
                                <td>{element.F1}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
        </Container>
    )
}

export default Secant