import * as React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'

export default function({ options, id: questionID }) {
    const { setAnswer } = useTriviaDispatch()
    const [checked, setChecked] = React.useState(0);

    const handleClick = id => {
        setChecked(id);
        let answer = options.find(item => id == item.id);
        let correctAnswer = options.find(item => item.is_right)

        setAnswer({
            questionID: questionID,
            answer: answer,
            correctAnswer: correctAnswer,
            is_right: answer.is_right
        })
    }

    React.useEffect(() => {
        setChecked(0)
    }, [options])

    return (
        <List>
            {options.map((item) => (
                <ListItem
                    key={item.id}
                    dense
                    button
                    onClick={() => handleClick(item.id)}
                    disabled={checked}
                    selected={item.id == checked}
                >
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={checked == item.id}
                            tabIndex={-1}
                            disableRipple
                        />
                    </ListItemIcon>
                    <ListItemText primary={item.statement} />
                </ListItem>
            ))}
        </List>
    )
}
