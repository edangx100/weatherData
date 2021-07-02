import React from "react";

function TempRow(props) {

  return (
    <tr>
        <td>{props.hour}</td>
        <td>{props.temperature}</td>
    </tr>
  );
}

export default TempRow