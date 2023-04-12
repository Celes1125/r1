import React from "react";
import { Container, Stack, Row, Col, Button } from "react-bootstrap";

const TaskList = ({taskArray})=>{
    return (
        <Container>
            <Stack>
                {taskArray.map(
                    (t)=>{
                        return (
                            <>
                            <hr/>
                            <Row key={t.id}>
                                <Col >{t.description}</Col>
                                <Col><Button>Ver</Button></Col>
                                <Col><Button>Eliminar</Button></Col>
                            </Row>
                            <hr/>                            
                            </>

                        )
                    }
                )}
            </Stack>
        </Container>

    )
}

export default TaskList;