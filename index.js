const fs = require('fs');
const parse = require('csv-parse/lib/sync');
let file = fs.readFileSync('./Alliance Trivia Suggestions.csv').toString();

const questionsAndAnswers = parse(file, { quote: '"', ltrim: true, rtrim: true, skip_lines_with_empty_values: true, delimiter: ';' });

const filteredQuestions = questionsAndAnswers.map((split) => {
	const question = split[0].trim();
	split.splice(0,1);
	const answers = split.filter((item) => item.length !== 0);
	const trimmedAnswers = answers.map((answer) => answer.trim());
	return {
		question,
		answers: trimmedAnswers,
	}
});
console.log(`Questions: ${filteredQuestions.length}`)

fs.writeFileSync('./converted.json', JSON.stringify(filteredQuestions, null, 2));
