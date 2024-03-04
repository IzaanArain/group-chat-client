import React from 'react'
import { Tooltip } from 'react-bootstrap'

// const RenderTooltips = (props) => {
//   return (
//     <Tooltip id={props.id} {...props}>
//        {props.content}
//     </Tooltip>
//   )
// }

const RenderTooltips = React.forwardRef((props, ref) => {
    return (
       <>
        <Tooltip ref={ref} id={props.id} {...props}>
          {props.content}
        </Tooltip>
       </>
      )
});

export default RenderTooltips