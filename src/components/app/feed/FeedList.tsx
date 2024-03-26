import FeedItem from './FeedItem';

export default function FeedList() {
  return (
    <ul>
      {Array.from({ length: 10 }).map((_, i) => (
        <FeedItem key={i} />
      ))}
    </ul>
  );
}
