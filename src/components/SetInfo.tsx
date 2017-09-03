import * as React from "react";
import { Format } from "../lib/common";
import IRecord from "../model/records/IRecord";

const SetInfo = ({ set }: { set: IRecord[] }) => {
  const setLength = set.reduce((sum, record) => sum += record.duration_ms, 0);
  const maxTempoChange = set.reduce(({ max, last }, record) => {
    const diff = Math.abs(last.tempo - record.tempo);
    return (diff > max) ? { max: diff, last: record } : { max, last: record };
  }, { max: 0, last: set[0] }).max;
  return (
    <div>
      <h4>Set Length: {Format.formatTime(new Date(setLength))}</h4>
      <h4>Max Tempo Change: {maxTempoChange.toFixed(0)} bpm</h4>
    </div>
  );
};

export default SetInfo;
