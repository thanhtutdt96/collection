import { formatDuration, intervalToDuration } from 'date-fns';

const useDate = () => {
  const getPrettyDateTime = (inputDate: string) => {
    // Calculate duration difference from inputDate to current date
    const duration = intervalToDuration({
      start: new Date(),
      end: new Date(inputDate),
    });

    const formatOptions = {
      format: ['years', 'months', 'days'],
    };

    return `${formatDuration(duration, formatOptions)} ago`;
  };

  return {
    getPrettyDateTime,
  };
};

export default useDate;
