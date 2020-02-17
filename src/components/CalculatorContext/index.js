import React from 'react';
import './index.css';
class CalculatorContext extends React.PureComponent {
	handleClick = userSelectValue => {
		console.log(userSelectValue);
		this.props.clickHandler(userSelectValue);
	};
	render() {
		const { className, btnClass, value } = this.props;
		return (
			<div className={className}>
				<button className={`button-common ${btnClass}`} onClick={() => this.handleClick(value)}>
					<span className={`text-common${btnClass ? '-' + btnClass : ''}`}>{value}</span>
				</button>
			</div>
		);
	}
}
export default CalculatorContext;
