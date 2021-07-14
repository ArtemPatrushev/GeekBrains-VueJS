const options = {
  day: 'numeric',
  month: 'short', // also numeric
  year: 'numeric',
};

export default function formatDate(dateString) {

  const locale = navigator.language;

  let result = new Intl.DateTimeFormat(
    locale,
    options
  ).format(dateString)


  return result
}