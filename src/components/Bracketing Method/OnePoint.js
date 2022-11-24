import { evaluate } from "mathjs";
import { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";


const OnePoint = () => {
    const [Equation, setEquation] = useState("1+1/(x)");

    const [X, setX] = useState();
    const [X0, setX0] = useState(0);
    const data = [];
    const [state, setstate] = useState([]);
    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;

    const Calonepoint = (x0) => {
        var gx0,gx1,ea,scope;
        var x1 = 0;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj={};

        do
        {
            iter ++;
            scope = {
                x:x0,
            }
            gx0 = evaluate(Equation, scope)
            x1 = evaluate(Equation, scope)
            scope = {
                x:x1,
            }
            gx1 = evaluate(Equation, scope)
            obj = {
                Iteration:iter,
                X0:x0,
                X1:x1,
                gX0:gx0,
                gX1:gx1
            }
            data.push(obj)
            ea = error(x0, x1);
            x0 = x1;
        }while(ea>e && iter<MAX)
        setX(x1)
    }

    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        Calonepoint(x0num);
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
                            <th width="20%">g(X0)</th>
                            <th width="20%">X1</th>
                            <th width="20%">g(X1)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.Iteration}</td>
                                <td>{element.X0}</td>
                                <td>{element.gX0}</td>
                                <td>{element.X1}</td>
                                <td>{element.gX1}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
        </Container>
    )
}

export default OnePoint