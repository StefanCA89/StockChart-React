export default function TimestampBar(props) {
    return (
        <div className="timestamp-Bar">
            <div className="time5">{props.timeStamp[44]}</div>
            <div className="time4">{props.timeStamp[33]}</div>
            <div className="time3">{props.timeStamp[22]}</div>
            <div className="time2">{props.timeStamp[11]}</div>
            <div className="time1">{props.timeStamp[0]}</div>
        </div>
    )
}