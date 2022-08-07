import styles from './CalendarIcon.module.css'

interface Props {
    date: string
}

const CalendarIcon = ({date}: Props): JSX.Element => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    const [year, month, day] = date.split('-')

    return (
        <div className={styles.container}>
            <span className={styles.year}>{year}</span>
            <span className={styles.day}>{day}</span>
            <span className={styles.month}>{months[+month - 1]}</span>
        </div>
    )
}

export default CalendarIcon
