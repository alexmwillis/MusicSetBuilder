import * as React from "react";
import { Col, Grid, ListGroup, ListGroupItem, Panel, Row, Thumbnail } from "react-bootstrap";
import Hero from "./Hero";

interface IRecord {
  _id: string;
  title: string;
  artist: string;
  image: string;
  duration: number;
  tempo: number;
  vocals: boolean;
}

interface IAppState {
  crate: IRecord[];
  setList: IRecord[];
}

const Record = ({ record, onClick }: { record: IRecord, onClick: React.EventHandler<any> }) => {
  return (<Col xs={6} md={4} key={record._id}>
    <Thumbnail href="#" src={record.image} alt="record" onClick={onClick}>
      <h3>{record.title}</h3><h4>{record.artist}</h4>
      <p><strong>Tempo:</strong> {record.tempo} bpm</p>
      <p><strong>Length:</strong> {record.duration}s</p>
    </Thumbnail>
  </Col>
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
        <Record record={record} onClick={e => this.toggleRecord(record)}></Record>
      );
    });
    const setListNode = this.state.setList.map(record => {
      return (
        <Record record={record} onClick={e => this.toggleRecord(record)}></Record>
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
