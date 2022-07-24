export function chooseContentTypeColor(type: string) {
  switch (type) {
    case 'Articles':
      return 'bg-indigo-100 text-indigo-800';

    case 'Events':
      return 'bg-green-100 text-green-800';

    default:
      return 'bg-pink-100 text-pink-800';
  }
}
