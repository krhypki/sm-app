import FeedListControlButton from './FeedListControlButton';

type FeedListControlsProps = {
  baseUrl: string;
  currentPage: number;
  totalPages: number;
};

export default function FeedListControls({
  baseUrl,
  currentPage,
  totalPages,
}: FeedListControlsProps) {
  return (
    <div className="flex justify-center gap-10 mt-10">
      {currentPage < totalPages && (
        <FeedListControlButton href={`${baseUrl}?page=${currentPage + 1}`}>
          Show more
        </FeedListControlButton>
      )}

      {currentPage > 1 && totalPages > 1 && (
        <FeedListControlButton href={`${baseUrl}?page=${currentPage - 1}`}>
          Show less
        </FeedListControlButton>
      )}
    </div>
  );
}
