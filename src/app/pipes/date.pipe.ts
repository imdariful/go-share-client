import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(timestamp: number): string {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const inputTimestamp = timestamp;

    // Calculate the time difference in seconds
    const timeDifference = currentTimestamp - inputTimestamp;

    if (timeDifference < 60) {
      return "Just now";
    } else if (timeDifference < 3600) {
      const minutesAgo = Math.floor(timeDifference / 60);
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (timeDifference < 86400) {
      const hoursAgo = Math.floor(timeDifference / 3600);
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else if (timeDifference < 604800) {
      const daysAgo = Math.floor(timeDifference / 86400);
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    } else if (timeDifference < 2419200) {
      const weeksAgo = Math.floor(timeDifference / 604800);
      return `${weeksAgo} week${weeksAgo > 1 ? 's' : ''} ago`;
    } else {
      return "over 1 month"
    }
  }

}
