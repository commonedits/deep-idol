import React, {Component} from 'react';
import './FlowNotes.css';
import axios from 'axios'
// import Menu from '../../menu-component/Menu'
// import Nav from '../../nav-component/Nav';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';
// import Swipeable from 'react-swipeable';
const getRhymesAPI = "https://7hbrhkzik4.execute-api.us-west-1.amazonaws.com/test/rhyme"
const getThesaurusAPI = "https://7hbrhkzik4.execute-api.us-west-1.amazonaws.com/test/phonetilicious"
// const getAutoSuggestAPI = "https://7hbrhkzik4.execute-api.us-west-1.amazonaws.com/test/suggest"
// import ReactTransitionGroup from 'react-addons-transition-group'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

export default class FlowNotesSong extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: '',
            title: '',
            results: [],
            offset: 0,
            selectedWord: '',
            selectedWordLocation: 0,
            isActive: 'flow',
            activeTool: 'rhyme',
            saving: false,
            savingText: "Save",
            displayAMT: 2
        };

        console.log("FLOWNOTES CONTEXT: ", context);

        this.timeout = null;


        this.selectWord = this.selectWord.bind(this);
        this.getWords = this.getWords.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.isActive = this.isActive.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.activeTool = this.activeTool.bind(this);
        this.setTool = this.setTool.bind(this);
        this.addRhyme = this.addRhyme.bind(this);
        this.editWords = this.editWords.bind(this);
        this.getSelection = this.getSelection.bind(this);
        this.saveLyrics = this.saveLyrics.bind(this);
    }

    componentWillMount() {
        // if we get here from song page there should be a song loaded
        if (this.props.location.state) {
            this.setState({title: this.props.location.state.title, value: this.props.location.state.body})
        }
    }

    componentDidMount() {
        document.getElementById('navbar').style.opacity = 0
        document.getElementById('navbar').style.zIndex = -100
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
        document.getElementById('navbar').style.opacity = 1
        document.getElementById('navbar').style.zIndex = 100
    }

    componentDidUpdate() {}

    editModeSelectWord(string, cursor) {
        let prevSpace = string.lastIndexOf(' ', cursor);
        let nextSpace = string.indexOf(' ', cursor);
        let result = {
            start: 0,
            end: nextSpace
        }
        if (prevSpace === cursor) {
            prevSpace = string.lastIndexOf(' ', cursor - 1);
            result.start = prevSpace;
        } else if (prevSpace > 0) {
            result.start = prevSpace + 1
        }
        if (nextSpace === -1) {
            result.end = string.length;
        }
        return result;

    }

    getSelection(string) {
        let space = string.lastIndexOf(' ')

        if (space === -1) {
            return 0;
        } else if (space >= string.length - 1) {
            space = string.lastIndexOf(' ', string.length - 2)
            return space + 1;
        } else {
            return space + 1;
        }

    }

    editWords(event) {
        event.persist();
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            if (this.state.isActive === 'edit') {

                let positions = this.editModeSelectWord(event.target.value, event.target.selectionStart);
                event.target.selectionStart = positions.start;
                event.target.selectionEnd = positions.end;
                this.setState({
                    displayAMT: 20,
                    selectedWord: event.target.value.substring(event.target.selectionStart, event.target.selectionEnd),
                    selectedWordLocation: event.target.selectionStart
                }, () => {
                    this.getWords()
                })

            } else if (this.state.isActive === 'auto') {
                this.setState({
                    selectedWord: event.target.value.substring(event.target.selectionStart, event.target.selectionEnd)
                }, () => {
                    alert("SELECTED PHRASE: ", this.state.selectedWord);
                    this.getWords()
                })
            }
        }, 200)
    }

    selectWord(event) {
        event.persist();
        if (this.state.isActive === 'flow') {

            // select the last word
            clearTimeout(this.timeout);

            this.timeout = setTimeout(() => {
                let tempPos = event.target.selectionStart
                event.target.selectionStart = this.getSelection(event.target.value, event.target.selectionStart)
                this.setState({
                    displayAMT: 2,
                    selectedWord: event.target.value.substring(event.target.selectionStart, event.target.selectionEnd)
                }, () => {
                    this.getWords()
                })
                event.target.selectionStart = tempPos;
            }, 300)
        }
    }

    getWords(key) {
        if (this.state.activeTool === 'rhyme') {
            clearTimeout(this.timeout);

            this.timeout = setTimeout(() => {
                axios.post(getRhymesAPI, {rhyme: this.state.selectedWord}).then((res) => {
                    // this.props.updateToken(res.data['renewed_token'])
                    if (res.data.errorMessage) {
                        this.setState({results: [], saving: true})
                    } else {
                        this.setState({results: res.data, saving: true})
                    }
                })

            }, 200);
        } else if (this.state.activeTool === 'thesaurus') {
            clearTimeout(this.timeout);

            this.timeout = setTimeout(() => {
                axios.post(getThesaurusAPI, {input: this.state.selectedWord}).then((res) => {
                    if (res.data.errorMessage) {
                        this.setState({results: [], saving: true})
                    } else {
                        this.setState({results: res.data.output, saving: true})
                    }
                })

            }, 1000);
        }
    }

    nextPage() {
        let newOffset = this.state.offset + this.state.displayAMT;
        this.setState({offset: newOffset})
    }

    addRhyme(word) {
        let replacementSegment = this.state.value.substring(this.state.selectedWordLocation);
        let frontSegment = this.state.value.substring(0, this.state.selectedWordLocation);
        replacementSegment = replacementSegment.split(' ');

        let replacePosition = replacementSegment.indexOf(this.state.selectedWord);
        if (replacePosition === -1) {
            replacementSegment[replacementSegment.length - 1] = word
        } else {
            replacementSegment[replacePosition] = word;
        }

        let newState = frontSegment + replacementSegment.join(' ');

        this.setState({value: newState, selectedWord: word});
    }

    setFilter(filter) {
        this.setState({isActive: filter})
    }
    setTool(filter) {
        this.setState({activeTool: filter})
    }

    isActive(filter) {
        if (filter === this.state.isActive) {
            return 'active';
        }
        return true;
    }

    activeTool(filter) {
        if (filter === this.state.activeTool) {
            return 'active';
        }
        return true;
    }

    prevPage() {
        let newOffset = this.state.offset - 5;
        this.setState({offset: newOffset})
    }

    animateSwipe(event) {}

    saveLyrics() {
     console.log(this.context);
     this.context.router.history.push('/thanks');
    }

    render() {

        // const song = this.props.location.state;

        return (
            <div className="container flownotes-page">
                {/* <div className="modal">
             <div className="modal-tutorial">
              <h1>WELCOME TO FLOW NOTES</h1>
              <p>This is how flow notes works</p>
             </div>
            </div> */}
                <div className="flownotes-navbar">
                    <div className="flownotes-buttons">
                        <a id={this.isActive('flow')} onClick={() => this.setFilter('flow')} className='flownotes-button'>Flow</a>
                        <a id={this.isActive('edit')} onClick={() => this.setFilter('edit')} className='flownotes-button'>Edit</a>
                        {/* <a id={this.isActive('auto')} onClick={() => this.setFilter('auto')} className='flownotes-button'>Auto</a> */}
                    </div>
                    {!this.props.menuStatus && <div className="flownotes-Nav-logo-right">
                        {/* <img id='flownotes-burger' onClick={() => {this.props.showMenu()}} src={require('../../images/hamburger2.png')} alt="Common Edits"/> */}
                        <a onClick={() => this.saveLyrics()} className='ghost-button' style={{
                            paddingTop: 4,
                            paddingBottom: 4,
                            paddingRight: 16,
                            paddingLeft: 16,
                            marginRight: 8
                        }}>
                            SAVE
                        </a>
                        <a onClick={() => this.props.showMenu()}>Menu</a>
                    </div>}
                    {this.props.menuStatus && <div className="menu">
                        {/* <Menu className="opacity" homeMethods={this.props}/> */}
                    </div>}
                </div>

                <div className="song-title-row">
                    <input type='text' value={this.state.title} onChange={(e) => this.setState({title: e.target.value})} placeholder="Enter song title"/>

                </div>

                <div className="type-container">
                    <textarea id="lyric-input" type="text" value={this.state.value} readOnly={this.state.isActive === 'flow'
                        ? false
                        : true} onChange={(event) => {
                        this.setState({value: event.target.value})
                    }} onMouseUp={this.editWords} onKeyUp={this.selectWord} placeholder="Type lyrics here..."/>
                </div>
                <div className="tools-container">
                    <div className="toolbar">
                        {this.state.isActive !== 'auto' && <div className="toolbar-buttons">
                            <a id={this.activeTool('rhyme')} onClick={() => this.setTool('rhyme')} className='flownotes-button'>Rhyme</a>
                            <a id={this.activeTool('thesaurus')} onClick={() => this.setTool('thesaurus')} className='flownotes-button'>Thesaurus</a>
                            {/* <a id={this.activeTool('alliteration')} onClick={() => this.setTool('alliteration')} className='flownotes-button'>Alliteration</a> */}
                        </div>}
                        <div className="dots">
                            <FaChevronLeft id="prev" onClick={() => this.prevPage()}/>
                            <span>Prev</span>
                            <span>Next</span>
                            <FaChevronRight onClick={() => this.nextPage()}/>
                        </div>
                    </div>

                    {/* <Swipeable trackMouse={true} onSwipedLeft={() => this.nextPage()} onSwipedRight={() => this.prevPage()} onSwiping={() => this.animateSwipe()}> */}

                    <div className="results">
                        {this.state.results.map((item, index) => {
                            if (index >= this.state.offset && index <= this.state.offset + this.state.displayAMT) {

                                return (
                                    <a key={index} onClick={(event) => this.addRhyme(item)}>
                                        {item}
                                    </a>
                                )
                            }

                            return true;

                        })}
                    </div>
                    {/* </Swipeable> */}
                </div>
                <div className='bottomblack'></div>
            </div>
        );
    }
}

FlowNotesSong.contextTypes = {
  router: React.PropTypes.object
};
