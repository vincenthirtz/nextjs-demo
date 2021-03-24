import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export default function DateFR({ dateString }) {
  if (dateString) {
    const date = new Date(dateString);
    const formattedDate = format(date, 'EEEE dd MMMM yyyy ', {
      locale: fr
    });
    return formattedDate;
  }

  return dateString;
}
