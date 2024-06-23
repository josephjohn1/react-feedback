import React from 'react';
import ReactSlider from 'react-slider';
import './Slider.css';

const steps = [
  { value: 0, label: 'Strongly Disagree' },
  { value: 1, label: 'Disagree' },
  { value: 2, label: 'Neutral' },
  { value: 3, label: 'Agree' },
  { value: 4, label: 'Strongly Agree' },
];

const CustomSlider = ({ value, onChange }) => {
  return (
    <div className="slider-container">
      <ReactSlider
        className="horizontal-slider"
        markClassName="example-mark"
        onChange={onChange}
        trackClassName="example-track"
        defaultValue={0}
        value={!value? 0 : value}
        min={0}
        max={4}
        marks
        renderMark={(props) => {
          const { key, className, ...restProps } = props;
          const markClassName = key < value ? 'example-mark example-mark-completed' :
            key === value ? 'example-mark example-mark-active' : 'example-mark';
          return <span key={key} className={markClassName} {...restProps} />;
        }}
        orientation="horizontal"
      />
      <div className="slider-labels">
        {steps.map((mark) => (
          <div key={mark.value} className={`slider-label ${mark.value === value ? 'slider-label-active' : ''}`}>
            {mark.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSlider;
