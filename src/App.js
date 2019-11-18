import React, { Component } from "react";
import "./App.css";
import headstock from "./images/headstock.jpg";
import Tuner from "./components/tuner_button";
import Sound from "react-sound";
import E from "./sounds/low E.mp3";
import A from "./sounds/A.mp3";
import D from "./sounds/D.mp3";
import G from "./sounds/G.mp3";
import B from "./sounds/B.mp3";
import e from "./sounds/high e.mp3";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
        { note: "E", tone: E },
        { note: "A", tone: A },
        { note: "D", tone: D },
        { note: "G", tone: G },
        { note: "B", tone: B },
        { note: "e", tone: e }
      ],
      playing: Sound.status.PAUSED,
      noteToBePlayed: "",
      loop: false
    };
  }

  playSound = e => {
    const noteToBePlayed = this.state.notes.filter(
      el => el.note === e.target.textContent
    );
    this.setState({
      noteToBePlayed: noteToBePlayed[0].tone,
      playing: Sound.status.PLAYING
    });
  };

  handleLoopStatus = () => {
    this.setState({ loop: !this.state.loop });
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Online Guitar Tuner</h1>
          <p>tap the note, tune the string to the tone.</p>
        </div>
        <div className="tuner-container">
          {this.state.notes.map(note => (
            <Tuner
              key={note.note}
              playSound={e => this.playSound(e)}
              note={note.note}
              className={`noteStyle ${note.note}`}
            />
          ))}
          <div className="checkbox">
            <input
              name="loop"
              type="checkbox"
              onClick={this.handleLoopStatus}
            ></input>
            <label>Loop Note</label>
          </div>
        </div>

        <img
          className="image"
          alt="headstock"
          height="800px"
          src={headstock}
        ></img>
        <Sound
          url={this.state.noteToBePlayed}
          playStatus={this.state.playing}
          loop={this.state.loop}
          onFinishedPlaying={() =>
            this.setState({ playing: Sound.status.PAUSED })
          }
        />
      </div>
    );
  }
}

export default App;
