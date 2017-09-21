import React from 'react';
import {render} from 'react-dom';

import { Button, ButtonToolbar, Form, FormGroup, FormControl, } from 'react-bootstrap';

import CodeMirror from 'react-codemirror';
import 'codemirror/theme/monokai.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';

class LeftColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'value': '',
            'code': 'aaaa **aaaaaa**',
        }
    }

    render () {
        let PastaEditorCSS = {
            lineNumbers: true,
            mode: 'javascript',
            theme: 'monokai',
            lineWrapping: true,
        }

        return (
<div className="LeftMain">
    <div className="searchCol">
        <FormControl bsClass="searchBar" type="text" value={this.state.value} placeholder="Keyword"
        onChange = {(event) => {this.setState({'value':event.target.value})}} />
    <ButtonToolbar className="searchBarButton">
            <Button bsSize="small">Default</Button>
        </ButtonToolbar>
    </div>

    <CodeMirror className={'pastaEditor'} value={this.state.code} onChange={(value) => {this.setState({code: value})}} options={PastaEditorCSS} />
</div>
);
    }
}

render(<LeftColumn />, document.getElementById('LeftColumn'));


class RightColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'value': '',
            'code': 'aaaa **aaaaaa**',
        }
    }

    render () {
        let PastaReadyEditorCSS = {
            mode: 'javascript',
            theme: 'monokai',
            lineWrapping: true,
        }

        let PastaDishEditorCSS = {
            lineNumbers: true,
            mode: 'javascript',
            theme: 'monokai',
            lineWrapping: true,
        }

        return (
<div className="RightMain container-fluid nopadding">
        <div className="InputSection col nopadding">
            <FormControl bsClass="searchBar" type="text" value={this.state.value} placeholder="Keyword"
            onChange = {(event) => {this.setState({'value':event.target.value})}} />
            <FormControl bsClass="searchBar" type="text" value={this.state.value} placeholder="Keyword"
            onChange = {(event) => {this.setState({'value':event.target.value})}} />
            <CodeMirror className={'pastaEditor'} value={this.state.code} onChange={(value) => {this.setState({code: value})}} options={PastaReadyEditorCSS} />
        </div>

        <div className="OutputSection col nopadding">
            <CodeMirror className={'pastaEditor'} value={this.state.code} onChange={(value) => {this.setState({code: value})}} options={PastaDishEditorCSS} />
        </div>
</div>
);
    }
}

render(<RightColumn />, document.getElementById('RightColumn'));
