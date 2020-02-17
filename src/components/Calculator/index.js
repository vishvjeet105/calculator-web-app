import React from 'react';
import './index.css';
import CalculatorContext from '../CalculatorContext';
import { calculationUtility } from '../../utility/calculationUtility';

class Calculator extends React.Component {
	state = {
		calculatedAnswer: 0,
		userEntry: '0'
	};
	handleClick = userSelectedValue => {
		console.log('userSelectValue', userSelectedValue);
		this.setState(calculationUtility(userSelectedValue, this.state));
	};
	render() {
		const { calculatedAnswer, userEntry } = this.state;
		return (
			<div className='calculator-component'>
				<div className='calculator-container'>
					<div className='cal-result-perform-part'>
						<div className='calculation-perform-part'>{calculatedAnswer}</div>
						<div className='calculation-result-part'>{userEntry}</div>
					</div>
					<div className='arithematic-perform-symbol-number'>
						<div className='row first'>
							<CalculatorContext
								value='C'
								clickHandler={this.handleClick}
								className='operator clear-operator'
							/>
							<CalculatorContext
								value='+/-'
								clickHandler={this.handleClick}
								className='operator plus-minus-operator'
							/>
							<CalculatorContext
								value='%'
								clickHandler={this.handleClick}
								className='operator percent-operator'
							/>
							<CalculatorContext
								value='÷'
								clickHandler={this.handleClick}
								className='operator divison-operator'
								btnClass='last-colum-btn'
							/>
						</div>
						<div className='row second'>
							<CalculatorContext
								value='7'
								clickHandler={this.handleClick}
								className='operator seven-number'
							/>
							<CalculatorContext
								value='8'
								clickHandler={this.handleClick}
								className='operator eight-number'
							/>
							<CalculatorContext
								value='9'
								clickHandler={this.handleClick}
								className='operator nine-number'
							/>
							<CalculatorContext
								value='x'
								clickHandler={this.handleClick}
								className='operator multiplication-operator'
								btnClass='last-colum-btn'
							/>
						</div>
						<div className='row third'>
							<CalculatorContext
								value='4'
								clickHandler={this.handleClick}
								className='operator four-number'
							/>
							<CalculatorContext
								value='5'
								clickHandler={this.handleClick}
								className='operator five-number'
							/>
							<CalculatorContext
								value='6'
								clickHandler={this.handleClick}
								className='operator six-number'
							/>
							<CalculatorContext
								value='-'
								clickHandler={this.handleClick}
								className='operator minus-operator'
								btnClass='last-colum-btn'
							/>
						</div>
						<div className='row fourth'>
							<CalculatorContext
								value='1'
								clickHandler={this.handleClick}
								className='operator one-number'
							/>
							<CalculatorContext
								value='2'
								clickHandler={this.handleClick}
								className='operator two-number'
							/>
							<CalculatorContext
								value='3'
								clickHandler={this.handleClick}
								className='operator three-number'
							/>
							<CalculatorContext
								value='+'
								clickHandler={this.handleClick}
								className='operator addition-operator'
								btnClass='last-colum-btn'
							/>
						</div>
						<div className='row fifth'>
							<CalculatorContext
								value='0'
								clickHandler={this.handleClick}
								className='operator zero-number'
							/>
							<CalculatorContext
								value='.'
								clickHandler={this.handleClick}
								className='operator decimal-number'
							/>
							<CalculatorContext
								value='='
								clickHandler={this.handleClick}
								className='operator equal-operator'
								btnClass='last-colum-btn'
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Calculator;
