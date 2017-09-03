import * as React from "react";
import { Col, Grid, ListGroup, ListGroupItem, Panel, Row, Thumbnail } from "react-bootstrap";
import { Format } from "../lib/common";
import Hero from "./Hero";

interface IRecord {
  id: string;
  title: string;
  artist: string;
  image: string;
  duration_ms: number;
  tempo: number;
  vocals: boolean;
}

interface IAppState {
  crate: IRecord[];
  setList: IRecord[];
}

const Record = ({ record, onClick }: { record: IRecord, onClick: React.EventHandler<any> }) => {
  return (<Col xs={3} md={2}>
    <Thumbnail href="#" src={record.image} alt="record" onClick={onClick}>
      <h4>{record.title}</h4><h5>{record.artist}</h5>
      <p><strong>Tempo:</strong> {record.tempo.toFixed(0)} bpm</p>
      <p><strong>Length:</strong> {Format.formatTime(new Date(record.duration_ms))}</p>
    </Thumbnail>
  </Col>
  );
};

const SetStats = ({ set }: { set: IRecord[] }) => {
  const setLength = set.reduce((sum, record) => sum += record.duration_ms, 0);
  const maxTempoChange = set.reduce(({ max, last }, record) => {
    const diff = Math.abs(last.tempo - record.tempo);
    return (diff > max) ? { max: diff, last: record } : { max, last: record };
  }, { max: 0, last: set[0] }).max;
  return (
    <div>
      <h3>Set Length: {Format.formatTime(new Date(setLength))}</h3>
      <h3>Max Tempo Change: {maxTempoChange.toFixed(0)} bpm</h3>
    </div>
  );
};

class App extends React.Component<{}, IAppState> {

  constructor() {
    super();
    this.state = {
      crate: [],
      setList: [],
    };
  }

  public componentDidMount() {
    fetch("api/records")
      .then(res => res.json())
      .then((res: IRecord[]) => {
        const records = res;
        this.setState({ crate: records });
      });
  }

  public render() {
    const crateNode = this.state.crate.map(record => {
      return (
        <Record key={record.id} record={record} onClick={e => this.toggleRecord(record)}></Record>
      );
    });
    const setListNode = this.state.setList.map(record => {
      return (
        <Record key={record.id} record={record} onClick={e => this.toggleRecord(record)}></Record>
      );
    });
    return (
      <Grid>
        <Row>
          <Col xs={12}><Hero></Hero></Col>
        </Row>
        <Panel header="Record Crate">
          <Row>
            {crateNode}
          </Row>
        </Panel>
        <Panel>
          <Row>
            <Col xs={12}><SetStats set={this.state.setList}></SetStats></Col>
          </Row>
        </Panel>
        <Panel header="Set List">
          <Row>
            {setListNode}
          </Row>
        </Panel>
      </Grid >
    );
  }

  private toggleRecord = (record: IRecord) => {
    const crate = addOrRemoveItem(this.state.crate, record);
    const setList = addOrRemoveItem(this.state.setList, record);
    this.setState({ crate, setList });
  }
}

function addOrRemoveItem<T>(list: T[], item: T): T[] {
  const index = list.indexOf(item);
  return index >= 0 ? list.filter(i => i !== item) : list.concat(item);
}

export default App;
