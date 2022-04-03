export const useGetResponses = (questions, answers) => {
    const responses = answers.map(({
        questionID,
        is_right,
        answer: { statement }
    }) => ({
        questionID,
        statement,
        is_right
    }))

    for (let i = 0; i < responses.length; i++) {
        for (let y = 0; y < questions.length; y++) {
            if (questions[y].id == responses[i].questionID) {
                questions[y].answer = responses[i].statement
                questions[y].is_right = responses[i].is_right
            }
        }
    }

    return questions;
}
