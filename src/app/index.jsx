import React from 'react';
import {render} from 'react-dom';

import { Button, Form, FormGroup, FormControl, } from 'react-bootstrap';

import CodeMirror from 'react-codemirror';
// import 'codemirror/theme/monokai.css';
import markdown from 'codemirror/mode/markdown/markdown';

class NoteMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'value': '',
            'code': 'aaaa **aaaaaa**',
        }
    }

    render () {
        let editorCSS = {
            lineNumbers: true,
            mode: markdown,
            theme: 'monokai',
        }

        return (
<div className="noteMain">
    <div className="searchCol">
        <Form><FormGroup controlId="formBasicText">
            <FormControl bsClass="searchBar" type="text" value={this.state.value} placeholder="Keyword"
            onChange = {(event) => {this.setState({'value':event.target.value})}} />
            <FormControl.Feedback />
        </FormGroup></Form>
    </div>

        <CodeMirror className={'noteEditor'} value={this.state.code} onChange={(value) => {this.setState({code: value})}} options={editorCSS} />
</div>
);
    }
}

render(<NoteMain />, document.getElementById('NoteMain'));
