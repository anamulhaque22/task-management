import moment from "moment";

export default function dateFormatter(date, formate) {
    return moment(date).format(formate);
}
