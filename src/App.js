import React, { Component } from 'react';
import './App.css';

const NUMBER_CONST = '0123456789';
const REPO_GITHUB = "https://github.com/hijiangtao/rainmood";

class App extends Component {
  state = {
    musicId: '0',
    logoClassSubfixName: 'static', // 'static', 'switch'
  }

  onSelectChange = (event) => {
      this.setState({
        musicId: event.target.value,
      }, () => {
        this.refs.audio.pause();
        this.refs.audio.load();
        this.refs.audio.play();
      });
  }

  forceMusicChange = () => {
    this.setState({
      musicId: ((parseInt(this.state.musicId) + 1) % 10).toString(),
      logoClassSubfixName: 'switch',
    }, () => {
      this.refs.audio.load();
      this.refs.audio.play();
    });

    setTimeout(() => {
      this.setState({
        logoClassSubfixName: 'static',
      })
    }, 1000);
  }

  componentDidMount() {
    this.refs.audio.addEventListener("ended", this.forceMusicChange);
  }

  render() {
    const {musicId} = this.state;
    // console.log(`${process.env.PUBLIC_URL}/music/${musicId}.mp3`)
    console.log(this.state.logoClassSubfixName)

    return (
      <div className="App">
        <header className="App-header">
          <div 
            // style={{
            //   background: `url(${process.env.PUBLIC_URL + '/favicon.png'}) no-repeat center center`,
            // }}
            className={`App-logo-${this.state.logoClassSubfixName}`} 
            onClick={this.forceMusicChange}
          >
            {/* <img
              className="App-logo-img"
              onClick={this.forceMusicChange}
              src={process.env.PUBLIC_URL + '/favicon.png'} 
              alt="logo" /> */}
          </div>
          <p>
            倾听 专注  
          </p>
          <span style={{
            color: '#666',
            fontSize: '0.8rem',
          }}>
            循环播放十首电影原声精选，背景乐为下雨声。
            <br/>
            切换音乐▷
            <select value={musicId} onChange={this.onSelectChange}>
              {NUMBER_CONST.split('').map((e, i) => {
                return (
                  <option key={i} val={i} >{i}</option>
                )
              })}
            </select>
            &nbsp;详见&nbsp;
            <a
              className="App-link"
              href={REPO_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </span>
        </header>

        <footer>
          <audio autoPlay loop>
            <source src={process.env.PUBLIC_URL + "/music/main.m4a"} />
          </audio>

          <audio autoPlay ref="audio">
            <source src={`${process.env.PUBLIC_URL}/music/${musicId}.${musicId === '5' ? 'm4a' : 'mp3'}`} /> 
          </audio>
        </footer>
      </div>
    );
  }
}

export default App;
