import { getCurrentUser } from '@/lib/db/user';
import AddPost from './AddPost';

export default async function AddPostWrapper() {
  const currentUser = await getCurrentUser();

  return <AddPost currentUser={currentUser} />;
}
