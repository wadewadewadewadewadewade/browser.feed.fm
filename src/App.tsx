import React, { Component } from 'react';
import './App.css';

interface IWidget {
  id: number,
  name: string,
  tags: Array<string>,
  dongles: Array<string>
}

const Widget = (props: IWidget) => {
  return (
    <li key={props.id}>props.name
      <b>tags:</b>
      <ol>
        {props.tags.map(t => <li key={t}>{t}</li>)}
      </ol>
      <b>dongles:</b>
      <ol>
        {props.dongles.map(d => <li key={d}>{d}</li>)}
      </ol>
    </li>
  )
}

const api = 'http://localhost:3001'
const headers = {
  'Accept': 'application/json',
}

class Widgets extends Component {
  state = {
    fetching: false,
    widgets: Array<IWidget>(),
    tag: '',
    offset: 0,
    max: 10
  }
  getWidgets(params?: any) {
    this.setState({fetching: true})
    let props = Object.assign({}, this.state, params)
    fetch(`${api}/tags/${props.tag}/${props.offset}/${props.max}`, { headers })
    .then(res => res.json())
    .then(data => {
      if (data) {
        this.setState(() => ({ ...props, fetching:false, widgets: data }))
        console.log(data)
      }
    })
  }
  change(aspect: string, value: string | number) {
    let temp: any = {}
    temp[aspect] = value
    this.getWidgets(temp)
  }
  componentDidMount() {
    this.getWidgets()
  }
  render() {
    return (
      <div>
        <label>Tag: <input type='text' value={this.state.tag} onChange={(e) => this.change('tag', e.target.value)} /></label>
        <label>Offset: <input type='number' value={this.state.offset} onChange={(e) => this.change('offset', e.target.value)} /></label>
        <label>max: <input type='number' value={this.state.max} onChange={(e) => this.change('max', e.target.value)} /></label>
        <ul>
          {this.state.widgets.map(w => <Widget key={w.id} {...w}/>)}
        </ul>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <Widgets />
    </div>
  );
}

export default App;
