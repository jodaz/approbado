export const useGetResponses = (questions, answers) => {
    const responses = answers.map(({
        questionID,
        isRight,
        answer: { statement }
    }) => ({
        questionID,
        statement,
        isRight
    }))

    for (let i = 0; i < responses.length; i++) {
        for (let y = 0; y < questions.length; y++) {
            if (questions[y].id == responses[i].questionID) {
                questions[y].answer = responses[i].statement
                questions[y].isRight = responses[i].isRight
            }
        }
    }

    return questions;
}
