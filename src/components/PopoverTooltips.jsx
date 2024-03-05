import React from "react";
import Popover from "react-bootstrap/Popover";

const PopoverTooltips = React.forwardRef((props, ref) => (
  
    <Popover id="popover-basic" ref={ref}>
      <Popover.Header as="h3">Popover right props {props.name}</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
 
));

export default PopoverTooltips;
