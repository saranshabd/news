import React from "react";

import News from "./components/News";
import { Container } from "semantic-ui-react";

function App() {
    return (
        <Container style={{ marginTop: 20 }}>
            <News />
        </Container>
    );
}

export default App;
