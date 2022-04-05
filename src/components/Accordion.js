import { useState, useRef } from 'react'

function Accordion ({ title, text }) {
  const [active, setActive] = useState("");
  const [height, setHeight] = useState("0px");
  const content = useRef(null)

  const toggleAccordion = () => {
    setActive(active == "" ? "active" : "");
    setHeight(active == "active" ? "0px" : content.current.scrollHeight + "px");
  };

  return (
  <>
    <h3 className="accordion" onClick={toggleAccordion}><span>{title}</span> {active ? "-" : "+"}</h3>
    <div ref={content} className="panel" style={{maxHeight: height}}>
      <p className="panel-text">{text}</p>
    </div>
  </>
  );
}

export default Accordion;