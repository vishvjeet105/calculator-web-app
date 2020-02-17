export function calculationUtility(selectedValue, currentState) {
	let { calculatedAnswer, userEntry } = currentState;
	let regexNumber = /[0-9.]+/g;
	let regexSymbol = /[^0-9.]+/g;
	if (selectedValue === 'C') {
		return {
			calculatedAnswer: 0,
			userEntry: '0'
		};
	}
	if (userEntry === '0') {
		if (selectedValue === '0' || selectedValue === '+/-') return {};
		else if (regexNumber.test(selectedValue)) userEntry = selectedValue;
		else userEntry = userEntry + selectedValue;
		return {
			userEntry
		};
	}
	if (userEntry.slice(-1) === '%') {
		if (selectedValue !== '=') {
			if (selectedValue === '%' || selectedValue === '+/-') return {};
			else if (regexNumber.test(selectedValue)) userEntry = userEntry + 'x' + selectedValue;
			else userEntry = userEntry + selectedValue;
			return { userEntry };
		}
	}
	if (userEntry.slice(-1) === '÷') {
		if (selectedValue !== '=') {
			if (selectedValue === '÷' || selectedValue === '+/-') return {};
			else if (regexNumber.test(selectedValue) || selectedValue === '-') userEntry = userEntry + selectedValue;
			else userEntry = userEntry.replace(/.$/, selectedValue);
			return { userEntry };
		}
	}
	if (userEntry.slice(-1) === 'x') {
		if (selectedValue !== '=') {
			if (selectedValue === 'x' || selectedValue === '+/-') return {};
			else if (regexNumber.test(selectedValue) || selectedValue === '-') userEntry = userEntry + selectedValue;
			else userEntry = userEntry.replace(/.$/, selectedValue);
			return { userEntry };
		}
	}
	if (userEntry.slice(-1) === '+') {
		if (selectedValue !== '=') {
			if (selectedValue === '+' || selectedValue === '+/-') return {};
			else if (regexNumber.test(selectedValue)) userEntry = userEntry + selectedValue;
			else userEntry = userEntry.replace(/.$/, selectedValue);
			return { userEntry };
		}
	}
	if (userEntry.slice(-1) === '-') {
		if (selectedValue !== '=') {
			if (selectedValue === 'x' || selectedValue === '+/-') return {};
			else if (regexNumber.test(selectedValue)) userEntry = userEntry + selectedValue;
			else userEntry = userEntry.replace(/.$/, selectedValue);
			return { userEntry };
		}
	}
	if (regexNumber.test(userEntry.slice(-1))) {
		if (selectedValue !== '=') {
			if (selectedValue === '+/-') {
				let numberArrOfUser = userEntry.match(regexNumber);
				let symbolArrOfUser = userEntry.match(regexSymbol);
				let lastNumber = numberArrOfUser[numberArrOfUser.length - 1];
				let modifiedLastNumber;
				if (!symbolArrOfUser) return { userEntry: '-' + userEntry };
				if (symbolArrOfUser[symbolArrOfUser.length - 1] !== '-') {
					userEntry =
						symbolArrOfUser[symbolArrOfUser.length - 1] === '+'
							? userEntry.slice(0, -(lastNumber.length + 1))
							: userEntry.slice(0, -lastNumber.length);
					modifiedLastNumber = '-' + lastNumber;
				} else {
					userEntry = userEntry.slice(0, -(lastNumber.length + 1));
					modifiedLastNumber = '+' + lastNumber;
				}
				userEntry = userEntry + modifiedLastNumber;
				return { userEntry };
			} else {
				userEntry = userEntry + selectedValue;
				return { userEntry };
			}
		}
	}
	if (selectedValue === '=') {
		let numberArrOfUser = userEntry.match(regexNumber);
		let symbolArrOfUser = userEntry.match(regexSymbol);
		let i,
			lToPushAlt = Math.min(numberArrOfUser.length, symbolArrOfUser.length);
		let numWithSymbolArray = [];
		for (i = 0; i < lToPushAlt; i++) {
			numWithSymbolArray.push(numberArrOfUser[i], symbolArrOfUser[i]);
		}
		numWithSymbolArray.push(...numberArrOfUser.slice(lToPushAlt), ...symbolArrOfUser.slice(lToPushAlt));
		if (
			regexSymbol.test(numWithSymbolArray[numWithSymbolArray.length - 1]) &&
			!/%/.test(numWithSymbolArray[numWithSymbolArray.length - 1])
		) {
			numWithSymbolArray.pop();
		}
		let percentIndex;
		let percentEntry;
		while (
			numWithSymbolArray.some((entry, index) => {
				if (/%/.test(entry)) {
					percentIndex = index;
					percentEntry = entry;
					return true;
				}
			})
		) {
			let prevOperand = Number(numWithSymbolArray[percentIndex - 1]);
			let nextOperand = Number(numWithSymbolArray[percentIndex + 1]);
			let percentResult;
			if (isNaN(nextOperand)) percentResult = prevOperand / 100;
			else {
				percentResult = (prevOperand / 100) * nextOperand;
				if (/-/.test(percentEntry)) percentResult = -percentResult;
			}

			numWithSymbolArray.splice(percentIndex - 1, 3, percentResult);
		}
		let divisonIndex;
		let divisonEntry;
		while (
			numWithSymbolArray.some((entry, index) => {
				if (/÷/.test(entry)) {
					divisonIndex = index;
					divisonEntry = entry;
					return true;
				}
			})
		) {
			let prevOperand = Number(numWithSymbolArray[divisonIndex - 1]);
			let nextOperand = Number(numWithSymbolArray[divisonIndex + 1]);
			let divisonResult = prevOperand / nextOperand;
			if (/-/.test(divisonEntry)) divisonResult = -divisonResult;
			numWithSymbolArray.splice(divisonIndex - 1, 3, divisonResult);
		}
		let mulIndex;
		let mulEntry;
		while (
			numWithSymbolArray.some((entry, index) => {
				if (/x/.test(entry)) {
					mulIndex = index;
					mulEntry = entry;
					return true;
				}
			})
		) {
			let prevOperand = Number(numWithSymbolArray[mulIndex - 1]);
			let nextOperand = Number(numWithSymbolArray[mulIndex + 1]);
			let mulResult = prevOperand * nextOperand;
			if (/-/.test(mulEntry)) mulResult = -mulResult;
			numWithSymbolArray.splice(mulIndex - 1, 3, mulResult);
		}
		let findPlus;
		while (
			numWithSymbolArray.some((entry, index) => {
				if (entry === '+') {
					findPlus = index;
					return true;
				}
			})
		) {
			let prevOperand = Number(numWithSymbolArray[findPlus - 1]);
			let nextOperand = Number(numWithSymbolArray[findPlus + 1]);
			let additionResult = prevOperand + nextOperand;
			numWithSymbolArray.splice(findPlus - 1, 3, additionResult);
		}
		let findMinus;
		while (
			numWithSymbolArray.some((entry, index) => {
				if (entry == '-') {
					findMinus = index;
					return true;
				}
			})
		) {
			let prevOperand = Number(numWithSymbolArray[findMinus - 1]);
			let nextOperand = Number(numWithSymbolArray[findMinus + 1]);
			let subtractionResult = prevOperand - nextOperand;
			numWithSymbolArray.splice(findMinus - 1, 3, subtractionResult);
		}
		return {
			calculatedAnswer: userEntry,
			userEntry: calculatedAnswer + Number(numWithSymbolArray)
		};
	}
}
