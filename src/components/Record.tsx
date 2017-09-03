import * as React from "react";
import { Col, Thumbnail } from "react-bootstrap";
import { Format } from "../lib/common";
import IRecord from "../model/records/IRecord";

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

export default Record;
