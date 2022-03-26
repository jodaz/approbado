import * as React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    checked: props => ({
        "&$checked": {
            color: props.isRight
                ? `${theme.palette.success.main} !important`
                : `${theme.palette.error.main} !important`
        }
    }),
    selected: props => ({
        "&$selected": {
            borderRadius: '6px',
            backgroundColor: 'transparent',
            opacity: 'unset',
            border: props.isRight
                ? `3px solid ${theme.palette.success.main} !important`
                : `3px solid ${theme.palette.error.main} !important`
        }
    })
}))

export default function({ options, id: questionID }) {
    const { setAnswer } = useTriviaDispatch()
    const [checked, setChecked] = React.useState(0);
    const [isRight, setIsRight] = React.useState(0)
    const classes = useStyles({ isRight: isRight })

    const handleClick = id => {
        setChecked(id);
        let answer = options.find(item => id == item.id);
        let correctAnswer = options.find(item => item.is_right)

        setIsRight(answer.is_right)
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
                    onClick={() => handleClick(item.id)}
                    disabled={checked}
                    selected={item.id == checked}
                    classes={{
                        selected: classes.selected
                    }}
                >
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={checked == item.id}
                            tabIndex={-1}
                            classes={{
                                checked: classes.checked
                            }}
                            disableRipple
                        />
                    </ListItemIcon>
                    <ListItemText primary={item.statement} />
                </ListItem>
            ))}
        </List>
    )
}
