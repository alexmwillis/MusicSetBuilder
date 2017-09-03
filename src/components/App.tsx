import * as React from "react";
import { Col, Grid, ListGroup, ListGroupItem, Panel, Row } from "react-bootstrap";
import IRecord from "../model/records/IRecord";
import Hero from "./Hero";
import Record from "./Record";
import SetInfo from "./SetInfo";

interface IAppState {
  crate: IRecord[];
  setList: IRecord[];
}

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
        <Record key={record._id} record={record} onClick={e => this.toggleRecord(record)}></Record>
      );
    });
    const setListNode = this.state.setList.map(record => {
      return (
        <Record key={record._id} record={record} onClick={e => this.toggleRecord(record)}></Record>
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
        <Panel header="Set Info">
          <Row>
            <Col xs={12}><SetInfo set={this.state.setList}></SetInfo></Col>
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
