import { getCurrentUser } from '@/lib/db/user';
import AddPost from './add-post';

export default async function AddPostWrapper() {
  const currentUser = await getCurrentUser();

  return <AddPost currentUser={currentUser} />;
}
