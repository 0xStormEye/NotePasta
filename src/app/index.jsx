import React from 'react';
import {render} from 'react-dom';

import { Button, ButtonToolbar, Form, FormGroup, FormControl, } from 'react-bootstrap';

import CodeMirror from 'react-codemirror';
import 'codemirror/theme/monokai.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';

import Modal from 'reboron/DropModal';

import PouchDB from 'pouchdb-browser';
let db = new PouchDB('notePasta');

class LeftColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            code: '',
            pastaNotes: [],
            rev: '',
            newPastaTitle: '',
            newPastaContent: '',
            newPastaKeyword: '',
        }

        this.retrievePasta();
    }

    async deletePasta(_id, _rev) {
        // let result = await db.allDocs().then((doc)=>{console.log(doc);for (var item in doc.rows) {console.log(item.id);db.remove(item.id, item._rev);}});
        // console.log(result);
        // if (result) {
        //     this.setState({code: result.content, rev: result._rev, pastaNotes: result.pastaNotes});
        // }
        db.remove(_id, _rev);

    }

    async retrievePasta() {
        let result = await db.get('notePasta');
        if (result) {
            this.setState({code: result.content, rev: result._rev, pastaNotes: result.pastaNotes});
        }
    }

    async newPasta() {
        console.log(this.state);
        let data = {
            _id: this.state.newPastaTitle,
            content: this.state.newPastaContent,
            keyword: this.state.newPastaKeyword,
            date: new Date().toISOString(),
        }
        db.put(data, {force: true}, function callback(err, result) {
            if (!err) {
                console.log("Successfully preserved the pasta in the fridge.");
            } else {
                console.log("Something wrong with the fridge. " + err);
            }
        });
    }

    async updatePasta() {
        console.log(this.state);
        let data = {
            _id: this.state.updatePastaTitle,
            content: this.state.updatePastaContent,
            keyword: this.state.updatePastaKeyword,
            date: new Date().toISOString(),
        }
        db.put(data, {force: true}, function callback(err, result) {
            if (!err) {
                console.log("Successfully preserved the pasta in the fridge.");
            } else {
                console.log("Something wrong with the fridge. " + err);
            }
        });
    }

    newPastaPopup() {
        let newPastaContentEditorCSS = {
            lineNumbers: true,
            mode: 'javascript',
            theme: 'monokai',
            lineWrapping: true,
        }
        return (
<div>
    <Modal ref="modal" keyboard={this.callback} className="newPastaPopup">
        <FormControl bsClass="searchBar" type="text" value={this.state.newPastaTitle} placeholder="Title"
        onChange = {(event) => {this.setState({'newPastaTitle':event.target.value})}} />
    <CodeMirror className={'newPastaEditor'} value={this.state.newPastaContent} onChange={(value) => {this.setState({newPastaContent: value})}} options={newPastaContentEditorCSS} />
        <button onClick={() => {this.newPasta(); this.hideModal;}}>Save</button>
    </Modal>
</div>
        );
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
    {this.newPastaPopup()}
    <div className="searchCol">
        <FormControl bsClass="searchBar" type="text" value={this.state.value} placeholder="Keyword"
        onChange = {(event) => {this.setState({'value':event.target.value})}} />
    <ButtonToolbar className="searchBarButton">
            <Button bsSize="small" onClick={() => {this.refs.modal.show();}}>New Pasta</Button>
            <Button bsSize="small" onClick={() => {}}>Save Pasta</Button>
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
            src: '',
            dest: '',
            prepareNote: '',
            finalNote: '',

        }
    }

    finalNoteRender() {
        this.setState({finalNote:
            "Source IP address:" + this.state.src + " \n" +
            "Destination IP address:" + this.state.dest + " \n" +
            "\n" +
            this.state.prepareNote
        })
    }

    render () {
        let PastaPrepareEditorCSS = {
            mode: 'javascript',
            theme: 'monokai',
            lineWrapping: true,
        }

        let PastaFinalEditorCSS = {
            mode: 'javascript',
            theme: 'monokai',
            lineWrapping: true,
        }
        return (
<div className="RightMain container-fluid nopadding">
        <div className="InputSection col nopadding">
            <FormControl bsClass="searchBar" type="text" value={this.state.src} placeholder="Source IP Address"
            onChange = {(event) => {this.setState({'src':event.target.value})}} />
        <FormControl bsClass="searchBar" type="text" value={this.state.dest} placeholder="Destination IP Address"
            onChange = {(event) => {this.setState({'dest':event.target.value})}} />
        <CodeMirror className={'pastaEditor'} value={this.state.prepareNote} onChange={(value) => {this.setState({prepareNote: value}); this.finalNoteRender();}} options={PastaPrepareEditorCSS} />
        </div>

        <div className="OutputSection col nopadding">
            <CodeMirror className={'pastaEditor'} value={this.state.finalNote} options={PastaFinalEditorCSS} />
        </div>
</div>
);
    }
}

render(<RightColumn />, document.getElementById('RightColumn'));
